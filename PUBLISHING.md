# Manual Publishing Guide

## Overview
This project uses **changesets for version management** and **manual npm publishing** to give you full control over when packages are released.

## Publishing Workflow

### Option 1: Using Changesets (Recommended)
This approach manages versions automatically and generates changelogs:

1. **Create a changeset** after making changes:
   ```bash
   pnpm changeset
   ```
   - Select which packages changed
   - Choose the type of change (patch/minor/major)
   - Write a description of the changes

2. **Apply version bumps**:
   ```bash
   pnpm version-packages
   ```
   - This updates package.json versions
   - Generates/updates CHANGELOG.md files
   - Removes consumed changesets

3. **Publish to npm**:
   ```bash
   pnpm release:manual
   ```
   - Builds all packages
   - Publishes changed packages to npm

### Option 2: Direct Manual Publishing
For quick fixes or when you want to manage versions yourself:

1. **Test and build**:
   ```bash
   pnpm publish:prepare
   ```

2. **Dry run** (optional):
   ```bash
   pnpm publish:dry
   ```

3. **Publish directly**:
   ```bash
   pnpm publish:manual
   ```

## Available Scripts

- `pnpm changeset` - Create a new changeset
- `pnpm version-packages` - Apply version bumps from changesets
- `pnpm release:manual` - Build and publish with changesets
- `pnpm publish:dry` - Test publish without actually publishing
- `pnpm publish:manual` - Direct publish after manual version bump
- `pnpm publish:prepare` - Check if package is ready + show options

## Notes

- All scripts include quality gates (build + test)
- Packages are published with `--access public` for scoped packages
- The demo app is ignored from version management