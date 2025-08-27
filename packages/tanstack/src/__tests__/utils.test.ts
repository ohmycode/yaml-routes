import { describe, it, expect } from "vitest";
import {
    convertYamlPathToTanstackPath,
    convertYamlPathToReactRouterPath,
    generateRouteId,
    generateComponentImportPath,
    extractPathValue,
    extractComponentValue,
    normalizeRouteName,
    validateRoutingConfig,
    isRouteConfig,
} from "../utils.js";

describe("utils", () => {
    describe("convertYamlPathToTanstackPath", () => {
        it("should convert YAML path parameters to TanStack format", () => {
            expect(convertYamlPathToTanstackPath("/user/{id}")).toBe("/user/$id");
            expect(convertYamlPathToTanstackPath("/blog/{slug}/comments/{commentId}")).toBe("/blog/$slug/comments/$commentId");
            expect(convertYamlPathToTanstackPath("/simple")).toBe("/simple");
        });
    });

    describe("convertYamlPathToReactRouterPath", () => {
        it("should convert YAML path parameters to React Router format", () => {
            expect(convertYamlPathToReactRouterPath("/user/{id}")).toBe("/user/:id");
            expect(convertYamlPathToReactRouterPath("/blog/{slug}/comments/{commentId}")).toBe("/blog/:slug/comments/:commentId");
            expect(convertYamlPathToReactRouterPath("/simple")).toBe("/simple");
        });
    });

    describe("generateRouteId", () => {
        it("should convert snake_case to camelCase", () => {
            expect(generateRouteId("user_profile")).toBe("userProfile");
            expect(generateRouteId("blog_post_comments")).toBe("blogPostComments");
            expect(generateRouteId("simple")).toBe("simple");
        });
    });

    describe("generateComponentImportPath", () => {
        it("should generate proper import paths", () => {
            expect(generateComponentImportPath("pages/Home")).toBe("./pages/Home");
            expect(generateComponentImportPath("./pages/Home")).toBe("./pages/Home");
            expect(generateComponentImportPath("pages/Home.tsx")).toBe("./pages/Home");
        });
    });

    describe("extractPathValue", () => {
        it("should extract path values correctly", () => {
            expect(extractPathValue("/simple", "en", "en")).toBe("/simple");
            expect(extractPathValue({ en: "/about", fr: "/a-propos" }, "fr", "en")).toBe("/a-propos");
            expect(extractPathValue({ en: "/about", fr: "/a-propos" }, "es", "en")).toBe("/about");
        });
    });

    describe("extractComponentValue", () => {
        it("should extract component values correctly", () => {
            expect(extractComponentValue("pages/Home", "en", "en")).toBe("pages/Home");
            expect(extractComponentValue({ en: "pages/HomeEN", fr: "pages/HomeFR" }, "fr", "en")).toBe("pages/HomeFR");
            expect(extractComponentValue({ en: "pages/HomeEN", fr: "pages/HomeFR" }, "es", "en")).toBe("pages/HomeEN");
        });
    });

    describe("normalizeRouteName", () => {
        it("should normalize route names", () => {
            expect(normalizeRouteName("  USER_PROFILE  ")).toBe("user_profile");
            expect(normalizeRouteName("BlogPost")).toBe("blogpost");
        });
    });

    describe("isRouteConfig", () => {
        it("should validate route configs correctly", () => {
            expect(isRouteConfig({ path: "/test", component: "pages/Test" })).toBe(true);
            expect(isRouteConfig({ path: "/test" })).toBe(true);
            expect(isRouteConfig({ component: "pages/Test" })).toBe(true);
            expect(isRouteConfig({})).toBe(false);
            expect(isRouteConfig(null)).toBe(false);
            expect(isRouteConfig("string")).toBe(false);
        });
    });

    describe("validateRoutingConfig", () => {
        it("should validate routing config correctly", () => {
            const validConfig = {
                settings: {
                    i18n: {
                        enabled: true,
                        defaultLocale: "en",
                        supportedLocales: ["en", "fr"],
                    },
                },
                home: { path: "/", component: "pages/Home" },
                about: { path: "/about", component: "pages/About" },
            };

            const result = validateRoutingConfig(validConfig);
            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("should detect duplicate route names", () => {
            const invalidConfig = {
                home: { path: "/", component: "pages/Home" },
                HOME: { path: "/home", component: "pages/Home2" }, // Normalizes to same name
            };

            const result = validateRoutingConfig(invalidConfig);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain('Duplicate route name: "HOME" (normalized: "home")');
        });

        it("should detect missing required properties", () => {
            const invalidConfig = {
                incomplete: { path: "/" }, // Missing component
            };

            const result = validateRoutingConfig(invalidConfig);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain('Route "incomplete" is missing required "component" property');
        });
    });
});
