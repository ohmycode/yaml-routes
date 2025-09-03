# YAML Routes

Type-safe routing configuration for TanStack Router using clean YAML syntax with built-in internationalization.

**[View interactive Live Demo →](https://ohmycode.github.io/yaml-routes/demo/our-pizzas)**

## Why ?

Modern React routing has moved towards file-based systems (TanStack Router, React Router v7/Remix, Next.js, etc.), but this approach creates significant challenges for internationalized applications and maintainable URL management.

**[Why choose YAML Routes over file-based routing? →](#why-yaml-routes)**

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

-   **Internationalization** - Built-in i18n with locale-specific urls and components
-   **React hooks** - Everything you need to integrate the routing inside your react components
-   **Watch Mode** - Auto-regeneration during development for instant route updates
-   **Type-Safe Routes** - Full TypeScript support with generated types and IDE autocomplete
-   **TanStack Router** - Deep integration with TanStack Router v1.130.0+
-   **Zero Config** - Works out of the box, no package installation required

## Quick Start

Create a routes.yml file in your project root (you can copy the example above to get started), then simply run

```bash
npx yaml-routes --watch
```

in your terminal, no installation needed.

```typescript
# Use in your app
import { RouterProvider } from '@tanstack/react-router'
import { router, routeTo } from './src/routes.gen'

function App() {
  return <RouterProvider router={router} />
}

// Type-safe navigation
<a href={routeTo('user_profile', { id: '123' })}>Profile</a>

```

You can also install the npm package @yaml-routes/tanstack for deeper integration, visit the [Documentation](https://ohmycode.github.io/yaml-routes/)

## Generated Helper Functions

YAML Routes generates several helper functions to make routing type-safe and maintainable:

### `router`

The configured TanStack Router instance ready to use.

```typescript
import { router } from "./src/routes.gen";

function App() {
    return <RouterProvider router={router} />;
}
```

### `settings`

Access your global configuration at runtime.

```typescript
import { settings } from "./src/routes.gen";

console.log(settings.i18n?.defaultLocale); // → 'en'
console.log(settings.i18n?.supportedLocales); // → ['en', 'fr', 'es']
```

### `routeTo(routeId, params?, locale?)`

Generate type-safe URLs for any route with full TypeScript autocomplete.

```typescript
const routeTo = useRouteTo();

// Simple route
routeTo("home"); // → '/'

// Route with parameters (fully typed)
routeTo("user_profile", { id: "123" }); // → '/user/123'

// Specific locale (when i18n enabled)
routeTo("about", {}, "fr"); // → '/fr/a-propos'

// Current locale preserved automatically
routeTo("about"); // → '/fr/a-propos' (if user is on French site)
```

### Locale Helpers

`useCurrentLocale()`
get the current locale from the URL.

`useLocalePath(routeId, params?)`
get localized paths for the current locale.

```typescript
function LanguageSwitcher() {
    const supportedLocales = settings.i18n?.supportedLocales || ["en"];

    const currentLocale = useCurrentLocale();

    return (
        <div className="flex gap-2">
            {supportedLocales.map((locale) => {
                const isActive = locale === currentLocale;
                const localizedPath = useLocalePath(locale);

                return (
                    <Link
                        key={locale}
                        to={localizedPath}
                        className={`px-2 py-1 text-sm rounded transition-colors ${isActive ? "bg-white/20 text-white" : "text-blue-200 hover:text-white"}`}
                    >
                        {locale.toUpperCase()}
                    </Link>
                );
            })}
        </div>
    );
}
```

### `useRouteName()`

React hook to get the current route name (useful for navigation highlighting).

```typescript
function Navigation() {
    const routeName = useRouteName(); // → 'about', 'user_profile', etc.

    return (
        <nav>
            <Link to={routeTo("about")} className={routeName === "about" ? "active" : ""}>
                About
            </Link>
        </nav>
    );
}
```

### `useRouteParams()`

React hook to get typed route parameters for the current route.

```typescript
function UserProfile() {
    const params = useRouteParams(); // Fully typed based on your YAML config

    return (
        <div>User ID: {params.id}</div> // TypeScript knows 'id' exists
    );
}
```

All functions are fully typed based on your YAML configuration, providing IDE autocomplete and compile-time error checking.

## Why YAML Routes

### The File-Based Routing Problem

File-based routing works well for simple apps, but breaks down with i18n:

```bash
pages/
├── about.tsx           → /about
├── contact.tsx         → /contact
└── [locale]/
    ├── about.tsx       → /fr/about (but we want /fr/a-propos)
    └── contact.tsx     → /es/contact (but we want /es/contacto)
```

You're forced to either:

-   Use English URLs everywhere (poor UX for non-English users)
-   Create complex folder structures that don't reflect your actual routes
-   Write extensive redirect logic

### The URL Coupling Problem

With file-based routing, URLs are coupled to your codebase. When you change a route, you must find and update every reference:

```typescript
// Scattered throughout your app
<Link to="/user/profile">Profile</Link>
<Link to="/user/settings">Settings</Link>
navigate("/user/profile")
redirect("/user/settings")
```

When `/user/profile` becomes `/account/profile`, you need to update dozens of files.

### The TanStack Router Solution

TanStack Router offers code-based routing, which is more flexible than file-based systems. However, setting up complex routing scenarios manually is verbose:

**Manual TanStack Setup** (repetitive and error-prone):

```typescript
// For each locale, manually create routes
const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: AboutPage,
});

const aboutRouteFr = createRoute({
    getParentRoute: () => rootRoute,
    path: "/fr/a-propos",
    component: AboutPage,
});

const aboutRouteEs = createRoute({
    getParentRoute: () => rootRoute,
    path: "/es/acerca-de",
    component: AboutPage,
});

// Repeat for every route...
```

**YAML Routes Approach** (declarative and maintainable):

```yaml
# Single source of truth
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
```

```typescript
// URLs are decoupled from code
<Link to={routeTo('about')}>About</Link>
<Link to={routeTo('user_profile', { id: '123' })}>Profile</Link>
```

### Build-Time Only, Zero Runtime Cost

YAML Routes is a **build-time tool** that generates standard TanStack Router code. Once built:

-   **No runtime dependencies** - your app uses pure TanStack Router
-   **Zero performance impact** - just generates optimized routing code
-   **Full TypeScript support** - with generated types and IDE autocomplete
-   **Standard TanStack APIs** - works with all TanStack Router features

The generated output is clean, production-ready TanStack Router code with helper functions for type-safe navigation.

## Development

This is a monorepo containing:

### A package

-   **[@yaml-routes/tanstack](./packages/tanstack)** - Core package for TanStack Router integration

### An Application (tanstack-start)

-   **[Demo App](./apps/demo)** - Github Page, Documentation & interactive demo

```bash
# Install dependencies
pnpm install

# Start development (demo app + package watching)
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.
