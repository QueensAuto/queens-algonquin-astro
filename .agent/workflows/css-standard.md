---
description: CSS implementation standards - Utility classes first, no inline styles
---
# CSS Implementation Standard

To maintain codebase cleanlines and scalability, follow these rules strictly:

1. **Utility-First Approach**: Use Tailwind CSS or project-specific utility classes for all styling. This ensures consistency and makes it easier to update the design system globally.
2. **No Inline Styles**: Never use the `style="..."` attribute within HTML or Astro components.
   - **Exception**: You may ONLY use inline styles for dynamic properties that cannot be handled by classes (e.g., GSAP-driven values, CSS variables updated via JS, or unique background images).
   - **Permission Required**: Before using an inline style, you must explain why a utility class or a scoped `<style>` tag won't work and ask for the USER's permission.
3. **Scoped Styles**: If a complex layout or animation requires unique CSS that would result in a massive string of utility classes, use a scoped `<style>` tag within the `.astro` component instead of inline styles.
4. **Check Global Rules**: Always refer to `src/styles/global.css` to ensure you aren't overriding established brand styles or fighting against `!important` declarations.
