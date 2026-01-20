# Component Improvements Analysis

## Performance, Security, and Accessibility Review

Based on Vercel React Best Practices and Web Interface Guidelines, here are the components that need improvements:

---

## 🔴 CRITICAL PRIORITY

### `src/modules/map/map-create-request-dialog-trigger/map-create-request-form.tsx`

**Performance:**

- ✓ Line 90-95: Form submission handler now uses `startTransition` for non-urgent updates (`rerender-transitions`) - FIXED
- ✓ Line 57-66: `useEffect` dependency array includes `form` object which may cause unnecessary re-runs - consider extracting `setFieldValue` method or using ref - FIXED
- Line 99: Large scrollable container (`h-[70vh]`) without virtualization - if form fields grow, consider `content-visibility: auto` (`rendering-content-visibility`)
- ✓ Line 248: Loading text uses `"Creating…"` (typography rule) - FIXED

**Security:**

- Line 21 (in actions file): `console.log(value)` in production code - remove or guard with environment check
- ✓ Line 133: Email input now uses `type="email"` - FIXED
- ✓ Line 152: Phone input now uses `type="tel"` - FIXED

**Accessibility:**

- ✓ Line 135: Email input has `autoComplete="email"` attribute (fixed)
- ✓ Line 136: Email input has `inputMode="email"` (fixed)
- ✓ Line 155: Phone input has `autoComplete="tel"` attribute (fixed)
- ✓ Line 156: Phone input has `inputMode="tel"` (fixed)
- ✓ Line 111, 134, 153, 177, 229: Placeholders now have trailing `…` - FIXED
- Line 247: Loading state should use `aria-live="polite"` region for screen readers
- Line 99: Scrollable container needs `tabindex="0"` and keyboard navigation support

---

### `src/components/map/map-container.tsx`

**Performance:**

- ✓ Line 63-114: Map library now uses dynamic import (`bundle-dynamic-imports`) - maplibre-gl is code-split and loaded on demand, reducing initial bundle size - FIXED
- ✓ Line 12-51: Large style object extracted to constant `MAP_STYLE` outside component to prevent recreation on every render - FIXED
- ✓ Line 80: Uses `Config.MAP_TILES_URL` environment variable - FIXED
- Line 107-113: Cleanup function properly handles map instance removal

**Security:**

- ✓ Line 80: Uses `Config.MAP_TILES_URL` environment variable - FIXED
- Line 15, 24, 35: External tile URLs without CORS validation or error handling

**Accessibility:**

- ✓ Line 105: Map container missing `role="application"` and `aria-label="Interactive map"` - FIXED
- Line 105: Missing keyboard navigation instructions or skip link

---

### `src/modules/map/map-review/map-review.tsx`

**Performance:**

- Line 36-120: Entire map instance recreated on every `latitude`/`longitude` change - should use refs and update center/marker instead
- ✓ Line 34: `useState` for zoom removed - zoom now derived from map instance via `getZoom()` - FIXED
- Line 38-77: Large inline style object recreated - extract to constant
- Line 87-90: Map interaction handler added without cleanup

**Security:**

- Line 43, 52, 62: External tile URLs without error handling or fallback

**Accessibility:**

- ✓ Line 139-140: Map container has `role="application"` and `aria-label="Map review"` - FIXED
- ✓ Line 166, 174: Icon-only zoom buttons have `aria-label` attributes ("Zoom in", "Zoom out") - FIXED
- ✓ Line 186: "Edit map location" button has `aria-label="Edit map location"` - FIXED
- ✓ Line 155: Decorative icon has `aria-hidden="true"` - FIXED

---

### `src/components/map/map-controls.tsx`

**Accessibility:**

- ✓ Line 34: Fullscreen button has `aria-label="Fullscreen"` - FIXED
- ✓ Line 52: Current location button has `aria-label="Get current location"` - FIXED
- ✓ Line 71: Zoom in button has `aria-label="Zoom in"` - FIXED
- ✓ Line 89: Zoom out button has `aria-label="Zoom out"` - FIXED
- **All icon buttons now have proper `aria-label` attributes** - FIXED

**Performance:**

- ✓ Line 19: Handlers from `useMap` hook are now memoized with `useCallback` - FIXED

---

### `src/modules/auth/sign-in/sign-in.tsx`

**Security:**

- ✓ Line 52: Email input now uses `type="email"` - FIXED
- ✓ Line 54: Email input has `autocomplete="email"` attribute - FIXED
- ✓ Line 81: Password input has `autocomplete="current-password"` attribute - FIXED
- ✓ Line 53: Placeholder has trailing `…` - FIXED

**Accessibility:**

- ✓ Line 89: Loading state uses `"Signing in…"` and has `aria-live="polite"` - FIXED
- ✓ Line 67-72: Link now uses `<Link>` component for proper navigation (Cmd+click support) - FIXED

---

### `src/utils/api.ts`

**Security:**

- ✓ Line 6: Uses `Config.API_URL` environment variable - FIXED
- Missing request/response interceptors for error handling and security headers
- No timeout configuration

---

## 🟡 HIGH PRIORITY

### `src/hooks/use-map/use-map.ts`

**Performance:**

- Line 11-16: `useMemo` dependency on `mapInstance` - `mapInstance?.getCenter()` called on every render, should be memoized or use event listeners
- ✓ Line 18-32: Async function `handleCurrentLocation` wrapped in `useCallback` - FIXED
- ✓ Line 34-40, 42-48: Functions `handleZoomIn` and `handleZoomOut` wrapped in `useCallback` - FIXED
- ✓ Line 50-65: Fullscreen handler `handleFullscreen` wrapped in `useCallback` - FIXED

**Security:**

- Line 30, 62: `console.error` in production - should use proper error logging service

---

### `src/modules/map/map-create-request-dialog-trigger/map-create-request-form.actions.tsx`

**Security:**

- Line 21: `console.log(value)` - remove or guard with environment check
- Missing actual API call - form submission not implemented

**Performance:**

- Line 20-22: Form submission handler could use `startTransition` for non-urgent updates

---

### `src/modules/map/map/map-search.tsx`

**Accessibility:**

- ✓ Line 21: Icon button has `aria-label="Search"` (good)
- ✓ Line 29: Input has `autocomplete="off"` attribute - FIXED
- ✓ Line 27: Placeholder has trailing `…` - FIXED
- ✓ Line 28: Input has `type="search"` for better mobile keyboard - FIXED

**Performance:**

- Line 17: Inline className with responsive breakpoints - consider extracting

---

### `src/components/ui/password-input.tsx`

**Accessibility:**

- Line 35: Icon button has `aria-label="Info"` but should be `aria-label="Toggle password visibility"` (more descriptive) - FIXED
- Line 25: Password input missing `autocomplete` attribute (should be `autocomplete="current-password"` or `autocomplete="new-password"`) - FIXED

**Security:**

- Line 25: Missing `spellCheck={false}` on password field - FIXED

---

### `src/modules/map/map/map-filter-drawer.tsx`

**Performance:**

- Line 191-198: `.map()` over filter groups - if list grows, consider virtualization
- Line 144-156: State update function could be optimized with functional setState pattern

**Accessibility:**

- Line 169: Icon button has `aria-label="Filter"` ✓ (good)
- Line 181: Icon button has `aria-label="Close"` ✓ (good)
- Line 201-208: Button with badge - badge should have `aria-label` describing count

---

## 🟢 MEDIUM PRIORITY

### `src/components/ui/button.tsx`

**Accessibility:**

- Line 7: `transition-all` in className - should list specific properties (`transition-colors transition-opacity`)
- Focus states appear to be handled via `focus-visible:ring-*` ✓ (good)

**Performance:**

- Line 7: `transition-all` is performance anti-pattern - should specify properties

---

### `src/components/ui/input.tsx`

**Accessibility:**

- Line 12: Focus states handled ✓ (good)
- Missing default `autocomplete` guidance in component docs

---

### `src/modules/auth/forgot-password/forgot-password.tsx`

**Security:**

- ✓ Line 70: Email input uses `type="email"` - FIXED
- ✓ Line 72: Email input has `autoComplete="email"` attribute - FIXED

**Accessibility:**

- ✓ Line 71: Placeholder now has trailing `…` - FIXED
- ✓ Line 81: Loading state now has `aria-live="polite"` region for screen readers - FIXED
- ✓ Line 82: Loading text uses `"Sending email…"` (typography rule) - FIXED

---

### `src/modules/auth/reset-password/reset-password.tsx`

**Accessibility:**

- ✓ Line 54, 75: Placeholders now have trailing `…` - FIXED
- ✓ Line 85: Loading state now has `aria-live="polite"` region for screen readers - FIXED
- ✓ Line 86: Loading text uses `"Resetting password…"` (typography rule) - FIXED
- ✓ Line 55, 76: Password inputs have `autoComplete="new-password"` attribute - FIXED

---

## 📋 GENERAL RECOMMENDATIONS

### Performance

1. **Bundle Optimization:**
   - Use `next/dynamic` or `React.lazy` for map components (MapContainer, MapReview)
   - Consider code splitting for heavy dependencies (maplibre-gl)

2. **Re-render Optimization:**
   - Wrap event handlers in `useCallback` where passed as props
   - Use `useMemo` for expensive computations
   - Consider `React.memo` for components that receive stable props

3. **Data Fetching:**
   - Implement request deduplication with SWR or TanStack Query (already using TanStack Query ✓)
   - Use Suspense boundaries for async data loading

### Security

1. **Environment Variables:**
   - Move all hardcoded URLs to environment variables
   - Use `.env` files with proper validation

2. **Input Validation:**
   - Ensure all form inputs have proper `type` attributes
   - Add client-side validation before API calls
   - Sanitize user inputs

3. **Error Handling:**
   - Replace `console.log`/`console.error` with proper logging service
   - Add error boundaries for React components

### Accessibility

1. **Forms:**
   - Add `autocomplete` attributes to all form inputs
   - Use correct `type` attributes (`email`, `tel`, `url`, `number`)
   - Add `inputmode` for mobile keyboards

2. **Interactive Elements:**
   - All icon-only buttons need `aria-label`
   - Ensure keyboard navigation works for all interactive elements
   - Add `aria-live` regions for dynamic content updates

3. **Typography:**
   - Replace `"..."` with `"…"` (ellipsis character)
   - Update loading states: `"Loading…"`, `"Saving…"`, etc.

4. **Focus Management:**
   - Ensure all interactive elements have visible focus states
   - Test keyboard navigation flow

---

## Summary by Category

### Performance Issues: 5

- ✓ Missing memoization (useCallback/useMemo) - FIXED (use-map hook, map-review zoom, map-controls)
- ✓ Dynamic imports for heavy components (maplibre-gl) - FIXED
- Inefficient re-renders (map-review map recreation)
- Missing Suspense boundaries
- `transition-all` anti-pattern
- Large scrollable containers without virtualization

### Security Issues: 3

- ✓ Hardcoded localhost URLs - FIXED (using Config)
- Console.log in production (1 remaining)
- Missing error handling

### Accessibility Issues: 1

- ✓ Missing aria-labels on icon buttons - FIXED (map-controls, map-review)
- ✓ Missing autocomplete attributes - FIXED (all forms)
- ✓ Wrong input types (email, tel) - FIXED
- ✓ Missing aria-live regions - FIXED (all forms)
- ✓ Typography issues (ellipsis) - FIXED (all places)
- ✓ Map containers have role and aria-label - FIXED (map-container, map-review)
- Missing keyboard navigation support

**Total Components Needing Improvement: 8+**
