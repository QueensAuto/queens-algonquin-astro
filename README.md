# Queens Auto Service Algonquin — Website

Production website for **Queens Auto Service**, an auto repair and tire shop at 2401 E Algonquin Rd, Algonquin, IL (`queensautoservices.com`).

Static, SEO-first marketing site: a dynamic service catalog, hyper-local landing pages, online appointment booking, and conversion-focused CTAs (calls, forms, tire quotes).

## Tech Stack

- **[Astro 7](https://astro.build)** (strict TypeScript) — static site generation
- **Tailwind CSS 4** via `@tailwindcss/vite` + `@tailwindcss/typography`
- **Alpine.js** — lightweight client-side interactivity
- **GSAP / ScrollTrigger** — scroll animations
- **Lenis** — smooth scrolling
- **`@astrojs/sitemap`** — sitemap generation
- No backend: fully static output with third-party embeds (Google Tag Manager, ShopMonkey scheduler, Wistia, Google Maps)

## Commands

| Command           | Action                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Start dev server at `localhost:4321`          |
| `npm run build`   | Build production site to `./dist/`            |
| `npm run preview` | Preview the production build locally          |
| `npm run astro`   | Run Astro CLI (e.g. `astro check`)            |

## Project Structure

```text
/
├── public/                  # Static assets: fonts, images, video, audio
├── src/
│   ├── brands/              # Brand config system (colors, NAP, hours, logo)
│   ├── components/          # Astro components (Hero, BookingForm, SEO, ui/…)
│   ├── data/
│   │   ├── services.json    # Service catalog: categories → services, content, FAQs
│   │   └── reviews.json     # Customer review data
│   ├── layouts/
│   │   └── BaseLayout.astro # HTML shell: GTM, theme, tracking, header/footer
│   ├── pages/               # File-based routes
│   │   ├── index.astro      # Homepage
│   │   ├── services/        # /services, /[category], /[category]/[service]
│   │   ├── locations/       # Local SEO landing pages
│   │   └── …                # about, contact, faq, deals, legal, booking flow
│   └── styles/              # global.css, fonts.css
├── astro.config.mjs         # Site URL, Tailwind plugin, video asset handling
└── tsconfig.json            # Astro strict TS config
```

## Key Concepts

### Brand system (`src/brands/`)

All site-wide business info (name, phone, address, colors, hours) lives in a
`BrandConfig` object (`src/brands/mobile-tires.ts`) and flows through
`BaseLayout` into every component. Built to support multiple brands/locations:
add a new config in `src/brands/` and export it from `index.ts`.

### Content-driven services (`src/data/services.json`)

The service catalog is data, not pages. Each service carries a `pitch`,
`fullContent`, `closer`, and optional `faqs`, rendered by dynamic routes
(`/services/[category]/[service]/`) and turned into JSON-LD structured data
(`src/components/SEO/Schema.astro`) for rich results. To add or edit a
service, edit the JSON — no new page files needed.

### Tracking & theme (`src/layouts/BaseLayout.astro`)

The layout handles Google Tag Manager, `phone_click` / `banner_click` data
layer events, dark/light theme persistence across Astro view transitions, and
video autoplay fallbacks.

## Deployment

Builds to static files in `dist/`; deployable to any static host. The site URL
is set in `astro.config.mjs` (`site: 'https://queensautoservices.com'`).
