# YAML Routes Format Reference

This document describes the YAML routing configuration format used by `@yaml-routes/tanstack`.

## 📋 Basic Structure

```yaml
# Global configuration (optional)
settings:
    i18n:
        enabled: true|false
        defaultLocale: en
        supportedLocales: [en, fr, es]
    render: ssr|ssg|spa

# Route definitions
route_name:
    path: string | LocalizedPaths
    component: string | LocalizedComponents
    parameters: ParameterDefinitions # optional
    settings: RouteSettings # optional
```

## 🌍 Global Settings

### i18n Configuration

```yaml
settings:
    i18n:
        enabled: true # Enable/disable i18n features
        defaultLocale: en # Default language (no URL prefix)
        supportedLocales: [en, fr, es] # All supported languages
```

When `enabled: false`, all i18n features are disabled and routes work in single-language mode.

### Render Strategy

```yaml
settings:
    render: ssr # Default rendering strategy for all routes
```

Options: `ssr` (Server-Side Rendering), `ssg` (Static Site Generation), `spa` (Single Page Application)

## 🛣 Route Definitions

### Simple Routes

```yaml
home:
    path: /
    component: pages/Home

about:
    path: /about
    component: pages/About
```

### Localized Routes

```yaml
about:
    path:
        en: /about
        fr: /a-propos
        es: /acerca-de
    component: pages/About
```

### Routes with Parameters

```yaml
user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true
            default: "guest" # optional

blog_post:
    path: /blog/{category}/{slug}
    component: pages/BlogPost
    parameters:
        category:
            type: string
            required: true
        slug:
            type: string
            required: true
```

### Different Components per Locale

```yaml
special_page:
    path:
        en: /special
        fr: /special-fr
        es: /especial
    component:
        en: pages/SpecialEN
        fr: pages/SpecialFR
        es: pages/SpecialES
```

### Route-Specific Settings

```yaml
blog_index:
    path: /blog
    component: pages/Blog
    settings:
        render: ssg # Override global render strategy
        cache: true # Custom settings are allowed
```

## 📊 Parameter Types

```yaml
parameters:
    id:
        type: string # string | number | boolean
        required: true # true | false
        default: "123" # Optional default value
```

## 🔧 Generated Output

The configuration generates:

### 1. Router Configuration

```typescript
export const router = createRouter({
    routeTree,
    defaultPreload: "intent",
});
```

### 2. Route Helper Functions

```typescript
// Type-safe route generation
routeTo("user_profile", { id: "123" }); // → '/user/123'
routeTo("about", {}, "fr"); // → '/fr/a-propos'
```

### 3. Path Mappings (i18n enabled)

```typescript
export const pathMappings = {
    "/about": {
        en: "/about",
        fr: "/fr/a-propos",
        es: "/es/acerca-de",
    },
};
```

### 4. Global Settings Export

```typescript
export const globalSettings = {
    i18n: {
        enabled: true,
        defaultLocale: "en",
        supportedLocales: ["en", "fr", "es"],
    },
    render: "ssr",
};
```

## 🌐 URL Structure (with i18n)

| Route        | English     | French                | Spanish           |
| ------------ | ----------- | --------------------- | ----------------- |
| Home         | `/`         | `/fr/`                | `/es/`            |
| About        | `/about`    | `/fr/a-propos`        | `/es/acerca-de`   |
| User Profile | `/user/123` | `/fr/utilisateur/123` | `/es/usuario/123` |

## ✅ Best Practices

1. **Route Naming**: Use `snake_case` for route names
2. **Path Structure**: Keep paths logical and SEO-friendly
3. **Components**: Organize components in a clear folder structure
4. **Parameters**: Use descriptive parameter names
5. **Localization**: Provide meaningful localized paths
6. **Settings**: Only override global settings when necessary

## ⚠️ Common Pitfalls

1. **Duplicate Route Names**: Each route name must be unique (case-insensitive)
2. **Missing Required Properties**: All routes need `path` and `component`
3. **Invalid Parameter Types**: Only `string`, `number`, and `boolean` are supported
4. **Locale Consistency**: If using localized paths, provide paths for all supported locales

## 📝 Migration Guide

### From File-Based Routing

```typescript
// Old: File-based routes
// pages/about.tsx → /about
// pages/user/[id].tsx → /user/:id

// New: YAML configuration
about:
  path: /about
  component: pages/About

user_profile:
  path: /user/{id}
  component: pages/UserProfile
  parameters:
    id:
      type: string
      required: true
```

### From Manual Route Configuration

```typescript
// Old: Manual TanStack Router setup
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

// New: YAML configuration
about:
  path: /about
  component: pages/About
```

## 🔗 Related Documentation

-   [Main Package README](../../packages/tanstack/README.md)
-   [Demo Application](../README.md)
-   [TanStack Router Documentation](https://tanstack.com/router)
