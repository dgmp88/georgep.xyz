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

## Migration Strategy

### Phase 0: Archive Current Files

Move all current project files into `_deprecated/` to avoid conflicts:

- `components/`, `css/`, `lib/`, `pages/`, `posts/`
- `next.config.js`, `postcss.config.js`, `tailwind.config.js`, `theme.config.js`
- `package.json`, `package-lock.json`, `node_modules/`,

Keep in root: `public/`, `README.md`, `.git/`, `notebooks/`

### Phase 1: Project Setup

1. Initialize Astro in the now-clean directory:
   - Create `astro.config.mjs` with React and Tailwind integrations
   - Update `package.json` with Astro deps, remove Next.js deps
   - Create `tsconfig.json` for Astro

2. Create new `tailwind.config.mjs` with:
   - Astro content paths (`./src/**/*.{astro,jsx,tsx}`)
   - Updated syntax (`content` instead of `purge`, remove deprecated `mode: 'jit'`)
   - DaisyUI 4.x theme config (may need adjustments from v2 syntax)

3. Create `src/styles/` and copy CSS from `_deprecated/css/` (skip `prism.css` - using Shiki)

### Phase 2: Create Astro Structure

```
src/
  layouts/
    BaseLayout.astro    (replaces _app.js - includes analytics, global styles, Background, NavBar)
    BlogPost.astro      (extends BaseLayout for blog posts)
  components/
    Navbar.astro        (convert from React to pure Astro, inline SVG for menu icon)
    Background.astro    (simple CSS background component)
    Play.jsx            (keep as React - needs client-side interactivity)
    FourK.jsx           (keep as React - canvas interactivity)
  lib/
    colors.js           (copy from _deprecated/lib/ - used by FourK)
  content/
    config.ts           (define blog collection schema)
    blog/               (move markdown posts here)
  pages/
    index.astro
    blog/
      index.astro
      [slug].astro      (dynamic blog routes - NOT [...slug])
    games.astro
    4k/index.astro
```

### Phase 3: Content Collections Setup

- Create `src/content/config.ts` with blog collection schema (title, date)
- Copy 10 blog posts from `_deprecated/posts/` to `src/content/blog/`
- Skip `backgrounds.md` (no longer needed)
- Configure Shiki syntax highlighting in `astro.config.mjs` (replaces Prism)

### Phase 4: Convert Pages

| Current (in _deprecated/) | New | Notes |
|---------------------------|-----|-------|
| `pages/index.jsx` | `src/pages/index.astro` | Static Astro component |
| `pages/blog/index.js` | `src/pages/blog/index.astro` | Use `getCollection('blog')` |
| `pages/blog/[slug].js` | `src/pages/blog/[slug].astro` | Use `getStaticPaths` + Content Collections |
| `pages/games.jsx` | `src/pages/games.astro` | Keep Play component with `client:only="react"` |
| `pages/4k/index.js` | `src/pages/4k/index.astro` | Keep FourK component with `client:load` |

### Phase 5: Google Analytics

Add to `BaseLayout.astro` `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DZGP2WBCWD"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-DZGP2WBCWD');
</script>
```

### Phase 6: Cleanup

After verifying the migration works:
- Delete the entire `_deprecated/` directory

### Phase 7: Final Steps

- Verify `public/` contents work (images, games, cv.pdf, hex.svg)
- Test build with `npm run build` and preview with `npm run preview`

## Dependencies

### Keep
- `react`, `react-dom` (for interactive components)
- `chroma-js` (used by lib/colors.js → 4K page)
- `lodash` (used in 4K page)

### Remove
- `next`, `@next/bundle-analyzer`
- `gray-matter`, `showdown` (replaced by Astro's markdown handling)
- `three`, `@svgdotjs/svg.js`, `delaunator` (only used by backgrounds)
- `pixi.js` (circles page removed)
- `prismjs` (replaced by Astro's built-in Shiki highlighting)
- `@fortawesome/*` (navbar converts to pure Astro with inline SVG)

### Add
- `astro`
- `@astrojs/react`
- `@astrojs/tailwind`

### Upgrade
- `tailwindcss` → latest (v3.4+)
- `daisyui` → latest (v4.x) - note: theme config syntax changed from v2
- `@tailwindcss/typography` → latest

## Notes

### DaisyUI v2 → v4 Changes
The custom theme will need updating. Old v2 config:
```js
daisyui: {
  themes: [{
    mytheme: {
      primary: '#005f73',
      secondary: '#bb3e03',
      accent: 'green',
      'base-100': '#ffffff00',
    },
  }],
}
```
Check DaisyUI v4 docs for any required color keys or syntax changes.

### Shiki vs Prism
Astro uses Shiki by default for code highlighting. Benefits:
- No client-side JS required
- Highlighting happens at build time
- VS Code theme compatibility
- No need for `prism.css` or `Prism.highlightAll()` calls
