# Brenton Weaver · Portfolio

A React and TypeScript portfolio site that presents my work as an interactive **constellation map** — each star is a live client project, with career history, toolkit, and contact woven into a single scroll experience.

The goal of this project is to showcase senior front-end craft (component systems, performance, technical SEO, and delivery at scale) while demonstrating modern React architecture, motion design, and accessible UI patterns.

This site was built as a portfolio piece to complement my professional experience at SERV. Agency and related React side projects (including my [Website Audit Dashboard](https://github.com/Brento20)).

---

## Site Features

The current experience includes:

- **Hero** — editorial landing with coordinates, role, and scroll-linked motion over a shared star field
- **About** — career narrative and highlight “constellation”
- **Experience map** — full-viewport interactive chart: project stars, figure lines, drawer with screenshots and case-study copy
- **Career timeline** — roles from SERV. Agency, study, and prior leadership experience
- **Toolkit** — skills grouped as an index table
- **Contact** — email, phone, LinkedIn, GitHub, and résumé PDF
- **Three.js background** — scroll-linked depth field (code-split, reduced-motion aware)

Each project entry includes live URL, imagery, capabilities, technologies, and summary text sourced from `src/data/projects.ts`.

---

## How it Works

### Frontend

The frontend is a **single-page application** built with React 19 and TypeScript, bundled with Vite.

Content lives in typed data modules (`profile`, `projects`, layout coordinates). Sections compose shared primitives (`SectionHead`, `Approach`) and the constellation experience map handles selection state, pointer parallax, and the project drawer.

Global styling uses **design tokens** in `src/styles/tokens.css` — change `--body-font`, `--heading-font`, and `--color-*` in one place. See `docs/CODEBASE.md` for folder conventions and hooks.

There is **no backend** for this site; it is static-friendly and suitable for GitHub Pages, Netlify, or similar hosts.

### SEO

Metadata is defined in:

- `index.html` — title, description, Open Graph, Twitter Card, JSON-LD (`Person`, `WebSite`, `ProfilePage`)
- `src/config/site.ts` — shared copy for runtime updates when `VITE_SITE_URL` is set
- `public/robots.txt`, `public/sitemap.xml`, `public/og-image.svg`, `public/site.webmanifest`

Set your production origin in `.env` (see `.env.example`) and update **canonical URLs** in `index.html`, `robots.txt`, and `sitemap.xml` to match your live domain. For best social previews, export `public/og-image.svg` to **1200×630 PNG** and point `og:image` at that file.

---

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite 8
- Framer Motion
- React Three Fiber / Three.js (lazy-loaded background)
- CSS (tokens + component styles)

### Development

- oxlint
- npm

---

## Project Structure

```
portfolio-rebuild/

├── docs/
│   └── CODEBASE.md          # Architecture, tokens, hooks
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── site.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── Brenton_Weaver_Resume.pdf
│   └── projects/            # Project screenshots
├── src/
│   ├── components/
│   │   ├── celestial/       # Cosmos background, Three.js scene
│   │   ├── constellation/   # Experience map, star systems
│   │   ├── layout/
│   │   ├── project/         # Project drawer
│   │   ├── sections/
│   │   └── seo/
│   ├── config/
│   │   └── site.ts          # SEO & site URL config
│   ├── constants/
│   ├── data/
│   ├── hooks/
│   ├── styles/
│   │   ├── tokens.css       # Fonts & colours (edit here first)
│   │   ├── site.css
│   │   ├── celestial.css
│   │   └── map-layers.css
│   ├── theme/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
└── README.md
```

---

## Running Locally

Install dependencies:

```bash
npm install
```

Optional — set public site URL for canonical metadata at runtime:

```bash
cp .env.example .env
# edit VITE_SITE_URL=https://your-domain.com
```

Start development:

```bash
npm run dev
```

The application runs on:

```
http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

---

## Deployment Checklist

When you deploy to a custom domain or GitHub Pages:

1. Set `VITE_SITE_URL` in your host’s environment (no trailing slash).
2. Update `link rel="canonical"`, Open Graph `og:url`, and JSON-LD `@id` / `url` values in `index.html` to your live origin.
3. Update `public/sitemap.xml` and the `Sitemap:` line in `public/robots.txt`.
4. Replace or supplement `og-image.svg` with a PNG for LinkedIn / Facebook if previews do not pick up SVG.

---

## Why I Built This

As a Senior Web Developer in Sydney, I have delivered **200+ production websites** and agency-wide **CSS, LESS, and JavaScript component systems** — not only pages, but patterns other developers and non-technical editors can reuse.

I wanted a portfolio that reflects that work honestly: structured content, strong typography, technical SEO basics, performance-conscious loading (code-split 3D), and an experience metaphor (star chart) that matches how I think about connecting systems.

This project demonstrates:

- React and TypeScript architecture
- Design tokens and maintainable CSS
- Accessible sections, skip link, and semantic headings
- Motion with `prefers-reduced-motion` support
- Portfolio-grade SEO metadata and structured data
- Real project data and live client links

---

## Future

Possible improvements include:

- CMS or markdown-driven project content
- Automated sitemap generation from `VITE_SITE_URL` at build time
- PNG social card generation in the build pipeline
- Blog or writing section
- Lighthouse CI on deploy
- Internationalisation (`hreflang`) if multi-locale content is added

---

## Related Work

- [Website Audit Dashboard](https://github.com/Brento20) — React / TypeScript SEO and accessibility auditing tool (separate repository)
- [GitHub](https://github.com/Brento20) · [LinkedIn](https://www.linkedin.com/in/brenton-christopher-weaver)
