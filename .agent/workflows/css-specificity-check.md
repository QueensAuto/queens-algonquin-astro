---
description: CSS specificity check when Tailwind utilities don't work
---

# CSS Specificity Check Rule

When styling CSS styles and don't work in this project:

1. **Always check `src/styles/global.css` for `!important` declarations** that may override Tailwind utility classes, especially:
   - `.text-white { color: white !important; }` (line ~773)
   - `.text-queens-primary`, `.text-queens-secondary` with `!important`
   - `.bg-white`, `.bg-gray-*` with `!important`

2. **If a hover state doesn't work**, the fix is typically adding a specific CSS rule in `global.css` with higher specificity:
   ```css
   #parent-id .element-class:hover {
       property: value !important;
   }
   ```

3. **Never rely on Tailwind hover utilities alone** (`hover:text-gray-300`, `hover:opacity-70`) when the element uses a color class that has `!important` in `global.css`.

4. **Test hover effects manually** before marking styling tasks complete.
