# CLAUDE.md — Amertarva Office Website

> This file is the **single source of truth** for the Amertarva Office website.
> Read this file in full before touching any code, component, or copy.
> All AI agents (Claude Code / Kiro / Cursor) must follow this spec without deviation.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Product** | Amertarva Office — Business & Workplace Solutions Platform |
| **Parent Brand** | Amertarva (amertarva.app) |
| **Domain** | office.amertarva.app |
| **Stack** | Astro 5 + TailwindCSS |
| **Language** | English (all UI copy) |
| **Positioning** | Professional B2B web platform offering POS systems, attendance management, and project management tools for small-to-medium businesses |
| **Tone** | Confident, professional, enterprise-grade — not casual, not startup-hype |

---

## 2. Design Token — Color System

> ⚠️ The accent-to-secondary ratio on this site is **inverted** from the main Amertarva site.
> On this site, **accent carries 30%** of the visual weight (dominant highlight), while **secondary carries 10%**.
> Do not copy token values from the main site's CLAUDE.md — use the values below exclusively.

### 2.1 Amerta Day (Light Theme)

| Role | Hex | Weight | Usage |
|---|---|---|---|
| `base` | `#F8FAF8` | 60% | Page background, section background |
| `accent` | `#E9C46A` | 30% | Cards, highlights, section dividers, hover states |
| `secondary` | `#789D8E` | 10% | Subtle borders, icon backgrounds, muted badges |
| `heading` | `#2D3436` | — | All `h1`–`h6` elements |
| `body` | `#636E72` | — | Paragraph text, descriptions, captions |

### 2.2 Amerta Night (Dark Theme)

| Role | Hex | Weight | Usage |
|---|---|---|---|
| `base` | `#1A1F1D` | 60% | Page background, section background |
| `accent` | `#F4D35E` | 30% | Cards, highlights, section dividers, hover states |
| `secondary` | `#88A99B` | 10% | Subtle borders, icon backgrounds, muted badges |
| `heading` | `#E8EDEA` | — | All `h1`–`h6` elements |
| `body` | `#A0A8A4` | — | Paragraph text, descriptions, captions |

**Hard rule:** The 60/30/10 split means secondary is the dominant surface color after the base. Cards, feature blocks, and content panels should predominantly use `secondary/15`–`secondary/25` backgrounds to give the site its warm gold-tinted character.

---

## 3. CSS Variables & Theme Setup

### 3.1 Global Stylesheet

Create `src/styles/themes.css`, imported in `src/layouts/BaseLayout.astro`.

```css
/* src/styles/themes.css */

:root,
[data-theme="amerta-day"] {
  --color-base: 248 250 248;      /* #F8FAF8 */
  --color-secondary: 233 196 106;    /* #E9C46A */
  --color-accent: 120 157 142; /* #789D8E */
  --color-heading: 45 52 54;      /* #2D3436 */
  --color-body: 99 110 114;       /* #636E72 */
}

[data-theme="amerta-night"] {
  --color-base: 26 31 29;         /* #1A1F1D */
  --color-secondary: 244 211 94;     /* #F4D35E */
  --color-accent: 136 169 155; /* #88A99B */
  --color-heading: 232 237 234;   /* #E8EDEA */
  --color-body: 160 168 164;      /* #A0A8A4 */
}

html {
  background-color: rgb(var(--color-base));
  color: rgb(var(--color-body));
  transition: background-color 0.2s ease, color 0.2s ease;
}

h1, h2, h3, h4, h5, h6 {
  color: rgb(var(--color-heading));
}

p {
  color: rgb(var(--color-body));
}
```

### 3.2 Tailwind Config

```ts
// tailwind.config.mjs
export default {
  darkMode: ['selector', '[data-theme="amerta-night"]'],
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--color-base) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        heading: 'rgb(var(--color-heading) / <alpha-value>)',
        body: 'rgb(var(--color-body) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

### 3.3 Theme Switching (Astro Client Script)

```astro
<!-- src/components/ThemeToggle.astro -->
<button id="theme-toggle" type="button"
  class="rounded-full border border-secondary/30 px-4 py-1.5 text-xs font-medium text-heading
         hover:bg-secondary/20 transition-colors">
  <span id="theme-label">Day</span>
</button>

<script>
  const html = document.documentElement
  const btn = document.getElementById('theme-toggle')
  const label = document.getElementById('theme-label')

  const saved = localStorage.getItem('amertarva-office-theme')
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'amerta-night' : 'amerta-day'

  const apply = (theme: string) => {
    html.setAttribute('data-theme', theme)
    localStorage.setItem('amertarva-office-theme', theme)
    if (label) label.textContent = theme === 'amerta-night' ? 'Night' : 'Day'
  }

  apply(saved ?? preferred)
  btn?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'amerta-night'
      ? 'amerta-day' : 'amerta-night'
    apply(next)
  })
</script>
```

### 3.4 Anti-FOUC Inline Script

Add to `<head>` in `src/layouts/BaseLayout.astro`, **before any CSS**:

```astro
<script is:inline>
  (function () {
    var s = localStorage.getItem('amertarva-office-theme');
    var p = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'amerta-night' : 'amerta-day';
    document.documentElement.setAttribute('data-theme', s || p);
  })();
</script>
```

---

## 4. Hero Section

### 4.1 Visual Structure

The hero must **not** use a flat/solid background. It requires a layered background composition:

```
Layer 1 (bottom): Full-width background image
                  — Abstract tech/office/dashboard screenshot
                  — Source: /public/images/hero-bg.jpg
                  — Object-fit: cover, anchored center

Layer 2 (middle): Gradient overlay
                  — Amerta Day:  linear-gradient(to right, rgba(248,250,248,0.97) 45%, rgba(248,250,248,0.6) 75%, transparent 100%)
                  — Amerta Night: linear-gradient(to right, rgba(26,31,29,0.97) 45%, rgba(26,31,29,0.6) 75%, transparent 100%)
                  — This ensures text on the left is fully readable while the image shows through on the right

Layer 3 (top):    Text content block, positioned on the left half of the layout
```

### 4.2 Hero Image Guidelines

Accepted image types for `hero-bg.jpg`:
- Abstract geometric mesh — clean lines, no faces, no stock photo office clichés
- Dark dashboard UI screenshot (blurred, 60% opacity) on a colored background
- Subtle dot-grid or circuit pattern rendered in secondary tones

**Rejected** (do not use):
- Generic stock photos of people typing on laptops
- Flat colored backgrounds (this defeats the purpose of the layer spec)
- Images with readable text from third-party products

### 4.3 Copy Content

```ts
// src/data/hero.ts
export const hero = {
  badge: 'Business Solutions Platform',
  title: 'The Operational\nBackbone Your\nBusiness Needs',
  subtitle:
    'Amertarva Office delivers ready-to-deploy web systems for modern businesses — from point-of-sale to attendance tracking and project management, all in one ecosystem.',
  ctaPrimary: {
    label: 'Explore Our Products',
    href: '#products',
  },
  ctaSecondary: {
    label: 'Talk to Us',
    href: '#cta',
  },
  trustLine: 'Built by Amertarva · Trusted by growing businesses',
}
```

### 4.4 Hero Layout Spec

```
[Section: full viewport height, min-h-screen]
  [Background: absolute inset-0, z-0]
    [img: hero-bg.jpg, w-full h-full object-cover object-center]
    [div: gradient overlay, absolute inset-0]
  [Content: relative z-10, max-w-6xl mx-auto px-6, flex items-center, min-h-screen]
    [Left column: max-w-lg]
      [Badge pill: bg-secondary/20 text-heading border border-secondary/40]
      [H1: text-4xl md:text-5xl lg:text-6xl font-semibold text-heading leading-tight]
        (line breaks on \n via whitespace-pre-line)
      [Subtitle: text-body text-base md:text-lg leading-relaxed mt-4 mb-8]
      [Button row: flex gap-4]
        [Primary: bg-secondary text-heading font-medium px-6 py-3 rounded-xl hover:bg-secondary/80 transition]
        [Secondary: border border-secondary/50 text-heading px-6 py-3 rounded-xl hover:bg-secondary/10 transition]
      [Trust line: text-body text-xs mt-6 opacity-60]
```

---

## 5. Products Section

### 5.1 Section Header

```ts
// src/data/products.ts — header
export const productsHeader = {
  label: 'Our Products',
  title: 'Purpose-Built Tools for Modern Operations',
  subtitle:
    'Every product in the Amertarva Office suite is designed to solve a specific operational challenge — no bloat, no feature overload.',
}
```

### 5.2 Product Data

```ts
// src/data/products.ts — products array
export interface Product {
  id: string
  icon: string          // icon name from the icon library in use
  badge: string
  title: string
  tagline: string
  description: string
  features: string[]    // max 5 items
  status: 'available' | 'coming-soon'
  href: string
}

export const products: Product[] = [
  {
    id: 'pos',
    icon: 'receipt',
    badge: 'Point of Sale',
    title: 'POS System',
    tagline: 'Sell smarter, not harder.',
    description:
      'A lightweight, browser-based point-of-sale system built for retail and service businesses. Manage products, process transactions, and track sales — no hardware lock-in required.',
    features: [
      'Product & inventory management',
      'Transaction processing with receipt generation',
      'Daily and monthly sales reporting',
      'Multi-cashier support',
      'Offline-ready with data sync',
    ],
    status: 'available',
    href: '/products/pos',
  },
  {
    id: 'attendance',
    icon: 'fingerprint',
    badge: 'HR & Workforce',
    title: 'Web Attendance',
    tagline: 'Know who's in, anytime.',
    description:
      'A web-based employee attendance system with location verification and automated reporting — no dedicated hardware kiosks needed.',
    features: [
      'Check-in / check-out via web browser',
      'GPS-based location validation',
      'Shift scheduling & overtime tracking',
      'Exportable attendance reports (PDF / CSV)',
      'Role-based access for HR and managers',
    ],
    status: 'available',
    href: '/products/attendance',
  },
  {
    id: 'amertask',
    icon: 'layout-kanban',
    badge: 'Project Management',
    title: 'Amertask',
    tagline: 'Your team's work, clearly managed.',
    description:
      'Amertask is Amertarva's project management platform — a focused tool for teams to plan tasks, track progress, and ship work without the noise of over-engineered PM tools.',
    features: [
      'Kanban boards & task assignment',
      'Project milestones & deadline tracking',
      'Team workload overview',
      'Activity log & audit trail',
      'Integrated with Amertarva ecosystem',
    ],
    status: 'available',
    href: '/products/amertask',
  },
]
```

### 5.3 Product Card Styling

Cards use `secondary` as the dominant surface — consistent with the 30% secondary weight of this site.

```
[Card: bg-secondary/10 border border-secondary/25 rounded-2xl p-7 hover:border-secondary/50 hover:bg-secondary/15 transition]
  [Header row: flex items-start justify-between]
    [Icon box: w-11 h-11 bg-secondary/25 rounded-xl flex items-center justify-center text-heading]
    [Status badge: text-[10px] font-medium uppercase tracking-wider
                   — 'available': bg-secondary/15 text-secondary border border-secondary/30
                   — 'coming-soon': bg-body/10 text-body border border-body/20]
  [Badge label: text-xs text-body uppercase tracking-wider mt-4 mb-1]
  [Title h3: text-heading text-xl font-semibold]
  [Tagline: text-secondary text-sm font-medium italic mb-3]  ← secondary used for brand tagline
  [Description: text-body text-sm leading-relaxed mb-5]
  [Feature list: space-y-2]
    [li: flex items-center gap-2 text-body text-xs]
      [Dot: w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0]
      [text]
  [Divider: border-t border-secondary/20 mt-6 pt-4]
  [CTA link: text-heading text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all]
    "Learn more →"
```

Product cards render in a **3-column grid on desktop**, single column on mobile:
```
grid grid-cols-1 md:grid-cols-3 gap-6
```

---

## 6. Why Amertarva Office Section

A short trust-building section between Products and CTA. Three to four stat/value columns.

```ts
// src/data/why.ts
export const whyItems = [
  {
    value: '3',
    unit: 'Products',
    description: 'Purpose-built tools covering the core of business operations.',
  },
  {
    value: '1',
    unit: 'Ecosystem',
    description: 'All products integrate natively within the Amertarva platform.',
  },
  {
    value: 'Web-first',
    unit: '',
    description: 'No app installs, no hardware dependencies — runs in any browser.',
  },
  {
    value: 'Local',
    unit: 'Support',
    description: 'Indonesian-based team, responsive and available when you need us.',
  },
]
```

Layout: `grid grid-cols-2 md:grid-cols-4`, each cell has a large value in `text-heading font-bold`, small unit in `text-accent font-medium`, and description in `text-body text-sm`.

---

## 7. CTA Section

```ts
// src/data/cta.ts
export const cta = {
  title: 'Ready to Streamline\nYour Operations?',
  subtitle:
    'Tell us what your business needs. We'll respond within one business day with a tailored recommendation.',
  button: {
    label: 'Get in Touch',
    href: 'mailto:office@amertarva.app',
  },
  note: 'No commitment required. Free initial consultation.',
}
```

CTA section background uses `bg-accent/10` to differentiate from the page base — consistent with the accent-dominant token role on this site.

---

## 8. Page Structure (Astro)

```
src/
├── layouts/
│   └── BaseLayout.astro        ← imports themes.css, anti-FOUC script, ThemeToggle
├── pages/
│   └── index.astro             ← assembles all sections
├── components/
│   ├── ThemeToggle.astro
│   ├── Navbar.astro
│   └── sections/
│       ├── HeroSection.astro
│       ├── ProductsSection.astro
│       ├── WhySection.astro
│       └── CtaSection.astro
├── data/
│   ├── hero.ts
│   ├── products.ts
│   ├── why.ts
│   └── cta.ts
├── styles/
│   └── themes.css
└── public/
    └── images/
        └── hero-bg.jpg         ← background image for hero section
```

---

## 9. Copy & Naming Rules

- **Amertask** is always written as `Amertask` (capital A, no space, no hyphen). Never "AmertaTask", "Amerta Task", or "amertask".
- **Amertarva Office** refers to this platform/site as a whole — it is a product suite, not a company division.
- All UI copy is in **English**. Do not mix Bahasa Indonesia into component templates.
- The `tagline` field of each product (in `products.ts`) is the **only** place italic/accent-colored text appears — do not apply this style elsewhere.

---

## 10. FORBIDDEN

- ❌ Do not use flat `bg-base` as the only background — accent-tinted surfaces (`bg-accent/10`, `bg-accent/15`) must be the dominant card/panel background
- ❌ Do not write hex values directly in any `.astro` or `.ts` file — use Tailwind token classes only
- ❌ Do not use `dark:` Tailwind prefix — this project uses `[data-theme="amerta-night"]` selector strategy
- ❌ Do not hardcode copy text in `.astro` component templates — all text must be imported from `src/data/*.ts`
- ❌ Do not add a fourth product card without updating this spec first
- ❌ Do not refer to Amertask as a third-party tool — it is an Amertarva-owned product
- ❌ Do not use a flat solid color for the hero background — the image + gradient overlay spec in Section 4 is mandatory
- ❌ Do not place `<form>` elements — use `mailto:` or a third-party form embed for the CTA contact action

---

## 11. Pre-Commit Checklist

- [ ] `src/styles/themes.css` exists with both `amerta-day` and `amerta-night` variables
- [ ] Anti-FOUC inline script is present in `BaseLayout.astro` before any stylesheet
- [ ] Hero section has background image + gradient overlay — not a flat background
- [ ] `hero-bg.jpg` exists at `/public/images/hero-bg.jpg`
- [ ] All three products are rendered from `src/data/products.ts` via `Astro.props` or direct import
- [ ] Product taglines render in `text-accent` italic — no other elements use this style
- [ ] Theme toggle persists across page reload (check `localStorage`)
- [ ] No hex color values exist anywhere in `.astro` or `.ts` files
- [ ] No Bahasa Indonesia copy in any component template
- [ ] Amertask is spelled correctly in all occurrences