---
description: How to set up CSS Cascade Layers to avoid global tag conflicts with utility classes
---

This workflow ensures that global HTML tag styles (like `h1`, `h2`, etc.) do not override utility classes. This is critical in Tailwind CSS v4 and standard CSS to maintain a "Bricks Builder" style separation between Tags and Classes.

### Core Principle: The Cascade over Specificity

In modern CSS, **Cascade Layers** (`@layer`) have higher authority than **Specificity**. Unlayered styles (styles sitting in the root of the CSS file) always win over layered styles.

### 1. Wrap Global Base Styles in `@layer base`
All global HTML tag overrides must be wrapped in the `@layer base` block. This ensures they have the lowest priority in the cascade.

```css
/* CORRECT: Base layer allows utilities to override */
@layer base {
  h1, h2, h3 {
    font-family: var(--font-sans);
    line-height: 1.2;
    color: var(--text-primary);
  }
}

/* INCORRECT: Unlayered styles will block utilities */
h1 {
  font-family: var(--font-sans);
}
```

### 2. Centralize Identity with CSS Variables
Use CSS variables in the `@theme` block to define font-identities. This allows for site-wide changes from a single "Switch."

```css
@theme {
  --font-display: "Big Shoulders Display", sans-serif;
  --font-body: "Instrument Sans", sans-serif;
}
```

### 3. Create Semantic Utility Classes
Define utility classes that point to your variables. These will live in the "Utilities" layer (or be applied via Tailwind) and will automatically win against the `base` layer.

```css
.display-hero {
  font-family: var(--font-display);
  font-weight: 800;
  text-transform: uppercase;
}
```

### 4. Implementation Checklist for Agents
- [ ] Check if `global.css` has unlayered tag selectors (`h1`, `p`, `body`).
- [ ] Wrap all base element selectors in `@layer base { ... }`.
- [ ] Ensure brand-specific headings use a variable-driven class (e.g., `.font-display` or `.display-hero`).
- [ ] Verify using Browser Tools that the utility class is successfully overriding the base tag style.
