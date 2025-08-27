import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        cli: "src/cli.ts",
    },
    format: ["esm"],
    dts: {
        resolve: true,
    },
    clean: true,
    sourcemap: true,
    target: "es2022",
    minify: false,
    external: ["react", "react-dom", "@tanstack/react-router"],
    tsconfig: "./tsconfig.json",
});
