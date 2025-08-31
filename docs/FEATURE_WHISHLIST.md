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

### DX

-   **Route Tree Optimization**: ⭐️ Use object syntax for better TypeScript performance
-   **Link Type Safety**: ⭐️ Generate type-safe navigation helpers

### EXample Route Tree Optimization

```js
// Current (slower TS performance)
routeTree.addChildren([route1, route2]);

// Optimized (faster TS performance)
const routeTree = {
    children: { route1, route2 },
};
```

### Typesafe navigation helpers

```js
// Type-safe helper with autocomplete for parameters
<Link to={routes.routeTo("user_settings", { id: "123", tab: "settings" })} />
```
