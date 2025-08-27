// Type definitions for Paraglide JS runtime and messages
// This helps TypeScript understand the generated files

declare module "*/paraglide/runtime.js" {
    export const locales: readonly string[];
    export const baseLocale: string;
    export function getLocale(): string;
    export function setLocale(locale: string, options?: { reload?: boolean }): void;
    export function localizeHref(href: string, options?: { locale?: string }): string;
    export function isLocale(value: any): value is string;
}

declare module "*/paraglide/messages.js" {
    const messages: Record<string, (...args: any[]) => string>;
    export = messages;
}
