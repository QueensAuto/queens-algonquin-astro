import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { handleContact, type ContactEnv } from "./contact.ts";

const ENV: ContactEnv = {
  RESEND_API_KEY: "re_test",
  BOOKING_OWNER_EMAIL: "owner@example.com, second@example.com",
  BOOKING_FROM_EMAIL: "Queens Auto <messages@example.com>",
};
const VALID = { name: "Maria Lopez", email: "maria@example.com", phone: "847-555-0142", message: "I have a question about my car.", website: "" };
let sent: Array<{ url: string; headers: Headers; body: Record<string, unknown> }> = [];
let resendStatus = 200;

beforeEach(() => {
  sent = [];
  resendStatus = 200;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    sent.push({ url: String(input), headers: new Headers(init?.headers), body: JSON.parse(String(init?.body)) });
    return new Response("{}", { status: resendStatus });
  }) as typeof fetch;
});

const post = (body: unknown) => new Request("https://queensautoservices.com/api/contact", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
});
const read = async (response: Response) => ({ status: response.status, body: await response.json() as { ok: boolean; error?: string } });

test("valid contact message sends one escaped email to configured recipients", async () => {
  const result = await read(await handleContact(post({ ...VALID, name: "<Maria & Co>", message: "<script>alert('x')</script>" }), ENV));
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].url, "https://api.resend.com/emails");
  assert.equal(sent[0].headers.get("Authorization"), "Bearer re_test");
  assert.deepEqual(sent[0].body.to, ["owner@example.com", "second@example.com"]);
  assert.equal(sent[0].body.reply_to, "maria@example.com");
  assert.equal(sent[0].body.subject, "New website message: <Maria & Co>");
  assert.match(String(sent[0].body.html), /&lt;Maria &amp; Co&gt;/);
  assert.match(String(sent[0].body.html), /&lt;script&gt;alert\(&#39;x&#39;\)&lt;\/script&gt;/);
  assert.doesNotMatch(String(sent[0].body.html), /<script>/);
});

test("contact honeypot succeeds without sending", async () => {
  const result = await read(await handleContact(post({ ...VALID, website: "bot" }), ENV));
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.equal(sent.length, 0);
});

test("contact validates required name and name length", async () => {
  assert.equal((await handleContact(post({ ...VALID, name: "" }), ENV)).status, 400);
  assert.equal((await handleContact(post({ ...VALID, name: "x".repeat(101) }), ENV)).status, 400);
});

test("contact validates email", async () => {
  assert.equal((await handleContact(post({ ...VALID, email: "nope" }), ENV)).status, 400);
});

test("contact validates message length", async () => {
  assert.equal((await handleContact(post({ ...VALID, message: "1234" }), ENV)).status, 400);
  assert.equal((await handleContact(post({ ...VALID, message: "x".repeat(5001) }), ENV)).status, 400);
});

test("missing contact email configuration returns 503 and a call number", async () => {
  const result = await read(await handleContact(post(VALID), { ...ENV, RESEND_API_KEY: undefined }));
  assert.equal(result.status, 503);
  assert.match(result.body.error!, /\(847\) 844-1700/);
  assert.equal(sent.length, 0);
});

test("Resend failure returns 502 and a call number", async () => {
  resendStatus = 500;
  const result = await read(await handleContact(post(VALID), ENV));
  assert.equal(result.status, 502);
  assert.match(result.body.error!, /\(847\) 844-1700/);
  assert.equal(sent.length, 1);
});
