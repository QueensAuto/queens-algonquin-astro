---
description: Use this guide to build better fornt end designs
---

CSS Specificity Check Rule
When styling CSS stule and don't work in this project:

Always check 
src/styles/global.css
 for !important declarations that may override Tailwind utility classes, especially:
.text-white { color: white !important; } (line ~773)
.text-queens-primary, .text-queens-secondary with !important
.bg-white, .bg-gray-* with !important
If a hover state doesn't work, the fix is typically adding a specific CSS rule in 
global.css
 with higher specificity:
css
#parent-id .element-class:hover {
    property: value !important;
}
Never rely on Tailwind hover utilities alone (hover:text-gray-300, hover:opacity-70) when the element uses a color class that has !important in 
global.css
.
Test hover effects manually before marking styling tasks complete.


-- Frontend Aesthetics & Astro Guidelines
·	Typography: Avoid Inter/Arial. Use distinctive Google Fonts or local font files. Pair a characterful display font with a highly legible body font.
·	Color & Theme: Use CSS Variables in your <style> tags or a global CSS file for a cohesive palette. Stick to a dominant theme with high-contrast accents.
·	Motion & Transitions:
o	Prioritize Astro View Transitions for seamless page navigation.
o	Use CSS-only animations for entry effects and micro-interactions.
o	If complex motion is needed, use a lightweight library like Motion and GSAP inside a client-side component or script tag.
·	Spatial Composition: Experiment with display: grid for non-linear layouts. Use asymmetric spacing, grid-breaking elements, and generous negative space to break the "template" feel.
·	Backgrounds & Texture: No boring flat colors. Use SVG patterns, CSS grain overlays, or subtle gradient meshes to add depth.
Technical Implementation
·	Component Structure: Build using .astro components. Use props for flexibility but keep logic on the server side as much as possible.
·	Styling: Use scoped <style> tags within Astro components to prevent style leak and keep code clean.
·	Performance: Only use client:load or client:visible directives when absolutely necessary for interactivity. Otherwise, keep it 0kb JS.
·	Accessibility: Ensure semantic HTML and proper ARIA labels are baked into the design from the start.
NEVER use generic AI aesthetics (purple-to-blue gradients on white, Space Grotesk everywhere, or generic hero sections). Every page should feel like it was custom-coded for a specific brand or vibe.
