---
description: Reference for Queens Auto brand color system and dark mode inversion rules
---

# Brand Color System & Dark Mode Rules

This workflow outlines the standard for applying brand colors and handling theme inversions to ensure full visibility in both light and dark modes.

## 1. Brand Color Mapping
- **`queens-primary`**: **Vibrant Blue** (`#0a79c8`). Use for primary actions, headlines, and main branding.
- **`queens-secondary`**: **Dark Navy** (`#0b1121`). Use for secondary accents and depth.

## 2. Dark Mode Inversion Rules
Because `queens-secondary` is a Dark Navy, it becomes invisible in dark mode (Navy on Black). The following rules must be followed:

- **Automatic Utility Overrides**: `src/styles/global.css` contains specialized rules that automatically switch `text-queens-secondary` to **White** (`#ffffff`) when inside a `.dark` container.
- **Inverse Tokens**: Use these explicit tokens if you need a specific inverted brand look:
    - **`queens-primary-inverse`**: White (`#ffffff`).
    - **`queens-secondary-inverse`**: Ultra Light Blue (`#cee4f4`).
- **Semantic Text Variables**:
    - `--text-inverted` is mapped to **White** in dark mode. Avoid mapping it back to brand colors in dark theme blocks unless contrast is guaranteed.

## 3. Implementation Workflow

1.  **Component Refactoring**: When swapping colors (e.g., swapping primary and secondary), ensure you also move the `dark:` counterparts.
2.  **Specificity Check**: If a `dark:text-white` or `dark:bg-queens-primary` class is not working, it is likely being blocked by an `!important` rule for a base brand color in `global.css`.
3.  **Manual Verification**:
    - Toggle dark mode using the site's theme toggle.
    - Specifically check headers, hero badges, and "Exclusive Specials" sections.
    - If text is invisible (Dark Navy on Black), verify that the element has the `.dark .text-queens-secondary` override applied in `global.css`.

## 4. CTA Button Standard
The `.btn-cta-premium` class in `CtaButton.astro` is the source of truth for high-specificity button styling:
- **Light Mode**: White Background / Blue Text / Blue Icon Badge.
- **Dark Mode**: Blue Background / White Text / Navy Icon Badge.
- *Note: These are enforced via `!important` overrides in `global.css` to win against global layout rules.*
