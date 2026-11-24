/** POST /api/contact — forwards general website messages to the shop inbox. */
export interface ContactEnv {
  RESEND_API_KEY?: string;
  BOOKING_OWNER_EMAIL?: string;
  BOOKING_FROM_EMAIL?: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
}

const PHONE = "(847) 844-1700";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function recipients(value: string | undefined): string[] {
  const seen = new Set<string>();
  return (value || "").split(",").map((email) => email.trim()).filter((email) => {
    const key = email.toLowerCase();
    if (!EMAIL_RE.test(email) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function sameSite(request: Request): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try {
    const url = new URL(origin);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return true;
    return url.host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function handleContact(request: Request, env: ContactEnv): Promise<Response> {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed." }, 405);
  if (!sameSite(request)) return json({ ok: false, error: "Forbidden." }, 403);

  let raw: ContactPayload;
  try {
    raw = await request.json() as ContactPayload;
  } catch {
    return json({ ok: false, error: "Invalid request format." }, 400);
  }
  if (!raw || typeof raw !== "object") return json({ ok: false, error: "Invalid request format." }, 400);
  if (clean(raw.website)) return json({ ok: true });

  const name = clean(raw.name);
  const email = clean(raw.email);
  const phone = clean(raw.phone);
  const message = clean(raw.message);
  if (!name || name.length > 100) return json({ ok: false, error: "Please enter your name (100 characters or fewer)." }, 400);
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "Please enter a valid email address." }, 400);
  if (message.length < 5 || message.length > 5000) {
    return json({ ok: false, error: "Your message must be between 5 and 5,000 characters." }, 400);
  }

  const apiKey = env.RESEND_API_KEY;
  const ownerEmails = recipients(env.BOOKING_OWNER_EMAIL);
  const fromEmail = env.BOOKING_FROM_EMAIL;
  if (!apiKey || !ownerEmails.length || !fromEmail) {
    return json({ ok: false, error: `Messages aren't available right now. Please call ${PHONE}.` }, 503);
  }

  const html = `<h1>New website message</h1>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: ownerEmails,
        reply_to: email,
        subject: `New website message: ${name.replace(/[\r\n\t]+/g, " ")}`,
        html,
        text: `New website message\n\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}\n\nMessage:\n${message}`,
      }),
    });
    if (!response.ok) {
      return json({ ok: false, error: `We couldn't send your message. Please call ${PHONE}.` }, 502);
    }
  } catch {
    return json({ ok: false, error: `We couldn't send your message. Please call ${PHONE}.` }, 502);
  }
  return json({ ok: true });
}
