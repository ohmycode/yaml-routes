# YAML Routes

A monorepo for YAML-based routing configuration that generates type-safe routes for modern web frameworks.

## � Live Demo

**[View Interactive Demo →](https://ohmycode.github.io/yaml-routes)**

Experience all features live with:

-   **Interactive examples** of all features
-   **Copy-paste** snippets
-   **Live code samples** with syntax highlighting
-   **Multi-language routing** demonstrations

## �📦 Packages

-   **[@yaml-routes/tanstack](./packages/tanstack)** - TanStack Router integration with YAML route configuration
-   **[Interactive Demo & Guide](./apps/demo)** - Comprehensive developer guide and live examples

## 🎯 Local Development

```bash
# Install dependencies
pnpm install

# Start development (includes demo app)
pnpm dev

# Build all packages
pnpm build
```

The demo will be available at `http://localhost:3000`

## 🎯 Features

-   **🌐 Internationalization (i18n)** - Built-in support for multi-language routing
-   **📝 YAML Configuration** - Clean, readable route definitions
-   **🔒 Type Safety** - Full TypeScript support with generated types
-   **🛠 Extensible** - Easy to extend for different frameworks
-   **⚡ Performance** - Optimized build process and runtime

## 📚 Documentation

See individual package READMEs for detailed documentation:

-   [TanStack Router Package](./packages/tanstack/README.md)
-   [Demo Application](./apps/demo/README.md)

## 🏗 Architecture

This monorepo follows a clean architecture with:

-   **`packages/`** - Reusable npm packages
    -   `tanstack/` - TanStack Router integration
-   **`apps/`** - Example applications
    -   `demo/` - Demo showcase application

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.
