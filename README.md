# TRI AI — Website

Teaching, Research, Innovation in AI for Africa.

A static site built with **Astro**, content managed through **Decap CMS**, deployed on **Netlify**. Light mode by default with a brand-correct dark mode toggle.

---

## What's in here

```
triai-site/
├── public/
│   ├── admin/               # Decap CMS entry — accessed at /admin
│   │   ├── index.html
│   │   └── config.yml       # CMS schema (collections, fields)
│   ├── favicon.svg          # Gold "tA" mark
│   └── og-default.png       # 1200×630 social preview
├── src/
│   ├── content/             # Markdown content (edited via /admin)
│   │   ├── programmes/
│   │   ├── publications/
│   │   ├── courses/
│   │   ├── team/
│   │   ├── partners/
│   │   └── news/
│   ├── content.config.ts    # Astro collection schemas (mirrors CMS)
│   ├── components/          # Wordmark, Header, Footer, etc.
│   ├── layouts/             # Base.astro
│   ├── pages/               # Routes
│   └── styles/global.css    # Brand tokens — colours, type, spacing
├── astro.config.mjs
├── netlify.toml             # Build + /admin redirect + caching
└── package.json
```

---

## Local development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open `http://localhost:4321`.

To build for production:

```bash
npm run build
npm run preview      # serve the build locally
```

The build output lands in `dist/`.

---

## Brand discipline (don't break these)

- **Wordmark:** "tri" lowercase, weight 500. "AI" uppercase, weight 800, always gold (`#D4A017`).
- **Division dots:** orange (Teaching `#FE6612`), blue (Research `#1A2B4A`), teal (Innovation `#0F9B8D`). The `<Wordmark>` component drops them automatically below 36px (nav/footer contexts).
- **No icons.** The brand uses type, dots, and accent bars instead. If you find yourself reaching for an icon, reach for a coloured dot or a 3px accent bar.
- **Two typefaces only:** Plus Jakarta Sans for body and headlines; Space Mono for eyebrows, dates, tags, section numbers (01 — 02 — 03).
- All colours, type sizes, and spacing live as CSS custom properties in `src/styles/global.css`. Edit there, not inline.

---

## Deploying to Netlify

1. **Push the repo to GitHub** (or GitLab / Bitbucket — Netlify supports all three).

2. **Create a new site on Netlify** → "Import an existing project" → pick the repo.
   - Build command: `npm run build`  *(already in `netlify.toml`)*
   - Publish directory: `dist`  *(already in `netlify.toml`)*
   - Netlify will detect both automatically.

3. **Add a custom domain** (optional but recommended).
   - Settings → Domain management → Add custom domain → `tri-ai.org`.
   - Netlify will guide you through DNS.

The first deploy will go live within a minute or two. The site is fully static, fully cacheable.

---

## Setting up the CMS (Decap + Netlify Identity)

The `/admin` page won't work until Identity and Git Gateway are turned on. Do this **once**, after the first deploy:

1. **Enable Netlify Identity.**
   Site settings → Identity → **Enable Identity**.

2. **Restrict signups (recommended).**
   Identity → Registration → set to **Invite only**. This prevents random people from signing up to edit your site.

3. **Enable Git Gateway.**
   Identity → Services → Git Gateway → **Enable Git Gateway**. This lets the CMS commit to your repo on behalf of logged-in editors without giving them GitHub access.

4. **Invite editors.**
   Identity tab → Invite users → enter emails for the comms team. They'll receive an email with a setup link.

5. **Editors log in.**
   Visit `https://tri-ai.org/admin/` (or your Netlify URL + `/admin/`). They'll set a password, then land in the CMS.

### How editing works

- Editors create or edit content in the CMS UI.
- Because **editorial workflow** is enabled in `config.yml`, every change goes through *Draft → In review → Ready → Publish*.
- "Publish" merges a pull request to `main`, which triggers a Netlify rebuild. New content is live within roughly 60 seconds.
- Editors never touch git directly. Developers continue to push code through the normal GitHub flow.

---

## Content collections

| Collection      | Folder                       | What it's for                                |
|-----------------|------------------------------|----------------------------------------------|
| Programmes      | `src/content/programmes/`    | TRI AI Saturdays, Sauti Project, ChowNet, … |
| Publications    | `src/content/publications/`  | Papers, datasets, technical reports          |
| Courses         | `src/content/courses/`       | Partner-delivered curricula                  |
| Team            | `src/content/team/`          | Board, leadership, team members              |
| Partners        | `src/content/partners/`      | Lead, partner, supporter tiers               |
| News            | `src/content/news/`          | Announcements, releases, updates             |

Each collection's fields live in two places that **must stay in sync**:
- `src/content.config.ts` — what Astro validates at build time
- `public/admin/config.yml` — what editors see in the CMS UI

If you add a field, add it to both.

---

## Forms (contact + newsletter)

Both forms are wired to **Netlify Forms** — no third-party signup needed. Submissions appear in Netlify's "Forms" tab.

To turn on email notifications:
- Site settings → Forms → Form notifications → Add notification → email address.

---

## Donate page

The donate page UI is built but the payment integration is intentionally left as a placeholder (`alert()` on submit). Wire up Stripe, Paystack, or Flutterwave when ready — the relevant code lives in `src/pages/donate.astro`.

---

## Theme toggle

Light mode is the default. The toggle in the header switches to dark mode and persists the choice in `localStorage` under the key `triai-theme`. First-time visitors get whatever their OS pref says. The bootstrap script in `src/layouts/Base.astro` runs *before* paint to avoid the dark-flash-on-light-mode problem.

---

## What's *not* in here

- Stripe / Paystack / Flutterwave integration (donate page is UI-only).
- Analytics. Add Plausible, Fathom, or GA in `src/layouts/Base.astro` when you've decided.
- A search feature. The site is small enough that nav + grouping is doing the work; revisit when content grows past ~50 pages.

## Replacing placeholder images

The site currently uses two layers of placeholder imagery:

- **Brand-correct flat tiles** at `public/uploads/placeholders/` — used on cards and as fallbacks. Editorial, identifiable as TRI AI, but obviously placeholders.
- **Picsum-served live photos** for editorial sections, programme covers, team headshots, and news covers. These pull real photos from `picsum.photos` using deterministic seed names (e.g. `https://picsum.photos/seed/triai-saturdays/1600/1200`). The same seed always returns the same photo, so the design is stable.

To replace either with real photography:

- **Programme covers:** edit the programme entry through the CMS at `/admin`. Change the `cover` field from the Picsum URL to either a relative path (e.g. `/uploads/programmes/saturdays-cohort-photo.jpg`, after uploading the file) or a different external URL.
- **Team headshots:** same pattern — each team member's `photo` field. Replace the Picsum URL with the path to the uploaded headshot.
- **News covers:** the `cover` field on each news article.
- **About page editorial photos:** these live in `src/pages/about.astro` directly (not in the CMS). Edit the `imageSrc` props on the three `<EditorialSplit>` components.
- **Homepage division panels:** edit the `featuredImage` props on the `<DivisionPanel>` calls in `src/pages/index.astro`.

The flat brand placeholders at `public/uploads/placeholders/` are kept for any future cards that need a fallback when no `cover` is set.

---

## Tech notes for whoever maintains this next

- Astro 5, content collections via `glob` loader.
- No JS framework — every component is `.astro`. The header drawer and theme toggle are vanilla JS, kept inline in their components.
- CSS is plain CSS with custom properties. No Tailwind, no preprocessor.
- The site is fully static. No serverless functions, no runtime, no database. The only dynamic surfaces are Netlify Forms (managed by Netlify) and the CMS (which writes to git).
