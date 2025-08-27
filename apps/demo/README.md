# YAML Routes Demo

This demo application showcases the capabilities of `@yaml-routes/tanstack` - a YAML-based routing configuration system for TanStack Router with internationalization support.

## 🌟 Features Demonstrated

-   **📝 YAML Configuration** - All routes defined in `routing.yml`
-   **🌐 Internationalization** - Support for English, French, and Spanish
-   **🎯 Type-Safe Routing** - Generated TypeScript types and helper functions
-   **🔗 Dynamic Navigation** - Automatic locale switching
-   **📱 Different Components per Locale** - Demonstrates locale-specific components
-   **⚙️ Route Parameters** - Shows parameterized routes with validation

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Generate routes from YAML configuration
pnpm run build:routes

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## 📁 Project Structure

```
apps/demo/
├── routing.yml              # Route configuration
├── src/
│   ├── App.tsx              # Main app component with navigation
│   ├── main.tsx             # Entry point
│   ├── routeCache.generated.tsx  # Generated routes (auto-generated)
│   └── pages/               # Page components
├── messages/                # i18n message files
│   ├── en.json
│   ├── fr.json
│   └── es.json
└── project.inlang/          # Paraglide i18n configuration
```

## 🔧 How It Works

1. **Define Routes** - Edit `routing.yml` to add/modify routes
2. **Generate Code** - Run `pnpm run build:routes` to generate TypeScript code
3. **Use Routes** - Import and use generated router and helpers in your components

## 🌍 Internationalization

The demo supports three languages with different URL patterns:

-   **English (default)**: `/about`, `/products`, etc.
-   **French**: `/fr/a-propos`, `/fr/produits`, etc.
-   **Spanish**: `/es/acerca-de`, `/es/productos`, etc.

### Language Switching

The navigation automatically detects the current locale and provides language switching functionality that maintains the current page context.

## 📄 Route Examples

### Simple Route

```yaml
home:
    path: /
    component: pages/Home
```

### Localized Route

```yaml
about:
    path:
        en: /about
        fr: /a-propos
        es: /acerca-de
    component: pages/About
```

### Route with Parameters

```yaml
user_profile:
    path:
        en: /user/{id}
        fr: /utilisateur/{id}
        es: /usuario/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true
```

### Different Components per Locale

```yaml
special_announcement:
    path:
        en: /special-announcement
        fr: /annonce-speciale
        es: /anuncio-especial
    component:
        en: pages/SpecialAnnouncementEN
        fr: pages/SpecialAnnouncementFR
        es: pages/SpecialAnnouncementES
```

## 🎯 Generated Helpers

The build process generates several useful functions:

### `routeTo(routeId, params?, locale?)`

Type-safe route generation:

```typescript
import { routeTo } from "./routeCache.generated";

// Simple navigation
routeTo("home"); // → '/'

// With parameters
routeTo("user_profile", { id: "123" }); // → '/user/123'

// Specific locale
routeTo("about", {}, "fr"); // → '/fr/a-propos'
```

### `getLocalizedPath(basePath, locale)`

Get localized versions of paths:

```typescript
getLocalizedPath("/about", "fr"); // → '/fr/a-propos'
```

## 🧪 Development

```bash
# Run tests
pnpm run test

# Type checking
pnpm run type-check

# Linting
pnpm run lint
```

## 📚 Learn More

-   [TanStack Router Documentation](https://tanstack.com/router)
-   [Paraglide JS (i18n)](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
-   [Main Package README](../../packages/tanstack/README.md)
