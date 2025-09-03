#!/usr/bin/env node

import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

async function syncVersions() {
    try {
        // Read the main package version
        const tanstackPkg = JSON.parse(await readFile(resolve("packages/tanstack/package.json"), "utf-8"));

        // Read the alias package
        const aliasPath = resolve("packages/yaml-routes/package.json");
        const aliasPkg = JSON.parse(await readFile(aliasPath, "utf-8"));

        const mainVersion = tanstackPkg.version;
        const aliasVersion = aliasPkg.version;

        console.log(`📦 @yaml-routes/tanstack: ${mainVersion}`);
        console.log(`📦 yaml-routes: ${aliasVersion}`);

        if (mainVersion !== aliasVersion) {
            console.log(`🔄 Syncing yaml-routes version to ${mainVersion}...`);

            // Update the alias package version
            aliasPkg.version = mainVersion;

            // Write back the updated package.json
            await writeFile(aliasPath, JSON.stringify(aliasPkg, null, 4) + "\n");

            console.log(`✅ Successfully synced versions to ${mainVersion}`);
        } else {
            console.log(`✅ Versions are already in sync: ${mainVersion}`);
        }
    } catch (error) {
        console.error("❌ Error syncing versions:", error.message);
        process.exit(1);
    }
}

syncVersions();
