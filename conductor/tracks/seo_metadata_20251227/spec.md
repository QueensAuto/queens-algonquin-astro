# Track Spec: Implement Robust SEO Metadata and Schema System

## 1. Goal
To establish a comprehensive technical SEO foundation for "Queens Auto Services Algonquin" by implementing dynamic metadata generation and structured data (Schema.org) across all service and location-specific pages. This ensures high visibility in local search results and rich snippets in SERPs.

## 2. Core Features
- **Dynamic Metadata Injection:** A reusable system to inject unique `<title>`, `<meta name="description">`, and Open Graph tags for every page based on its content context (Service vs. Location).
- **Schema.org Implementation:** structured data for `AutoRepair`, `TireShop`, and `LocalBusiness` to provide search engines with detailed business information (hours, location, services).
- **Canonical URL Management:** Automatic generation of self-referencing canonical tags to prevent duplicate content issues.
- **Sitemap Configuration:** Ensure `@astrojs/sitemap` is correctly configured to include all dynamic routes.

## 3. Technical Approach
- **Component Strategy:** Create a `SeoHead.astro` component to handle all head tags, accepting props for title, description, image, and schema type.
- **Data Source:** utilize the existing `src/data/services.json` (or create a new configuration file) to map specific keywords and schema properties to routes.
- **JSON-LD Injection:** Use a helper function to serialize structured data objects into the `<head>` of the document.
- **Validation:** Use Google's Rich Results Test and potential linter plugins to verify schema correctness.

## 4. Acceptance Criteria
- [ ] Every page has a unique, descriptive title and meta description.
- [ ] Service pages contain `Service` or `AutoRepair` schema.
- [ ] Location pages contain `LocalBusiness` schema with correct address and geo-coordinates.
- [ ] Open Graph tags are present and correctly point to a relevant social image.
- [ ] No "duplicate content" warnings in local SEO audit tools (simulated).
