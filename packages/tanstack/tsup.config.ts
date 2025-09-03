// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig([
    // Library + programmatic CLI module (no shebang)
    {
        entry: {
            index: "src/index.ts",
            cli: "src/cli.ts", // <- no shebang here
        },
        format: ["esm"],
        dts: true,
        clean: true,
        sourcemap: true,
        target: "es2022",
        minify: false,
        external: ["react", "react-dom", "@tanstack/react-router"],
        tsconfig: "./tsconfig.json",
    },
    // Bin wrapper (with shebang)
    {
        entry: {
            "cli-bin": "src/cli-bin.ts", // produces dist/cli-bin.js
        },
        format: ["esm"],
        dts: false,
        clean: false,
        sourcemap: true,
        target: "es2022",
        minify: false,
        external: ["react", "react-dom", "@tanstack/react-router"],
        tsconfig: "./tsconfig.json",
        banner: { js: "#!/usr/bin/env node" },
    },
]);
