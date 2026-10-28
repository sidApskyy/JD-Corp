# JD CORP website

An editorial, architecture-led Next.js website for JD CORP. This is a design and development implementation, **not a publication of verified business facts**.

## Run locally

Use Node.js 20.19+ and npm. The site built successfully on Node 20.17, but one installed lint dependency emitted an engine-version warning.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. For a production check: `npm run lint && npm run typecheck && npm run build && npm run start`.

## Content model

- `src/data/site.ts`: brand name, canonical origin fallback, navigation, verified contact and social links.
- `src/data/content.ts`: typed sector focus areas, service lenses, projects, insights and vacancies. Sector cards and detail pages use `status: "focus"` until approved as actual operating divisions; their copy and page labels explicitly describe them as editorial areas of interest, not verified services. Focus detail pages are `noindex` and excluded from the sitemap.
- Projects, insights and vacancies use `status: "draft" | "published"`. Draft entries are visible only in development with explicit disclaimers; production listings and detail routes exclude them. Never set any content to `published` until names, imagery, scope and claims are approved.
- There are currently no approved divisions, projects, articles or jobs. The public site displays six sector pathways as editorial navigation while keeping portfolio/news/job listings free of invented claims. The sector taxonomy draws on broad engineering-industry patterns, including the public L&T reference, but uses original JD CORP language and local licensed photography.
- `public/images/ASSETS.md` records local photo acquisition URLs, license and intended uses. Stock imagery does not depict JD CORP's work.

## Contact delivery

The form validates in the browser and server. To enable delivery, configure `CONTACT_WEBHOOK_URL` with a trusted HTTPS endpoint that returns 2xx **only when it has accepted delivery**. Optionally set `CONTACT_WEBHOOK_TOKEN`; it is sent as a bearer token. The endpoint receives JSON containing category, name, email, optional organization, message, submittedAt and source. Without configuration, the server returns 503 and the form shows a failure message; it never reports a successful send. Test the provider's retention, spam protection and notifications before launch. Add rate limiting / abuse prevention at the deployment edge or webhook before accepting public traffic.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin without a trailing slash; this powers canonical links and sitemap. Set contact webhook secrets only in the server environment. Deploy via any compatible Next.js host. Fonts use `next/font/google` and require network access at build time. No analytics or third-party tracking is installed.

## Approval checklist before public launch

1. Confirm which of the six sector pathways represent real JD CORP divisions, and approve the exact service scope of each before changing `focus` to `published`.
2. Provide verified project facts and permission to publish associated photography; replace stock editorial studies.
3. Provide actual announcements, dates, vacancies, approved contact details, and social accounts.
4. Provide approved logo/brand guidelines; current mark is temporary typography.
5. Review stock-image licenses/provenance, confirm photography choices, and commission/use company imagery where possible.
6. Have counsel approve privacy, terms, corporate identity details and data-processing language. The legal pages are explicitly preliminary.
7. Configure and test a real webhook, spam/rate controls and privacy-request contact route; test full delivery end to end.
8. Conduct device/browser and accessibility audit, verify site origin and social preview in production.

## Motion and accessibility

The homepage architectural reveal uses a local image, SVG line drawing and Motion. A restrained scroll-responsive image sequence and navigational canvas support the visual language. Essential text and links are never hover-only. Reduced-motion preferences disable nonessential motion. The menu supports Escape, a focus loop and a mobile layout.

## QA record

Run in this workspace on Windows with Node 20.17.0:

- `npm run lint` — passed.
- `npm run typecheck` — passed.
- `npm run build` — passed; all listed static routes generated. A build failed once while a temporary Edge browser profile was inside the project directory, because its Cookies file was locked. Moving the test profile outside the project resolved the tooling issue; the subsequent build passed.
- `npm run start` and HTTP smoke checks — public routes, six sector-focus detail pages, sitemap and robots returned 200; unpublished project details and unknown URLs returned 404.
- `POST /api/contact` — invalid payload returned 400; valid payload without a configured webhook returned 503 (not a false success).
- Headless Edge visual checks at desktop and emulated 390px mobile — hero imagery and layout rendered; no horizontal overflow at 390px. Development-mode project category filtering reduced 3 studies to 1; empty contact submission displayed field errors. Mobile menu opened, moved focus inside, and Escape closed it and returned focus to the trigger.
- Sector-led update: desktop homepage cards and services layout were visually inspected in Edge; mobile business directory rendered without horizontal overflow. The sector filter reduced six cards to two for "Energy & resources"; all six sector routes responded 200 in the production build. The homepage hero now uses eager, high-priority loading and the document marks smooth scrolling for Next.js route transitions.

Not verified: delivery to a live webhook, real approved company content, formal WCAG audit, cross-browser/device testing, or production performance metrics.

## Readability pass (2026-10-27)

- Raised the global type scale: metadata/eyebrow text is now 12px minimum (previously 9-10px), card body copy is 15px, navigation 14px, form labels 14px, footer copy 15px.
- Deepened the secondary text tone (`--graphite` #4b504b, `--muted` #666a64) and added `--accent-ink` #705936 so champagne-colored labels meet ~5.6:1 contrast on light backgrounds.
- Deepened image overlays (`#000a`/`#000d` gradients) and added text shadows so card titles over photos stay legible at all crops.
- Rewrote sector descriptions and disclaimers into plain sentence-case English (e.g. "Explore the buildings, roads and connections that help cities work and grow.").
- Verified at 1440px desktop and 390px mobile in headless Edge: no horizontal overflow, all card text and disclaimers legible in screenshots.
- `npm run lint`, `npm run typecheck`, `npm run build` all pass after the changes.
