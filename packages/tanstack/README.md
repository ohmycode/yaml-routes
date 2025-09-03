# @yaml-routes/tanstack

Type-safe routing configuration for TanStack Router using clean YAML syntax with built-in internationalization.

## 🚀 Live Demo

**[Try it live →](https://ohmycode.github.io/yaml-routes)**

See all features in action with interactive examples, copy-paste installation commands, and live code samples.

## Why ?

Modern React routing has moved towards file-based systems (TanStack Router, React Router v7/Remix, Next.js, etc.), but this approach creates significant challenges for internationalized applications and maintainable URL management.

## What is YAML Routes?

A tiny build-time tool that generates type-safe TanStack Router code from a simple YAML configuration. Perfect for internationalized (i18n) applications where file-based routing falls short.

```yaml
# routes.yml - Single source of truth for all routes
settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, fr, es]
        forceLocaleUrl: true

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
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true
```

```bash
npx yaml-routes --watch  # Generate routes + watch for changes
```

```typescript
// Type-safe navigation
<Link to={routeTo("about")}>About</Link>
```

## Features

-   **YAML Configuration**: Define routes in clean, readable YAML format
-   **Built-in i18n**: Multi-language routing with locale-specific paths and components
-   **forceLocaleUrl**: Preserve user's language preference across navigation
-   **Type Safety**: Full TypeScript support with generated types
-   **TanStack Router**: Built specifically for TanStack Router v1.130.0
-   **Zero Config**: Works out of the box with sensible defaults
-   **CLI Tool**: Simple command-line interface for route generation

## 🏗 Quick Start

### 1. Create your routing configuration

Create a `routes.yml` file in your project root:

```yaml
# In your routes.yml
settings:
    router:
        basePath: /your-app
    i18n:
        forceLocaleUrl: true # 🎯 Enable automatic locale preservation
        defaultLocale: en
        locales: [en, es, fr]
```

### 2. Generate routes

#### Using CLI

Option 1: Run directly with npx, no package installation needed (always uses latest version)

```bash
# generate routes on demand
npx yaml-routes

# watch mode for development (auto-regenerate on changes)
npx yaml-routes --watch
```

Option 2: install package (if you want to keep a specific version)

```bash
npm install @yaml-routes/tanstack
# or
pnpm add @yaml-routes/tanstack
# or
yarn add @yaml-routes/tanstack
```

recommended: Add npx script to your package.json scripts

```javascript
// if you use npx
{
  // ...
  "scripts": {
    // ...
    "build:routes": "npx yaml-routes",
    "routes:watch": "npx yaml-routes --watch"
  }
}

// or if you prefer the package installation
{
  // ...
  "scripts": {
    // ...
    "build:routes": "yaml-routes",
    "routes:watch": "yaml-routes --watch"
  }
}
```

Then run it

```bash
npm run build:routes
# or
pnpm run build:routes
# or
yarn run build:routes
```

add it to your default dev/build scripts (recommended)

```javascript
  "scripts": {
    // ...
    "dev": "pnpm run routes:watch & vite dev",
    "build": "pnpm run build:routes && vite build"
  }
```

## Advanced usage

### Using the CLI with custom arguments

```bash
# custom configuration
npx yaml-routes --config my-routes.yml --output src/routes.generated.tsx
npx yaml-routes --watch --config my-routes.yml

# Get help
npx yaml-routes --help
```

### Using the API in javascript (advanced)

```typescript
import { generateTanStackRoutes } from "@yaml-routes/tanstack";

await generateTanStackRoutes({
    configPath: "routes.yml",
    outputPath: "src/routes.gen.tsx",
});
```

**That's it!** The CLI automatically:

-   📖 Reads your `routes.yml` file
-   🔨 Generates type-safe TypeScript routes
-   🌐 Handles i18n
-   ✅ Creates `src/routes.gen.tsx`

## Use generated routes in your app

```tsx
import { RouterProvider } from "@tanstack/react-router";
import { router, useRouteTo } from "./routes.gen";

function App() {
    return <RouterProvider router={router} />;
}

// Navigation helpers
function Navigation() {
    const routeTo = useRouteTo();
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

## Route Configuration

```yaml
route_name:
    path: string | LocalizedPaths # Route path(s)
    component: string | LocalizedComponents # Component path(s)
    parameters: ParameterDefinitions # Route parameters (optional)
    settings: RouteSettings # Route-specific settings (optional)
```

### Localized Paths and Components

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

### Route Parameters

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
  -o, --output <path>    Output file path (default: src/routes.gen.tsx)
  -h, --help             Show help message
  -v, --version          Show version number
```

### Generated Helpers

YAML Routes exposes a set of convenient react hooks to get information about the current route, and link to other routes with specific parameters.

## 🧪 Testing

```bash
# Run package tests
pnpm test

# Run with watch mode
pnpm test:watch
```

## 🤝 Contributing

PRs welcome! see github project for details.

## 📄 License

MIT License
