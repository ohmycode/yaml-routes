# Contributing to YAML Routes

## 🏗 Development Setup

### Prerequisites

-   Node.js 18+
-   pnpm 8+

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-username/yaml-routes.git
cd yaml-routes

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## 📦 Project Structure

This is a pnpm monorepo with the following structure:

```
yaml-routes/
├── packages/
│   └── tanstack/              # @yaml-routes/tanstack package
│       ├── src/
│       │   ├── types.ts       # Type definitions
│       │   ├── utils.ts       # Utility functions
│       │   ├── generator.ts   # Route generation logic
│       │   ├── cli.ts         # CLI implementation
│       │   └── index.ts       # Main exports
│       ├── package.json
│       ├── tsup.config.ts     # Build configuration
│       └── README.md
├── apps/
│   └── demo/                  # Demo application
│       ├── src/
│       ├── routes.yml        # Route configuration
│       ├── package.json
│       └── README.md
├── package.json               # Root package.json
├── pnpm-workspace.yaml        # Workspace configuration
└── README.md
```

## 🔧 Development Workflow

### Working on the Package

```bash
# Navigate to package directory
cd packages/tanstack

# Start development mode (watch for changes)
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build the package
pnpm build
```

### Working on the Demo

```bash
# Navigate to demo directory
cd apps/demo

# Generate routes from YAML
pnpm build:routes

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Working with Both

```bash
# From root directory

# Start both package and demo in watch mode
pnpm dev

# Build everything
pnpm build

# Run all tests
pnpm test
```

## 🧪 Testing

We use Vitest for testing. Tests are located alongside source files with `.test.ts` or `.spec.ts` extensions.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @yaml-routes/tanstack test

# Run tests in watch mode
pnpm --filter @yaml-routes/tanstack test:watch
```

### Writing Tests

```typescript
import { describe, it, expect } from "vitest";
import { convertYamlPathToTanstackPath } from "../utils.js";

describe("convertYamlPathToTanstackPath", () => {
    it("should convert YAML path parameters to TanStack format", () => {
        expect(convertYamlPathToTanstackPath("/user/{id}")).toBe("/user/$id");
    });
});
```

## 📝 Making Changes

### Adding New Features

1. **Create a Feature Branch**

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Implement the Feature**

    - Add/modify code in `packages/tanstack/src/`
    - Add tests for new functionality
    - Update types if necessary

3. **Test Your Changes**

    ```bash
    pnpm test
    pnpm build
    ```

4. **Update Demo (if applicable)**

    - Add examples in `apps/demo/`
    - Update `routes.yml` to showcase new features
    - Test the demo application

5. **Add Changeset**
    ```bash
    pnpm changeset
    ```
    Follow the prompts to describe your changes.

### Bug Fixes

1. **Create a Bugfix Branch**

    ```bash
    git checkout -b fix/bug-description
    ```

2. **Write a Failing Test**

    - Create a test that reproduces the bug
    - Verify it fails

3. **Fix the Bug**

    - Implement the fix
    - Ensure the test now passes

4. **Add Changeset**
    ```bash
    pnpm changeset
    ```

## 🚀 Release Process

We use Changesets for version management:

1. **Create Changeset**

    ```bash
    pnpm changeset
    ```

2. **Version Packages**

    ```bash
    pnpm version-packages
    ```

3. **Publish**
    ```bash
    pnpm release
    ```

## 📋 Code Style

-   Use TypeScript for all source code
-   Follow existing code formatting
-   Write clear, descriptive variable and function names
-   Add JSDoc comments for public APIs
-   Prefer explicit types over `any`

### File Naming

-   Use kebab-case for file names: `route-generator.ts`
-   Use PascalCase for type names: `RouteConfig`
-   Use camelCase for variable and function names: `generateRoutes`

## 🔍 Architecture Decisions

### Why pnpm Monorepo?

-   **Dependency Management**: Shared dependencies across packages
-   **Development Experience**: Easy to work on package and demo simultaneously
-   **CI/CD**: Single repository for all related code
-   **Versioning**: Coordinated releases

### Why TanStack Router First?

-   **Modern**: Latest patterns in React routing
-   **Type Safety**: Excellent TypeScript support
-   **Performance**: Built for modern React applications
-   **Extensibility**: Easy to add support for other routers later

### Why YAML Configuration?

-   **Readability**: Much cleaner than complex JavaScript/TypeScript route files
-   **Simplicity**: Non-developers can understand and modify routes
-   **Validation**: Easy to validate structure and catch errors
-   **Tooling**: Great editor support with schema validation

## 🤝 Pull Request Guidelines

### Before Submitting

-   [ ] Tests pass locally
-   [ ] Code builds without errors
-   [ ] Demo application works correctly
-   [ ] Changeset added (if applicable)
-   [ ] Documentation updated (if applicable)

### PR Description Template

```markdown
## Description

Brief description of the changes

## Type of Change

-   [ ] Bug fix
-   [ ] New feature
-   [ ] Breaking change
-   [ ] Documentation update

## Testing

-   [ ] Added/updated tests
-   [ ] Tested in demo application
-   [ ] Manual testing performed

## Documentation

-   [ ] README updated
-   [ ] JSDoc comments added
-   [ ] Demo examples added
```

## 📚 Resources

-   [TanStack Router Documentation](https://tanstack.com/router)
-   [pnpm Workspace Documentation](https://pnpm.io/workspaces)
-   [Changesets Documentation](https://github.com/changesets/changesets)
-   [Vitest Documentation](https://vitest.dev/)
-   [tsup Documentation](https://tsup.egoist.dev/)

## 🆘 Getting Help

-   Open an issue for bugs or feature requests
-   Start a discussion for questions
-   Check existing issues and discussions first

## 📄 License

MIT - see [LICENSE](../LICENSE) file for details.
