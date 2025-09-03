#!/usr/bin/env node

// yaml-routes CLI alias - proxies to @yaml-routes/tanstack
// This allows users to run "npx yaml-routes" instead of "npx @yaml-routes/tanstack"

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Find the @yaml-routes/tanstack binary
const tanstackBin = join(__dirname, "..", "node_modules", "@yaml-routes", "tanstack", "dist", "cli-bin.js");

// Forward all arguments to the real CLI
const child = spawn("node", [tanstackBin, ...process.argv.slice(2)], {
    stdio: "inherit",
    shell: false,
});

child.on("exit", (code) => {
    process.exit(code || 0);
});

child.on("error", (error) => {
    console.error("Failed to start yaml-routes:", error.message);
    process.exit(1);
});
