# Whishlist / Ideas

### Types & Validation

Currently YAML Routes generates basic TypeScript, but could be enhanced with:

-   **Route Parameter Validation**: Add Zod schema generation for route parameters
-   **Search Parameter Schemas**: Generate type-safe search parameter validation

### Performance Optimizations

Based on TanStack Router docs:

-   **Preloading Strategy**: Add configurable preload strategies (`intent`, `hover`, etc.)
-   **route strategy** : Select between SSG, SSR and Client side rendering

### Enhanced Route Features

Missing TanStack Router capabilities:

-   **Route Loaders**: Add YAML config for data loading functions
-   **Loader Data Types**: Auto-generate TypeScript interfaces for loader return types
-   **Before Load Guards**: Authentication/authorization checks
-   **Meta Tags**: SEO and page metadata configuration
