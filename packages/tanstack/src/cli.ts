import { readFile } from "fs/promises";
import { watch, realpathSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

import type { BuildConfig } from "./types";
import { generateTanStackRoutes } from "./generator";

export interface CLIOptions {
    config?: string;
    output?: string;
    watch?: boolean;
    help?: boolean;
    version?: boolean;
}

export function parseArgs(args: string[]): CLIOptions {
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

export function printHelp() {
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
        // Check if it's our user-friendly error message
        if (error instanceof Error && error.message.includes("ENOENT: Configuration file not found")) {
            console.error("❌", error.message);
        } else if (error instanceof Error && error.message.includes("Failed to parse YAML")) {
            console.error("❌", error.message);
        } else {
            // For other errors, show the original format
            console.error("❌ Error generating routes:", error instanceof Error ? error.message : error);
        }
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

    const initialSuccess = await generateRoutes(config);
    if (!initialSuccess) {
        console.error("❌ Initial route generation failed. Fix errors and save the config file to retry.");
    }

    const debouncedGenerate = debounce(async () => {
        console.log("\n📝 Config file changed, regenerating routes...");
        const success = await generateRoutes(config);
        if (success) {
            console.log("👀 Continuing to watch for changes...\n");
        } else {
            console.log("❌ Fix errors and save again to retry.\n");
        }
    }, 100);

    const watcher = watch(config.configPath, (eventType) => {
        if (eventType === "change") {
            debouncedGenerate();
        }
    });

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

export async function main() {
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

/** Robust ESM "is main" check that doesn't break when imported */
function isExecutedAsBin(): boolean {
    try {
        const thisFile = realpathSync(fileURLToPath(import.meta.url));
        const invoked = process.argv[1] ? realpathSync(process.argv[1]) : "";
        if (invoked && invoked === thisFile) return true;
        // npm/yarn/pnpm shim paths look like node_modules/.bin/yaml-routes(.cmd)
        if (/[\\/]\.bin[\\/](yaml-routes)(\.cmd)?$/.test(invoked)) return true;
    } catch {
        return true; // be lenient
    }
    return false;
}

// Do NOT auto-run here; leave execution to the bin wrapper.
// If you *really* want this file to be runnable directly (node dist/cli.js),
// uncomment the block below:
// if (isExecutedAsBin()) {
//   main().catch(err => {
//     console.error("Fatal error:", err);
//     process.exit(1);
//   });
// }
