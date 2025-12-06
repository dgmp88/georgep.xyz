# Astro JS Migration Plan

## Current State

- Next.js 12 site with React 18, TailwindCSS + DaisyUI
- Markdown blog (10 posts after removing backgrounds.md)
- Interactive components: 4K weeks visualization, games iframe
- Google Analytics integration

## What NOT to Migrate

- **Backgrounds**: The backgrounds designer has moved to a separate project at `geometry.georgep.xyz`. Delete `pages/backgrounds.jsx`, `components/backgrounds/`, `lib/backgrounds/`, and `posts/backgrounds.md`.
- **Circles/Pixi**: The `/circles` page is an orphaned demo not linked from anywhere. Delete `pages/circles.js` and `components/pixi.js`.
- **Unused files**: `components/homeBackgroundMovingLines.js` (unused), `lib/math.js` (only in debug script)

## Migration Progress

### ✅ Phase 0: Archive Current Files (DONE)

All legacy files moved to `_deprecated/`:
- `components/`, `css/`, `lib/`, `pages/`, `posts/`
- `next.config.js`, `postcss.config.js`, `tailwind.config.js`, `theme.config.js`
- `package.json`, `package-lock.json`, `node_modules/`

Kept in root: `public/`, `README.md`, `.git/`, `notebooks/`

### ✅ Phase 1: Project Setup (DONE)

**Completed:**
- [x] Astro project initialized (`astro.config.mjs`, `tsconfig.json`)
- [x] Tailwind v4 installed (via Vite plugin, not `@astrojs/tailwind`)
- [x] DaisyUI v5 installed
- [x] Basic `src/` structure created (layouts, pages, components, styles)
- [x] Global CSS with Tailwind + DaisyUI imports
- [x] React integration (`@astrojs/react`, `react`, `react-dom`)
- [x] Other deps: `lodash`, `sharp` (for 4K page + image optimization)
- [x] DaisyUI theme configured in `src/styles/global.css`
- [x] `site` added to `astro.config.mjs`

#### DaisyUI v5 Theme Setup

Add to `src/styles/global.css` after the plugin import:

```css
@import "tailwindcss";
@plugin "daisyui";

@theme {
  /* DaisyUI v5 uses CSS variables for theming */
}

/* Custom theme - DaisyUI v5 approach */
[data-theme="mytheme"] {
  --color-primary: #005f73;
  --color-secondary: #bb3e03;
  --color-accent: green;
  --color-base-100: transparent;
}
```

Note: DaisyUI v5 changed theming significantly from v2. Check [DaisyUI v5 docs](https://daisyui.com/docs/themes/) for exact syntax. Check _deprecated folder for existing themeing/colors.

#### Install React Integration

```bash
npx astro add react
# Or manually:
npm install @astrojs/react react react-dom
```

Then update `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://georgep.xyz',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### ✅ Phase 2: Create Astro Structure (DONE)

Final structure:
```
src/
  consts.ts             ✅ created (site title, description constants)
  content.config.ts     ✅ defined blog collection schema (Astro 5 location - in src/ root)
  layouts/
    BlogPost.astro      ✅ created (full HTML document layout for blog posts)
  components/
    BaseHead.astro      ✅ created (head content: meta tags, CSS import, analytics)
    Header.astro        ✅ converted from _deprecated/components/navbar.js
    Background.astro    ✅ converted from _deprecated/components/homeBackground.js
    Play.jsx            ✅ migrated from _deprecated/components/play.jsx (keep React)
    FourK.jsx           ✅ extracted from _deprecated/pages/4k/index.js (keep React)
  lib/
    colors.js           ✅ migrated from _deprecated/lib/colors.js (removed chroma-js deps)
  content/
    blog/               ✅ 10 markdown posts moved here
  pages/
    index.astro         ✅ converted from _deprecated/pages/index.jsx
    blog/
      index.astro       ✅ created
      [...slug].astro   ✅ created (dynamic blog routes - uses post.id in Astro 5)
    games.astro         ✅ created
    4k/index.astro      ✅ created
  styles/
    global.css          ✅ configured with DaisyUI theme
```

#### Site Constants

Create `src/consts.ts`:
```ts
export const SITE_TITLE = 'George P';
export const SITE_DESCRIPTION = 'Your site description';
```

#### BaseHead Component

Create `src/components/BaseHead.astro` - handles all `<head>` content:
```astro
---
import '../styles/global.css';
import { SITE_TITLE } from '../consts';

interface Props {
  title: string;
  description?: string;
}

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const { title, description = '' } = Astro.props;
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/hex.svg" />
<meta name="generator" content={Astro.generator} />

<link rel="canonical" href={canonicalURL} />

<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DZGP2WBCWD"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-DZGP2WBCWD');
</script>
```

### ✅ Phase 3: Content Collections Setup (DONE)

- [x] Created `src/content.config.ts` (Astro 5 location - in src/ root)
- [x] Copied 10 blog posts from `_deprecated/posts/` to `src/content/blog/`
- [x] Skipped `backgrounds.md` (no longer needed)
- [x] Shiki syntax highlighting is default in Astro (replaces Prism)

### ✅ Phase 4: Convert Pages (DONE)

| Current (in _deprecated/) | New | Status |
|---------------------------|-----|--------|
| `pages/index.jsx` | `src/pages/index.astro` | ✅ Done |
| `pages/blog/index.js` | `src/pages/blog/index.astro` | ✅ Done |
| `pages/blog/[slug].js` | `src/pages/blog/[...slug].astro` | ✅ Done |
| `pages/games.jsx` | `src/pages/games.astro` | ✅ Done |
| `pages/4k/index.js` | `src/pages/4k/index.astro` | ✅ Done |

### 🔲 Phase 5: Cleanup

After verifying the migration works:
- [ ] Delete the entire `_deprecated/` directory
- [ ] Delete `_blog_demo_delete/` directory (reference template)
- [ ] Delete `gp/` directory (if not needed)

### 🔲 Phase 6: Final Steps

- [ ] Verify `public/` contents work (images, games, cv.pdf, hex.svg)
- [ ] Test build with `npm run build`
- [ ] Preview with `npm run preview`

## Dependencies

### Current `package.json`
```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "astro": "^5.16.4",
    "daisyui": "^5.5.8",
    "tailwindcss": "^4.1.17"
  }
}
```

### Still Need to Add
- `@astrojs/react` (React integration)
- `react`, `react-dom` (for interactive components)
- `lodash` (used in 4K page)
- `sharp` (image optimization)

### Optional Nice-to-Have
- `@astrojs/sitemap` - auto-generates sitemap.xml
- `@astrojs/mdx` - if you want React components inside markdown

### Removed (no longer in package.json)
- ~~`next`, `@next/bundle-analyzer`~~
- ~~`gray-matter`, `showdown`~~ (replaced by Astro's markdown handling)
- ~~`three`, `@svgdotjs/svg.js`, `delaunator`~~ (only used by backgrounds)
- ~~`pixi.js`~~ (circles page removed)
- ~~`chroma-js`~~ (only used by backgrounds; 4K page's `lerpPalette` is pure JS)
- ~~`prismjs`~~ (replaced by Astro's built-in Shiki)
- ~~`@fortawesome/*`~~ (navbar will use inline SVG)

## Notes

### Tailwind v4 Changes from v3
- Uses Vite plugin instead of PostCSS
- CSS-first configuration (no `tailwind.config.js`)
- Import syntax: `@import "tailwindcss";`
- Plugin syntax: `@plugin "daisyui";`

### DaisyUI v5 Changes from v2
- CSS variable-based theming
- Different theme configuration syntax
- Check [DaisyUI v5 docs](https://daisyui.com/docs/themes/) for migration guide

### Shiki vs Prism
Astro uses Shiki by default for code highlighting. Benefits:
- No client-side JS required
- Highlighting happens at build time
- VS Code theme compatibility
- No need for `prism.css` or `Prism.highlightAll()` calls

### Astro 5 Blog Page Pattern

The official template pattern for `src/pages/blog/[...slug].astro`:

```astro
---
import { type CollectionEntry, getCollection, render } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },  // NOTE: post.id not post.slug
    props: post,
  }));
}

type Props = CollectionEntry<'blog'>;

const post = Astro.props;
const { Content } = await render(post);
---

<BlogPost {...post.data}>
  <Content />
</BlogPost>
```

### Blog Index Pattern

For `src/pages/blog/index.astro`, sort posts by date and link with trailing slash:

```astro
---
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
---

{posts.map((post) => (
  <a href={`/blog/${post.id}/`}>
    {post.data.title}
  </a>
))}
```
