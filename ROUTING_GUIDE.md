# 🚀 YAML Routes - Quick Start Guide

This guide shows you how to use YAML Routes in your project with the watch mode for an amazing development experience.

## 📦 Installation

```bash
npm install @yaml-routes/tanstack
# or
pnpm add @yaml-routes/tanstack
```

## 🛠️ Setup

### 1. Create your routing configuration

Create a `routes.yml` file in your project root:

```yaml
# Global settings
settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, fr, es]

# Routes
home:
    path: /
    component: pages/Home

about:
    path:
        en: /about
        fr: /a-propos
        es: /acerca-de
    component: pages/About
```

### 2. Add scripts to package.json

```json
{
    "scripts": {
        "build:routes": "yaml-routes",
        "routes:watch": "yaml-routes --watch",
        "dev": "npm run build:routes && vite dev",
        "dev:watch": "npm run routes:watch & vite dev"
    }
}
```

## 🔥 Development Workflow

### For Development (Recommended)

Use watch mode for automatic route regeneration:

```bash
# Option 1: Start watch mode and dev server separately
npm run routes:watch    # Terminal 1 - watches routes.yml
npm run dev            # Terminal 2 - starts your app

# Option 2: Combined command (starts both)
npm run dev:watch
```

### For Production Build

```bash
npm run build:routes   # Generate routes once
npm run build         # Build your app
```

## 🎯 Commands

| Command                           | Description                           |
| --------------------------------- | ------------------------------------- |
| `yaml-routes`                     | Generate routes once                  |
| `yaml-routes --watch`             | Watch for changes and auto-regenerate |
| `yaml-routes --config custom.yml` | Use custom config file                |
| `yaml-routes --output custom.tsx` | Custom output file                    |
| `yaml-routes --help`              | Show all options                      |

## ✨ What Happens in Watch Mode

When you save changes to `routes.yml`:

1. 👀 **File change detected instantly**
2. ⚡ **Routes regenerated automatically**
3. 🎯 **TypeScript types updated**
4. 🔄 **Ready for hot reload**

No manual intervention needed! 🚀

## 📁 Example Project Structure

```
my-app/
├── routes.yml                    # Your route configuration
├── src/
│   ├── routes.gen.tsx   # Auto-generated (don't edit!)
│   ├── App.tsx
│   └── pages/
│       ├── Home.tsx
│       └── About.tsx
└── package.json
```

## 🎨 Live Demo

Check out the demo app in `apps/demo/` to see everything in action!

```bash
cd apps/demo
pnpm install
pnpm run routes:watch   # Start watching in one terminal
pnpm run dev           # Start dev server in another
```

Then edit `routes.yml` and watch the magic happen! ✨
