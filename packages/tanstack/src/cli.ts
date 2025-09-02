#!/usr/bin/env node

import { readFile } from "fs/promises";
import { resolve } from "path";
import { watch } from "fs";
import type { BuildConfig } from "./types";
import { generateTanStackRoutes } from "./generator";

interface CLIOptions {
    config?: string;
    output?: string;
    watch?: boolean;
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
            case "-w":
            case "--watch":
                options.watch = true;
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
  -c, --config <path>    Path to routing YAML file (default: routes.yml)
  -o, --output <path>    Output file path (default: src/routes.gen.tsx)
  -w, --watch            Watch for changes and regenerate automatically
  -h, --help             Show this help message
  -v, --version          Show version number

Examples:
  yaml-routes
  yaml-routes --config routes.yml --output src/routes.generated.ts
  yaml-routes --watch                    # Watch for changes in dev mode
  yaml-routes -w -c routes.yml           # Watch custom config file
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

async function generateRoutes(config: BuildConfig): Promise<boolean> {
    try {
        await generateTanStackRoutes(config);
        console.log("🎉 Routes generated successfully!");
        return true;
    } catch (error) {
        console.error("❌ Error generating routes:", error);
        return false;
    }
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    }) as T;
}

async function watchMode(config: BuildConfig): Promise<void> {
    console.log("👀 Watching for changes...");
    console.log(`📁 Config file: ${config.configPath}`);
    console.log(`📄 Output file: ${config.outputPath}`);
    console.log("🔄 Press Ctrl+C to stop watching\n");

    // Initial generation
    const initialSuccess = await generateRoutes(config);
    if (!initialSuccess) {
        console.error("❌ Initial route generation failed. Fix errors and save the config file to retry.");
    }

    // Debounced regeneration function
    const debouncedGenerate = debounce(async () => {
        console.log("\n📝 Config file changed, regenerating routes...");
        const success = await generateRoutes(config);
        if (success) {
            console.log("👀 Continuing to watch for changes...\n");
        } else {
            console.log("❌ Fix errors and save again to retry.\n");
        }
    }, 100); // 100ms debounce

    // Watch the config file
    const watcher = watch(config.configPath, (eventType) => {
        if (eventType === "change") {
            debouncedGenerate();
        }
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
        console.log("\n🛑 Stopping watch mode...");
        watcher.close();
        process.exit(0);
    });

    process.on("SIGTERM", () => {
        watcher.close();
        process.exit(0);
    });
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
        configPath: resolve(options.config || "routes.yml"),
        outputPath: resolve(options.output || "src/routes.gen.tsx"),
        framework: "tanstack-router",
    };

    if (options.watch) {
        await watchMode(config);
    } else {
        const success = await generateRoutes(config);
        process.exit(success ? 0 : 1);
    }
}

// Only run if this file is being executed directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` || (import.meta.url.endsWith("/cli.js") && process.argv[1].endsWith("/cli.js"));

if (isMainModule) {
    main().catch((error: any) => {
        console.error("Fatal error:", error);
        process.exit(1);
    });
}
