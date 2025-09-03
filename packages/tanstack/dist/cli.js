#!/usr/bin/env node
import {
  generateTanStackRoutes
} from "./chunk-56RHWCFF.js";

// src/cli.ts
import { readFile } from "fs/promises";
import { resolve } from "path";
import { watch } from "fs";
function parseArgs(args) {
  const options = {};
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
async function generateRoutes(config) {
  try {
    await generateTanStackRoutes(config);
    console.log("\u{1F389} Routes generated successfully!");
    return true;
  } catch (error) {
    console.error("\u274C Error generating routes:", error);
    return false;
  }
}
function debounce(func, wait) {
  let timeout;
  return ((...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  });
}
async function watchMode(config) {
  console.log("\u{1F440} Watching for changes...");
  console.log(`\u{1F4C1} Config file: ${config.configPath}`);
  console.log(`\u{1F4C4} Output file: ${config.outputPath}`);
  console.log("\u{1F504} Press Ctrl+C to stop watching\n");
  const initialSuccess = await generateRoutes(config);
  if (!initialSuccess) {
    console.error("\u274C Initial route generation failed. Fix errors and save the config file to retry.");
  }
  const debouncedGenerate = debounce(async () => {
    console.log("\n\u{1F4DD} Config file changed, regenerating routes...");
    const success = await generateRoutes(config);
    if (success) {
      console.log("\u{1F440} Continuing to watch for changes...\n");
    } else {
      console.log("\u274C Fix errors and save again to retry.\n");
    }
  }, 100);
  const watcher = watch(config.configPath, (eventType) => {
    if (eventType === "change") {
      debouncedGenerate();
    }
  });
  process.on("SIGINT", () => {
    console.log("\n\u{1F6D1} Stopping watch mode...");
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
  const config = {
    configPath: resolve(options.config || "routes.yml"),
    outputPath: resolve(options.output || "src/routes.gen.tsx"),
    framework: "tanstack-router"
  };
  if (options.watch) {
    await watchMode(config);
  } else {
    const success = await generateRoutes(config);
    process.exit(success ? 0 : 1);
  }
}
var isMainModule = import.meta.url === `file://${process.argv[1]}` || import.meta.url.endsWith("/cli.js") && process.argv[1].endsWith("/cli.js");
if (isMainModule) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
//# sourceMappingURL=cli.js.map