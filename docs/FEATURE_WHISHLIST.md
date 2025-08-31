# Whishlist / Ideas

### Types & Validation

Currently YAML Routes generates basic TypeScript, but could be enhanced with:

-   **Route Parameter Validation**: Add Zod schema generation for route parameters
-   **Search Parameter Schemas**: Generate type-safe search parameter validation
-   **Loader Data Types**: Auto-generate TypeScript interfaces for loader return types

### Performance Optimizations

Based on TanStack Router docs:

-   **Preloading Strategy**: Add configurable preload strategies (`intent`, `hover`, etc.)
-   **Code Splitting**: Generate automatic route-based code splitting
-   **Loader Dependencies**: Add `loaderDeps` support for better caching
-   **Structural Sharing**: Enable selective data updates

### Enhanced Route Features

Missing TanStack Router capabilities:

-   **Route Loaders**: Add YAML config for data loading functions
-   **Before Load Guards**: Authentication/authorization checks
-   **Error Boundaries**: Route-level error handling
-   **Meta Tags**: SEO and page metadata configuration

### 4. **Developer Experience**

Based on best practices:

-   **Route Tree Optimization**: Use object syntax for better TypeScript performance
-   **Link Type Safety**: Generate type-safe navigation helpers
-   **Development Tools**: Add route validation and debugging

Let me implement some of these optimizations. Should I start with the **type safety enhancements** (Zod validation schemas) or the **performance optimizations** (preloading, code splitting)?

What specific optimization would you like me to focus on first? The most impactful ones would be:

1. **Type Safety**: Add Zod schema generation for route parameters and search params
2. **Performance**: Add intelligent preloading and caching strategies
3. **Features**: Add loader and guard support to YAML configuration
4. **DX**: Improve TypeScript performance with optimized route tree generation

Which direction interests you most?
