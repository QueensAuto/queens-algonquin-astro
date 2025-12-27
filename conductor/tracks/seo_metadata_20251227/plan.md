# Track Plan: SEO Metadata & Schema System

## Phase 1: Foundation & Component Structure
- [ ] Task: Create `SeoHead.astro` component
    - **Description:** specific `SeoHead.astro` component that accepts `title`, `description`, `image`, `canonical`, and `schema` as props.
    - **Sub-tasks:**
        - [ ] Write Tests: Create a unit test to verify the component renders the correct meta tags based on props.
        - [ ] Implement Feature: Build the `SeoHead.astro` component in `src/components/SEO/`.
- [ ] Task: Create Schema Generator Utility
    - **Description:** A TypeScript utility function to generate compliant JSON-LD objects for `AutoRepair` and `LocalBusiness`.
    - **Sub-tasks:**
        - [ ] Write Tests: Verify the utility returns valid JSON-LD structure for given inputs.
        - [ ] Implement Feature: Create `src/utils/seo/schemaGenerator.ts`.
- [ ] Task: Conductor - User Manual Verification 'Foundation & Component Structure' (Protocol in workflow.md)

## Phase 2: Integration
- [ ] Task: Integrate SEO Component into Layouts
    - **Description:** Update `BaseLayout.astro` (and any other layouts) to use the new `SeoHead` component.
    - **Sub-tasks:**
        - [ ] Implement Feature: Replace static head tags in `src/layouts/BaseLayout.astro` with the dynamic component.
- [ ] Task: Map Data to Routes
    - **Description:** Ensure service and location pages pass the correct specific data to the layout.
    - **Sub-tasks:**
        - [ ] Implement Feature: Update `src/pages/services/[category]/[service].astro` to pass dynamic titles and descriptions.
        - [ ] Implement Feature: Update any location-based landing pages to pass location-specific schema data.
- [ ] Task: Conductor - User Manual Verification 'Integration' (Protocol in workflow.md)

## Phase 3: Validation & Polish
- [ ] Task: Configure Sitemap
    - **Description:** Verify and configure `@astrojs/sitemap` to ensure all new dynamic routes are indexed.
    - **Sub-tasks:**
        - [ ] Implement Feature: Check `astro.config.mjs` and ensure sitemap integration is active and correctly configured.
- [ ] Task: Audit & Verify
    - **Description:** Manually verify the rendered HTML of key pages to ensure all tags and JSON-LD scripts are present and correct.
    - **Sub-tasks:**
        - [ ] Manual Task: Run a local build and inspect the source of a service page and the home page.
- [ ] Task: Conductor - User Manual Verification 'Validation & Polish' (Protocol in workflow.md)
