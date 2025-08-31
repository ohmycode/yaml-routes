# 🚀 Publishing Guide

This guide explains how to publish new versions of `@yaml-routes/tanstack` to npm with a professional developer experience.

## 📋 Prerequisites

1. **npm Account**: Make sure you're logged into npm

    ```bash
    npm whoami  # Check if logged in
    npm login   # Login if needed
    ```

2. **Package Access**: Ensure you have publishing rights to `@yaml-routes/tanstack`

## 🔄 Publishing Workflow

### 1. Create a Changeset (Track Changes)

When you make changes that should be published, create a changeset:

```bash
pnpm changeset
```

This will:

-   Ask you which packages changed
-   Ask for the type of change (patch/minor/major)
-   Ask for a description of the changes
-   Create a markdown file in `.changeset/` folder

**Change Types:**

-   **Patch** (0.0.X): Bug fixes, documentation updates
-   **Minor** (0.X.0): New features, backwards compatible
-   **Major** (X.0.0): Breaking changes

### 2. Version the Packages

When ready to publish, update package versions:

```bash
pnpm version-packages
```

This will:

-   Consume all changesets
-   Update package.json versions
-   Generate CHANGELOG.md files
-   Commit the version changes

### 3. Publish to npm

```bash
pnpm release
```

This will:

-   Build all packages
-   Publish changed packages to npm
-   Create git tags for the new versions

## 🎯 Quick Commands

```bash
# Complete workflow in one go
pnpm changeset        # 1. Add changeset
pnpm version-packages # 2. Update versions
pnpm release          # 3. Publish to npm

# Or use the convenience script
pnpm publish:prepare  # Builds and checks everything is ready
```

## 🔍 Verification

After publishing, verify the package:

```bash
# Check it's available on npm
npm view @yaml-routes/tanstack

# Test installation in a new project
npm install @yaml-routes/tanstack
```

## 📊 Monitoring

-   **npm**: https://www.npmjs.com/package/@yaml-routes/tanstack
-   **Bundlephobia**: https://bundlephobia.com/package/@yaml-routes/tanstack
-   **GitHub Releases**: Automatically created when versions are tagged

## 🛠️ Troubleshooting

### "Package not found" error

-   Check you're logged into npm: `npm whoami`
-   Verify package name in package.json
-   Ensure you have publishing rights

### "Version already exists" error

-   Run `pnpm changeset version` to bump version
-   Check CHANGELOG.md was generated correctly

### Build errors before publish

-   Run `pnpm package:build` to test build
-   Run `pnpm package:test` to run tests
-   Fix any TypeScript errors in the package

## 🎉 Success!

Once published, users can install with:

```bash
npm install @yaml-routes/tanstack
# or
pnpm add @yaml-routes/tanstack
# or
yarn add @yaml-routes/tanstack
```
