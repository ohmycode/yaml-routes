#!/usr/bin/env node

import { readFile } from "fs/promises";
import { resolve } from "path";
import type { BuildConfig } from "./types";
import { generateTanStackRoutes } from "./generator";

interface CLIOptions {
    config?: string;
    output?: string;
    help?: boolean;
    version?: boolean;
}

function parseArgs(args: string[]): CLIOptions {
    const options: CLIOptions = {};

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        switch (arg) {
            case "-c":
            case "--config":
                options.config = args[++i];
                break;
            case "-o":
            case "--output":
                options.output = args[++i];
                break;
            case "-h":
            case "--help":
                options.help = true;
                break;
            case "-v":
            case "--version":
                options.version = true;
                break;
        }
    }

    return options;
}

function printHelp() {
    console.log(`
yaml-routes - Generate routes from YAML configuration

Usage:
  yaml-routes [options]

Options:
  -c, --config <path>    Path to routing YAML file (default: routing.yml)
  -o, --output <path>    Output file path (default: src/routeCache.generated.tsx)
  -h, --help             Show this help message
  -v, --version          Show version number

Examples:
  yaml-routes
  yaml-routes --config routes.yml --output src/routes.generated.ts
`);
}

async function printVersion() {
    try {
        const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf-8");
        const { version } = JSON.parse(packageJson);
        console.log(version);
    } catch {
        console.log("unknown");
    }
}

async function main() {
    const args = process.argv.slice(2);
    const options = parseArgs(args);

    if (options.help) {
        printHelp();
        process.exit(0);
    }

    if (options.version) {
        await printVersion();
        process.exit(0);
    }

    const config: BuildConfig = {
        configPath: resolve(options.config || "routing.yml"),
        outputPath: resolve(options.output || "src/routeCache.generated.tsx"),
        framework: "tanstack-router",
    };

    try {
        await generateTanStackRoutes(config);
        console.log("🎉 Routes generated successfully!");
    } catch (error) {
        console.error("❌ Error generating routes:", error);
        process.exit(1);
    }
}

// Only run if this file is being executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((error) => {
        console.error("Fatal error:", error);
        process.exit(1);
    });
}
