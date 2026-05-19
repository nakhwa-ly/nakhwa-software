# نخوة للحلول البرمجية — Nakhwa Software Solutions

موقع تسويقي احترافي لشركة نخوة للحلول البرمجية، مبني بـ Next.js 16 مع دعم كامل للغتين العربية والإنجليزية.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (radix-nova) |
| i18n | next-intl v4 (AR + EN, RTL/LTR) |
| Theming | next-themes (Light / Dark) |
| Animation | Framer Motion v12 |
| Forms | React Hook Form + Zod v4 |
| Fonts | Cairo (AR) + Inter (EN) |

---

## Prerequisites

- Node.js 20.x or later
- npm 10.x or later

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects automatically to `/ar`.

---

## Available Scripts

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # AR + EN routes
│   │   ├── layout.tsx     # Root layout (Navbar, Footer, Providers)
│   │   ├── page.tsx       # Home page
│   │   ├── services/
│   │   ├── about/
│   │   ├── portfolio/
│   │   ├── contact/
│   │   └── loading.tsx
│   ├── api/contact/       # Contact form API route
│   ├── sitemap.ts         # /sitemap.xml
│   └── robots.ts          # /robots.txt
├── components/
│   ├── layout/            # Navbar, Footer, MobileMenu, ThemeToggle, LanguageSwitcher
│   ├── sections/          # Hero, Services, Portfolio, Contact, About...
│   ├── shared/            # AnimatedSection, Counter, Cards
│   └── providers/         # ThemeProvider, MotionProvider
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── lib/
│   ├── utils.ts
│   └── validations.ts     # Zod contact form schema
messages/
├── ar.json                # Arabic translations
└── en.json                # English translations
proxy.ts                   # next-intl middleware (Next.js 16)
```

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://nakhwa.com.ly

# Required when Resend is wired up (see below)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=nakhwa.libya@gmail.com
```

> `.env.local` is git-ignored. Never commit it.

---

## Deploying on Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit: Nakhwa marketing website"
git remote add origin https://github.com/USERNAME/nakhwa-software.git
git branch -M main
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New… → Project** and import `nakhwa-software`
3. Verify build settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Node.js Version | 20.x |

4. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://nakhwa.com.ly`
5. Click **Deploy**

After ~2 minutes you'll have a live URL like `nakhwa-software-xyz.vercel.app`.

### 3. Auto-deploy

Every `git push` to `main` triggers a production deployment automatically.

---

## Custom Domain (nakhwa.com.ly)

### In Vercel

1. Open project → **Settings → Domains**
2. Add `nakhwa.com.ly` and click **Add**

### In your DNS provider

Add these records:

```
# Apex domain
Type:  A
Name:  @
Value: 76.76.21.21
TTL:   3600

# WWW subdomain
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   3600
```

DNS propagation takes 5 minutes – 24 hours. Vercel issues an SSL certificate automatically once DNS is live.

---

## Email via Resend (Contact Form)

The contact form API route (`src/app/api/contact/route.ts`) currently logs submissions to the console. To enable real email delivery:

### 1. Set up Resend

1. Create an account at [resend.com](https://resend.com)
2. Go to **Domains → Add Domain** and add `nakhwa.com.ly`
3. Add the SPF, DKIM, and DMARC records Resend provides to your DNS
4. Go to **API Keys → Create API Key** (Sending access)

### 2. Add to Vercel Environment Variables

```
RESEND_API_KEY = re_xxxxxxxxxxxx
CONTACT_EMAIL  = nakhwa.libya@gmail.com
```

### 3. Wire up in code

Install the SDK:

```bash
npm install resend
```

Then update `src/app/api/contact/route.ts` — replace the `console.log` with:

```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'website@nakhwa.com.ly',
  to: process.env.CONTACT_EMAIL!,
  subject: `New contact from ${data.name}`,
  text: JSON.stringify(data, null, 2),
});
```

Redeploy on Vercel after adding the environment variables.

---

## Security Headers

Add to `next.config.ts` before going to production:

```ts
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ];
},
```

---

## Contact

- **Email:** nakhwa.libya@gmail.com
- **Phone:** +218 91 070 9671
- **Location:** Tripoli, Libya
