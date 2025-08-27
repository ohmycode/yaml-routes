import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
    plugins: [
        paraglideVitePlugin({
            project: "./project.inlang",
            outdir: "./src/paraglide",
            strategy: ["url", "baseLocale"],
            // Configure URL patterns for our i18n routing
            urlPatterns: [
                {
                    pattern: "/:path(.*)?",
                    localized: [
                        ["fr", "/fr/:path(.*)?"], // French has /fr prefix
                        ["es", "/es/:path(.*)?"], // Spanish has /es prefix
                        ["en", "/:path(.*)?"], // English is default (no prefix)
                    ],
                },
            ],
        }),
        // this is the plugin that enables path aliases
        viteTsConfigPaths({
            projects: ["./tsconfig.json"],
        }),
        tailwindcss(),
        viteReact(),
    ],
});

export default config;
