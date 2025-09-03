# yaml-routes

**Unscoped CLI alias for [@yaml-routes/tanstack](https://www.npmjs.com/package/@yaml-routes/tanstack)**

This package provides a convenient unscoped alias to run the `@yaml-routes/tanstack` CLI without the scoped package name.

## Quick Start

```bash
# Instead of this:
npx @yaml-routes/tanstack

# You can now use:
npx yaml-routes
```

## What This Package Does

This is a lightweight proxy package that simply forwards all commands to `@yaml-routes/tanstack`. It contains no actual functionality.

## Usage

All commands and options work exactly the same as `@yaml-routes/tanstack`:

```bash
# Generate routes
npx yaml-routes

# Show help
npx yaml-routes --help

# Watch mode
npx yaml-routes --watch

# Custom config and output
npx yaml-routes --config my-routes.yml --output src/generated-routes.tsx
```

## Documentation

For full documentation, examples, and configuration options, please visit the main package:

-   **📖 Documentation**: [yaml-routes docs](https://ohmycode.github.io/yaml-routes)
-   **📦 Main Package**: [@yaml-routes/tanstack](https://www.npmjs.com/package/@yaml-routes/tanstack)
-   **🐛 Issues**: [GitHub Issues](https://github.com/ohmycode/yaml-routes/issues)

## Why This Alias Exists

This alias package exists to provide a shorter, more convenient command name. Instead of typing the scoped package name `@yaml-routes/tanstack`, you can simply use `yaml-routes`.

## License

MIT - See the main package for full license details.
