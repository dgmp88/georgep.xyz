# SvelteKit Migration Plan

## Overview

Migrating from **Next.js 12.1.5** to **SvelteKit 2.x**. The current site is fully static (uses `next export`), has no API routes or SSR, making it a relatively straightforward candidate for migration.

**Key Advantages of This Migration:**
- Site is 100% static - perfect for SvelteKit's static adapter
- No API routes to convert
- Simple data fetching (only `getStaticProps`, no `getServerSideProps`)
- File-based routing translates well
- Tailwind CSS works identically

**Main Challenges:**
- JSX → Svelte syntax conversion
- Canvas/WebGL library integration (Pixi.js, SVG.js)
- Markdown processing pipeline
- React component patterns → Svelte reactivity

---

## Phase 1: Setup & Configuration

### TODOs

- [ ] **Initialize SvelteKit project**
  - Run `npm create svelte@latest sveltekit-migration`
  - Choose TypeScript or JavaScript (recommend JS for easier migration)
  - Enable Prettier, ESLint, Playwright
  - Copy over `package.json` dependencies

- [ ] **Configure static adapter**
  - Install `@sveltejs/adapter-static`
  - Configure for GitHub Pages deployment
  - Set `prerender = true` for all routes

- [ ] **Setup Tailwind CSS + DaisyUI**
  - `npx svelte-add@latest tailwindcss`
  - Install DaisyUI and configure
  - Copy `tailwind.config.js` settings (theme, colors)
  - Port any custom CSS from `css/` directory

- [ ] **Configure build pipeline**
  - Update `.github/workflows/node.js.yml` for SvelteKit
  - Change build command to `npm run build`
  - Output directory changes from `out/` to `build/`

- [ ] **Setup FontAwesome**
  - SvelteKit-compatible approach (likely direct SVG or `svelte-fa`)
  - May need to replace `@fortawesome/react-fontawesome`

---

## Phase 2: Core Structure & Layout

### TODOs

- [ ] **Create root layout** (`src/routes/+layout.svelte`)
  - Port `_app.js` logic
  - Include global styles
  - Setup Google Analytics (port `next/script` gtag code)

- [ ] **Port Navbar component**
  - Convert `components/navbar.js` to Svelte
  - Replace `next/link` with `<a>` tags or SvelteKit's `goto`
  - Update styling (should be minimal changes)

- [ ] **Setup fonts and static assets**
  - Move `public/` contents to `static/`
  - Update font loading if any
  - Verify image paths

---

## Phase 3: Pages Migration

### Simple Pages (Low Risk)

- [ ] **Home page** (`pages/index.jsx` → `src/routes/+page.svelte`)
  - Convert JSX to Svelte syntax
  - Port `homeBackground.js` component
  - Verify inline SVG rendering

- [ ] **Games page** (`pages/games.jsx` → `src/routes/games/+page.svelte`)
  - Convert iframe embedding logic
  - Port `components/play.jsx` to Svelte
  - Test fullscreen functionality

### Canvas/Graphics Pages (Medium Risk)

- [ ] **Circles demo** (`pages/circles.js` → `src/routes/circles/+page.svelte`)
  - Port Pixi.js integration to Svelte `onMount`
  - Test WebGL rendering
  - Verify animation loop cleanup
  - Ensure no SSR issues (use `browser` check)

- [ ] **4K Weeks** (`pages/4k/index.jsx` → `src/routes/4k/+page.svelte`)
  - Convert canvas drawing logic
  - Port month calculation utilities
  - Test mobile responsiveness

### Blog System (High Risk - Complex)

- [ ] **Setup mdsvex** (or alternative markdown processor)
  - Install `mdsvex`
  - Configure frontmatter parsing
  - Setup syntax highlighting (replace Prism.js)
  - Test with existing `.md` files in `posts/`

- [ ] **Blog listing page** (`pages/blog/index.js` → `src/routes/blog/+page.svelte`)
  - Create `+page.server.js` to load posts
  - Replace `lib/posts.js` Node.js file reading with Vite glob imports
  - Port sorting and filtering logic
  - Verify date formatting

- [ ] **Dynamic blog posts** (`pages/blog/[slug].js` → `src/routes/blog/[slug]/+page.svelte`)
  - Setup dynamic route
  - Create `+page.server.js` for post loading
  - Port markdown rendering
  - Style with `@tailwindcss/typography`
  - Test code syntax highlighting

---

## Phase 4: Components & Libraries

### Component Conversion

- [ ] **Convert all components to Svelte**
  - `navbar.js` ✓ (done in Phase 2)
  - `homeBackground.js` - SVG background
  - `pixi.js` - Pixi.js wrapper
  - `play.jsx` - Game iframe
  - Any components in `components/backgrounds/` (if needed - user said skip this)

### Library Integration Testing

- [ ] **Pixi.js integration**
  - Ensure `onMount` lifecycle works correctly
  - Test WebGL context creation
  - Verify requestAnimationFrame cleanup
  - Check memory leaks on page navigation

- [ ] **SVG.js integration** (if keeping background designer)
  - Test SVG manipulation in Svelte
  - Verify download functionality
  - Check reactive updates with controls

- [ ] **Chroma.js** - Should work identically
- [ ] **Lodash** - Should work identically
- [ ] **Delaunator** - Should work identically

---

## Phase 5: Testing Strategy

### Manual Testing Checklist

- [ ] **Navigation**
  - All nav links work
  - Active link highlighting
  - Mobile menu (if applicable)

- [ ] **Home Page**
  - Background SVG renders
  - Profile image loads
  - Layout is correct
  - Mobile responsive

- [ ] **Blog**
  - Post listing loads with correct dates
  - Individual posts render markdown correctly
  - Code blocks have syntax highlighting
  - Images in posts load
  - Links work

- [ ] **Games**
  - Both games load in iframes
  - Fullscreen buttons work
  - Mobile layout is correct

- [ ] **Circles**
  - Pixi.js canvas initializes
  - Animation runs smoothly
  - No console errors
  - Cleanup on navigation away

- [ ] **4K Weeks**
  - Canvas renders correctly
  - Birthday input works
  - Weeks calculate accurately
  - Mobile responsive

- [ ] **Cross-browser**
  - Chrome
  - Firefox
  - Safari
  - Mobile Safari
  - Mobile Chrome

### Playwright E2E Tests

Create test suite in `tests/` directory:

#### Test 1: Navigation & Routing
```javascript
// tests/navigation.spec.js
test('should navigate to all main pages', async ({ page }) => {
  await page.goto('/');

  // Test home page loads
  await expect(page.locator('h1')).toContainText('George Pearman');

  // Test blog navigation
  await page.click('a[href="/blog"]');
  await expect(page).toHaveURL('/blog');
  await expect(page.locator('h1')).toContainText('Blog');

  // Test games navigation
  await page.click('a[href="/games"]');
  await expect(page).toHaveURL('/games');

  // Test circles navigation
  await page.click('a[href="/circles"]');
  await expect(page).toHaveURL('/circles');
});
```

#### Test 2: Blog System
```javascript
// tests/blog.spec.js
test('blog listing shows posts', async ({ page }) => {
  await page.goto('/blog');

  // Should have multiple post links
  const postLinks = page.locator('a[href^="/blog/"]');
  await expect(postLinks).toHaveCount.greaterThan(0);

  // Click first post
  const firstPost = postLinks.first();
  const href = await firstPost.getAttribute('href');
  await firstPost.click();

  // Should navigate to post page
  await expect(page).toHaveURL(href);

  // Should have article content
  await expect(page.locator('article')).toBeVisible();
});

test('blog post renders markdown', async ({ page }) => {
  // Pick a known post
  await page.goto('/blog/some-post-slug');

  // Check for markdown elements
  await expect(page.locator('h1, h2, h3')).toBeVisible();
  await expect(page.locator('p')).toBeVisible();

  // Check code blocks if present
  const codeBlocks = page.locator('pre code');
  if (await codeBlocks.count() > 0) {
    // Should have syntax highlighting classes
    await expect(codeBlocks.first()).toHaveClass(/language-/);
  }
});
```

#### Test 3: Canvas/Graphics
```javascript
// tests/graphics.spec.js
test('pixi circles render', async ({ page }) => {
  await page.goto('/circles');

  // Wait for canvas to appear
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();

  // Check canvas has correct WebGL context
  const is2d = await canvas.evaluate(el => {
    const ctx = el.getContext('webgl') || el.getContext('webgl2');
    return ctx !== null;
  });
  expect(is2d).toBe(true);

  // Wait a bit and check no errors
  await page.waitForTimeout(1000);
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  expect(errors).toHaveLength(0);
});

test('4k weeks renders canvas', async ({ page }) => {
  await page.goto('/4k');

  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();

  // Test birthday input
  await page.fill('input[type="date"]', '1990-01-01');

  // Canvas should update (check it's not blank)
  const hasContent = await canvas.evaluate(el => {
    const ctx = el.getContext('2d');
    const imageData = ctx.getImageData(0, 0, el.width, el.height);
    return imageData.data.some(channel => channel !== 0);
  });
  expect(hasContent).toBe(true);
});
```

#### Test 4: Games
```javascript
// tests/games.spec.js
test('games page loads iframes', async ({ page }) => {
  await page.goto('/games');

  // Should have game iframes
  const iframes = page.locator('iframe');
  await expect(iframes).toHaveCount.greaterThan(0);

  // Check they have valid src
  const firstIframe = iframes.first();
  const src = await firstIframe.getAttribute('src');
  expect(src).toBeTruthy();
});
```

#### Test 5: Static Asset Loading
```javascript
// tests/assets.spec.js
test('images load correctly', async ({ page }) => {
  await page.goto('/');

  // Check profile image
  const images = page.locator('img');
  for (const img of await images.all()) {
    const naturalWidth = await img.evaluate(el => el.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  }
});

test('no 404 errors on assets', async ({ page }) => {
  const failed = [];
  page.on('response', response => {
    if (response.status() === 404) {
      failed.push(response.url());
    }
  });

  await page.goto('/');
  await page.goto('/blog');
  await page.goto('/games');

  expect(failed).toHaveLength(0);
});
```

#### Test 6: Mobile Responsiveness
```javascript
// tests/mobile.spec.js
test('mobile layout works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

  await page.goto('/');

  // Check mobile-specific elements render
  await expect(page.locator('nav')).toBeVisible();

  // Navigate to pages
  await page.goto('/blog');
  await expect(page.locator('h1')).toBeVisible();

  await page.goto('/games');
  const iframes = page.locator('iframe');
  await expect(iframes.first()).toBeVisible();
});
```

### Visual Regression Testing (Optional)

- [ ] **Setup Playwright screenshot comparison**
  - Take screenshots of each page in Next.js version
  - Compare with SvelteKit version
  - Flag any layout differences

- [ ] **Percy or Chromatic integration** (if budget allows)
  - Automated visual diffs
  - Cross-browser testing

---

## Sticking Points & Solutions

### 🔴 HIGH RISK: Markdown Blog System

**Problem:** Next.js uses Node.js `fs` module to read markdown files at build time. SvelteKit has different patterns.

**Solutions:**
1. **Use mdsvex** - Recommended approach
   - Import `.md` files directly as Svelte components
   - Frontmatter becomes props
   - Full control over rendering

2. **Use Vite glob imports** - Alternative
   ```javascript
   // +page.server.js
   const posts = import.meta.glob('/posts/*.md', { eager: true });
   ```

3. **Keep file system approach**
   - Use `+page.server.js` (runs only on server/build)
   - Import `fs` from Node.js
   - Works with static adapter

**Recommendation:** Start with option 3 (minimal changes), then migrate to mdsvex later for better DX.

### 🔴 HIGH RISK: Pixi.js WebGL Rendering

**Problem:** Pixi.js needs browser APIs, can't run during SSR. Also needs careful lifecycle management.

**Solutions:**
1. **Disable SSR for route**
   ```javascript
   // +page.js
   export const ssr = false;
   ```

2. **Use `onMount` and browser check**
   ```svelte
   <script>
     import { onMount } from 'svelte';
     import { browser } from '$app/environment';

     onMount(() => {
       if (!browser) return;
       // Initialize Pixi here

       return () => {
         // Cleanup
       };
     });
   </script>
   ```

3. **Dynamic import**
   ```javascript
   if (browser) {
     const PIXI = await import('pixi.js');
   }
   ```

**Recommendation:** Combine 1 + 2. Disable SSR for `/circles` route and use `onMount` for initialization.

### 🟡 MEDIUM RISK: Link Components

**Problem:** Next.js `<Link>` wraps `<a>` tags. SvelteKit uses regular `<a>` with client-side routing.

**Solutions:**
- Simple find-replace in most cases
- Navigation is handled automatically
- For programmatic navigation, use `goto` from `$app/navigation`

**Recommendation:** Straightforward - just use `<a href="/path">` everywhere.

### 🟡 MEDIUM RISK: Google Analytics

**Problem:** Currently uses `next/script` to load gtag.js.

**Solutions:**
1. **Use `svelte-gtag`** package
2. **Manual script injection** in `app.html`
3. **Use `<svelte:head>` in layout**

**Recommendation:** Option 3 for simplicity - add script tag in `+layout.svelte`.

### 🟡 MEDIUM RISK: SVG.js Integration

**Problem:** DOM manipulation library needs to run in browser.

**Solutions:**
- Same as Pixi.js - use `onMount` and `browser` check
- SVG.js is lighter weight, should be easier

**Note:** User said to skip background designer, but keep this in mind if needed.

### 🟢 LOW RISK: Styling

**Problem:** Minimal - Tailwind and DaisyUI work the same.

**Solutions:**
- `class` instead of `className`
- Direct use of `:global()` for any global styles
- Scoped styles work better in Svelte

### 🟢 LOW RISK: State Management

**Problem:** React `useState` → Svelte reactivity.

**Solutions:**
- Simple: `let count = 0` instead of `const [count, setCount] = useState(0)`
- `$:` for computed values instead of `useMemo`
- Stores for shared state instead of Context

**Recommendation:** This will actually simplify code significantly.

---

## Migration Workflow

### Recommended Approach: Incremental Migration

1. **Setup parallel SvelteKit project** (in subdirectory or branch)
2. **Migrate page-by-page**, testing each
3. **Start with simplest pages** (home, games)
4. **Then medium complexity** (circles, 4k weeks)
5. **End with blog system** (most complex)
6. **Run Playwright tests after each page**
7. **Deploy preview to Netlify/Vercel** for testing
8. **Final cutover** once all tests pass

### Alternative: Big Bang Migration

- Migrate everything at once
- Higher risk but faster
- Requires comprehensive testing before deploy

**Recommendation:** Incremental approach - lower risk, easier debugging.

---

## Testing Milestones

### Milestone 1: Project Setup ✓
- [ ] SvelteKit initializes and runs
- [ ] Tailwind + DaisyUI working
- [ ] Static adapter builds successfully
- [ ] Can deploy to test environment

### Milestone 2: First Page (Home) ✓
- [ ] Home page renders correctly
- [ ] Navbar works
- [ ] Visual parity with Next.js version
- [ ] Playwright test passes

### Milestone 3: Simple Pages ✓
- [ ] Games page works
- [ ] Iframes load correctly
- [ ] Playwright tests pass

### Milestone 4: Canvas Pages ✓
- [ ] Circles page renders
- [ ] Pixi.js works without errors
- [ ] 4K weeks canvas works
- [ ] No memory leaks on navigation
- [ ] Playwright tests pass

### Milestone 5: Blog System ✓
- [ ] Blog listing loads posts
- [ ] Individual posts render
- [ ] Markdown converts correctly
- [ ] Syntax highlighting works
- [ ] All Playwright tests pass

### Milestone 6: Production Ready ✓
- [ ] All pages migrated
- [ ] All tests passing
- [ ] Cross-browser testing complete
- [ ] Performance is equal or better
- [ ] GitHub Pages deployment works
- [ ] Google Analytics tracking

---

## Performance Targets

Use these as benchmarks (compare Next.js vs SvelteKit):

- **Lighthouse Score:** Should be 90+ on all metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** Ideally smaller than Next.js (Svelte is lighter)
- **Build Time:** Comparable or faster

---

## Rollback Plan

If migration hits major blockers:

1. **Keep Next.js deployment running** until SvelteKit is ready
2. **Use git branches** for parallel development
3. **Deploy SvelteKit to subdomain** for testing (e.g., beta.georgep.xyz)
4. **DNS switch** only when fully validated

---

## Additional Resources

### Helpful Links
- [SvelteKit Docs - Migrating to SvelteKit](https://kit.svelte.dev/docs/migrating)
- [SvelteKit Static Adapter](https://kit.svelte.dev/docs/adapter-static)
- [mdsvex Documentation](https://mdsvex.pngwn.io/)
- [Pixi.js + Svelte Examples](https://github.com/mattjennings/svelte-pixi)
- [Playwright Testing](https://playwright.dev/)

### Similar Migrations
- Search GitHub for "next to sveltekit migration"
- Many sites have documented the process

---

## Estimated Timeline

**Conservative estimate:**
- Phase 1 (Setup): 2-4 hours
- Phase 2 (Layout): 2-3 hours
- Phase 3 (Pages): 8-12 hours
- Phase 4 (Components): 4-6 hours
- Phase 5 (Testing): 4-8 hours
- **Total: 20-33 hours**

**Aggressive estimate:**
- If familiar with SvelteKit: 12-16 hours

**Note:** Blog system is the biggest unknown - could be quick with right approach or require iteration.

---

## Final Thoughts

This is a **GOOD candidate for SvelteKit migration**:

✅ Fully static site
✅ No API routes
✅ Simple data fetching
✅ No complex state management
✅ Straightforward component tree

The main challenges are around the graphics libraries (Pixi.js, Canvas) and the markdown pipeline, but both have well-known solutions in the SvelteKit ecosystem.

**Biggest wins:**
- Smaller bundle size
- Simpler reactivity model
- Better DX (no more JSX boilerplate)
- Faster HMR during development
- More modern framework

**Biggest risks:**
- Pixi.js integration (medium risk, well-documented solutions)
- Markdown processing (medium risk, multiple viable approaches)
- Time investment (opportunity cost)

Overall: **Recommend proceeding** with incremental migration approach + comprehensive Playwright tests.
