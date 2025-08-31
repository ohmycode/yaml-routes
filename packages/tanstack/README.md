# @yaml-routes/tanstack

YAML-based routing configuration for TanStack Router with built-in internationalization support.

## 🚀 Live Demo

**[Try it live →](https://ohmycode.github.io/yaml-routes)**

See all features in action with interactive examples, copy-paste installation commands, and live code samples.

## 🚀 Features

-   **📝 YAML Configuration** - Define routes in clean, readable YAML format
-   **🌐 Built-in i18n** - Full internationalization support with locale-specific paths and components
-   **🔒 Type Safety** - Generated TypeScript types for routes and helpers
-   **⚡ Fast Build** - Efficient route generation and caching
-   **🎯 TanStack Router** - Full integration with TanStack Router patterns

## 📦 Installation

```bash
npm install @yaml-routes/tanstack
# or
pnpm add @yaml-routes/tanstack
# or
yarn add @yaml-routes/tanstack
```

## 🏗 Quick Start

### 1. Create your routing configuration

Create a `routes.yml` file in your project root:

```yaml
# Global settings (optional)
settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, fr, es]
    render: ssr

# Route definitions
home:
    path: /
    component: pages/Home

about:
    path:
        en: /about
        fr: /a-propos
        es: /acerca-de
    component: pages/About

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

### 2. Generate routes

#### Using CLI (recommended) - Dead Simple! ⚡

```bash
# Option 1: Add to your package.json scripts (recommended)
{
  "scripts": {
    "build:routes": "yaml-routes"
  }
}

# Then run it
npm run build:routes
# or
pnpm run build:routes

# Option 2: Run directly with npx (no setup needed!)
npx yaml-routes

# Option 3: Watch mode for development 🔥 (auto-regenerate on changes)
npx yaml-routes --watch
# or add to package.json:
{
  "scripts": {
    "routes:watch": "yaml-routes --watch"
  }
}

# Option 4: Custom configuration
npx yaml-routes --config my-routes.yml --output src/routes.generated.tsx
npx yaml-routes --watch --config my-routes.yml    # Watch custom config

# Get help
npx yaml-routes --help
```

**That's it!** The CLI automatically:

-   📖 Reads your `routes.yml` file
-   🔨 Generates type-safe TypeScript routes
-   🌐 Handles i18n automatically
-   ✅ Creates `src/routeCache.generated.tsx`

#### 🔥 Development with Watch Mode

For the best development experience, use watch mode to automatically regenerate routes when your YAML file changes:

```bash
# Start watch mode (runs continuously)
npx yaml-routes --watch

# Or use a package.json script
npm run routes:watch
```

When you modify your `routes.yml`:

-   👀 **Instant detection** - File changes are detected immediately
-   ⚡ **Auto-regeneration** - Routes are rebuilt automatically
-   🎯 **Zero intervention** - No manual commands needed
-   🔄 **Continuous watching** - Keeps running until you stop it

Perfect for rapid development! 🚀

#### Using the API (advanced)

```typescript
import { generateTanStackRoutes } from "@yaml-routes/tanstack";

await generateTanStackRoutes({
    configPath: "routes.yml",
    outputPath: "src/routeCache.generated.tsx",
});
```

### 3. Use generated routes in your app

```tsx
import { RouterProvider } from "@tanstack/react-router";
import { router, routeTo } from "./routeCache.generated";

function App() {
    return <RouterProvider router={router} />;
}

// Navigation helpers
function Navigation() {
    return (
        <nav>
            <a href={routeTo("home")}>Home</a>
            <a href={routeTo("about")}>About</a>
            <a href={routeTo("user_profile", { id: "123" })}>User Profile</a>
        </nav>
    );
}
```

## 📖 Configuration

### Global Settings

```yaml
settings:
    i18n:
        enabled: true|false # Enable/disable i18n (default: true)
        defaultLocale: en # Default locale (default: "en")
        supportedLocales: [en, fr] # Supported locales
    render: ssr|ssg|spa # Default render strategy
```

### Route Configuration

```yaml
route_name:
    path: string | LocalizedPaths # Route path(s)
    component: string | LocalizedComponents # Component path(s)
    parameters: ParameterDefinitions # Route parameters (optional)
    settings: RouteSettings # Route-specific settings (optional)
```

#### Localized Paths and Components

```yaml
# Simple route (same for all locales)
blog:
    path: /blog
    component: pages/Blog

# Localized paths
about:
    path:
        en: /about
        fr: /a-propos
        es: /acerca-de
    component: pages/About

# Different components per locale
special_page:
    path:
        en: /special
        fr: /special-fr
    component:
        en: pages/SpecialEN
        fr: pages/SpecialFR
```

#### Route Parameters

```yaml
user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string # string | number | boolean
            required: true # true | false
            default: "guest" # optional default value
```

## 🛠 API Reference

### CLI Options

```bash
yaml-routes [options]

Options:
  -c, --config <path>    Path to routing YAML file (default: routes.yml)
  -o, --output <path>    Output file path (default: src/routeCache.generated.tsx)
  -h, --help             Show help message
  -v, --version          Show version number
```

### Generated Helpers

#### `routeTo(routeId, params?, locale?)`

Generate type-safe route URLs:

```typescript
// Simple route
routeTo("home"); // → '/'

// Route with parameters
routeTo("user_profile", { id: "123" }); // → '/user/123'

// Specific locale (with i18n enabled)
routeTo("about", {}, "fr"); // → '/fr/a-propos'
```

#### `getLocalizedPath(basePath, locale)`

Get localized version of a path:

```typescript
getLocalizedPath("/about", "fr"); // → '/fr/a-propos'
```

#### `globalSettings`

Access global configuration:

```typescript
import { globalSettings } from "./routeCache.generated";

console.log(globalSettings.i18n?.defaultLocale); // → 'en'
```

## 🌍 Internationalization

When i18n is enabled, the package automatically:

-   Generates locale-prefixed routes (e.g., `/fr/a-propos`)
-   Creates path mappings for navigation
-   Provides locale-aware helper functions
-   Supports per-locale components

### URL Structure

-   **Default locale**: No prefix (e.g., `/about`)
-   **Other locales**: Prefixed (e.g., `/fr/a-propos`, `/es/acerca-de`)

## 🧪 Testing

```bash
# Run package tests
pnpm test

# Run with watch mode
pnpm test:watch
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](../../LICENSE) file for details.

## 🔗 Related

-   [TanStack Router](https://tanstack.com/router) - The router this package integrates with
-   [Demo App](../../apps/demo) - Example implementation
