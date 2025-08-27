# YAML Routes Demo & Developer Guide

A comprehensive developer guide and interactive demonstration of the `@yaml-routes/tanstack` package.

## 🎯 Purpose

This demo serves as both:
- **Interactive Documentation**: Learn how to use YAML Routes with live examples
- **Developer Guide**: Best practices and implementation patterns
- **Feature Showcase**: See all features in action with real code

## 🚀 Features Demonstrated

### ✅ Core Functionality
- **YAML Configuration**: Clean, declarative route definitions
- **Type-Safe Navigation**: Generated TypeScript types and helper functions
- **Internationalization**: Built-in i18n support with localized paths
- **Parameter Handling**: Dynamic routes with type-safe parameters
- **TanStack Router Integration**: Full compatibility with TanStack Router v1.x

### 🎨 UI Features
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Responsive Design**: Mobile-friendly interface
- **Interactive Examples**: Clickable demos for all features

## 📁 Key Files

```
src/
├── App.tsx                 # Main app with navigation
├── routeCache.generated.tsx # Generated routes (auto-created)
├── routing.yml             # Route configuration
├── hooks/
│   └── useTheme.ts         # Dark/light mode hook
├── components/
│   ├── LocaleSwitcher.tsx  # Language switching
│   └── ThemeToggle.tsx     # Theme toggle
└── pages/
    ├── Home.tsx            # Welcome page
    ├── GettingStarted.tsx  # Installation & setup guide
    ├── About.tsx           # Project information
    ├── UserProfile.tsx     # Parameter demonstration
    ├── ExamplesEN.tsx      # English examples page
    └── ExamplesES.tsx      # Spanish examples page
```

## 🛠 Development

```bash
# Install dependencies
pnpm install

# Start development server with route watching
pnpm dev

# Generate routes manually
pnpm run build:routes

# Build for production
pnpm build
```

## 📚 What You'll Learn

1. **Basic Setup**: How to configure YAML Routes in your project
2. **Route Definition**: YAML syntax for different route types
3. **Type Safety**: Using generated types and helpers
4. **Internationalization**: Multi-language routing strategies
5. **Best Practices**: Recommended patterns and architectures

## 🌐 Internationalization Demo

The demo showcases two languages:
- **English** (`/`) - Default locale
- **Spanish** (`/es/*`) - Localized paths and components

Navigate between languages to see how:
- URLs automatically adapt to the locale
- Components can be locale-specific
- Parameters are preserved across language switches

## 🎨 Theme Support

Toggle between light and dark modes to see how the theme system works:
- System preference detection
- localStorage persistence
- Smooth transitions
- Tailwind CSS integration

## 📖 Routes Overview

| Route | English Path | Spanish Path | Purpose |
|-------|-------------|--------------|---------|
| `home` | `/` | `/es/` | Welcome & overview |
| `getting_started` | `/getting-started` | `/es/getting-started` | Setup guide |
| `about` | `/about` | `/es/acerca-de` | Project info |
| `user_profile` | `/user/{id}` | `/es/usuario/{id}` | Parameter demo |
| `examples` | `/examples` | `/es/ejemplos` | Feature showcase |

## 🔧 Technical Implementation

- **Framework**: React + TanStack Router
- **Styling**: Tailwind CSS with dark mode
- **Type Safety**: Full TypeScript integration
- **Build Tool**: Vite
- **Package Manager**: pnpm

This demo represents production-ready patterns for implementing YAML Routes in real applications.

## ⚡ Quick Start

```bash
# Install the package
npm install @yaml-routes/tanstack

# Create routing.yml and generate routes
npx yaml-routes

# Watch for changes during development
npx yaml-routes --watch
```

## 🌟 Why Use YAML Routes?

- **Declarative**: Define all routes in one readable file
- **Type-Safe**: Generated TypeScript ensures correctness
- **i18n-First**: Built-in internationalization support
- **Framework-Ready**: Currently supports TanStack Router (React Router v7 coming soon)
- **Zero-Runtime**: All generation happens at build time

Visit the demo to see these features in action!