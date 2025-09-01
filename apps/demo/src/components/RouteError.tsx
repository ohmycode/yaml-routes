// RouteError.tsx
import * as React from "react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { codeToHtml, type HtmlRendererOptions, type Transformer } from "shiki";

function toMessage(error: unknown) {
    if (error instanceof Error) return error.message || "Unexpected error";
    if (typeof error === "string") return error;
    try {
        return JSON.stringify(error);
    } catch {
        return String(error);
    }
}
const toStack = (e: unknown) => (e instanceof Error ? e.stack : undefined);

/** Accent function names and file:line:col inside the HTML we get from Shiki */
function accentuateStackHtml(html: string) {
    return html
        .replace(/(at\s+)([A-Za-z0-9_$.<>\[\]#/:\\-]+)(\s*\()/g, '$1<span class="text-sky-300">$2</span>$3')
        .replace(/([(\s])([A-Za-z]:\\[^():\n]+:\d+:\d+|\/[^():\n]+:\d+:\d+)([)\s])/g, '$1<span class="text-rose-300">$2</span>$3');
}

/** Shiki transformer: normalize <pre>/<code> so they don't break our rounded box */
const normalizePre: Transformer = {
    pre(node) {
        const style = [
            "margin:0",
            "padding:0",
            "background:transparent", // kill theme background so our card edge is clean
        ].join(";");
        node.properties = {
            ...(node.properties || {}),
            style,
            class: `${(node.properties as any)?.class ?? ""} not-prose`.trim(),
        };
    },
    code(node) {
        const base = ["display:block", "padding:1rem", "white-space:pre", "overflow-x:auto", "line-height:1.6", "font-size:0.8rem"].join(";");
        node.properties = {
            ...(node.properties || {}),
            style: `${(node.properties as any)?.style ?? ""};${base}`,
        };
    },
};

export function RouteError(props: ErrorComponentProps) {
    const { error } = props;
    const message = toMessage(error);
    const stack = toStack(error);

    const [open, setOpen] = React.useState(Boolean(import.meta.env.DEV && stack));
    const [copied, setCopied] = React.useState(false);
    const [html, setHtml] = React.useState<string | null>(null);

    React.useEffect(() => {
        let cancelled = false;
        if (!stack) return;
        if (typeof window === "undefined") return; // SSR safety
        (async () => {
            const shikiOpts: HtmlRendererOptions = {
                // Use a *great-looking* dark theme; also add a light theme for future-proofing
                themes: { light: "github-light", dark: "one-dark-pro" },
                lang: "txt", // treat as text; we add accents ourselves
                transformers: [normalizePre],
            };
            const highlighted = await codeToHtml(stack, shikiOpts);
            const withAccents = accentuateStackHtml(highlighted);
            if (!cancelled) setHtml(withAccents);
        })();

        return () => {
            cancelled = true;
        };
    }, [stack]);

    async function copyAll() {
        const text = [`${message}`, stack ? `\n${stack}` : ""].join("\n");
        try {
            await navigator.clipboard.writeText(text.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {}
    }

    // Provided by TanStack Router at runtime (fallback to reload)
    const onRetry =
        // @ts-expect-error: available at runtime
        typeof props.reset === "function" ? props.reset : () => window.location.reload();

    return (
        <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
            <div className="w-full max-w-3xl rounded-xl border border-neutral-800 bg-gradient-to-b from-neutral-900/70 to-neutral-900/30 shadow-xl backdrop-blur">
                <div className="flex items-start gap-3 p-5 sm:p-6">
                    {/* Icon */}
                    <div className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 ring-1 ring-red-500/30">
                        <svg width="18" height="18" viewBox="0 0 24 24" className="fill-red-400">
                            <path d="M11 7h2v6h-2V7zm0 8h2v2h-2v-2z" />
                            <path d="M1 21h22L12 2 1 21z" />
                        </svg>
                    </div>

                    <div className="flex-1 overflow-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Something went wrong</h2>
                            <span className="rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs text-neutral-300">
                                {import.meta.env.PROD ? "Production" : "Development"}
                            </span>
                        </div>

                        {/* Message */}
                        <p className="mt-3 text-sm text-neutral-300">{message}</p>

                        {/* Actions */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={onRetry}
                                className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                            >
                                Try again
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                            >
                                {open ? "Hide details" : "Show details"}
                            </button>
                            <button
                                type="button"
                                onClick={copyAll}
                                className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>

                        {/* Stack container */}
                        <div
                            className={`mt-4 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 transition-[max-height,opacity] duration-300 ${
                                open ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0"
                            }`}
                            aria-hidden={!open}
                        >
                            <div className="max-h-[60vh] overflow-auto">
                                {html ? (
                                    <div
                                        className={[
                                            // Shiki output + fixes
                                            "shiki",
                                            // Ensure long lines don’t blow the box
                                            "[&_code]:block [&*_]:max-w-full",
                                            // Normalize the inner pre/code spacing & background
                                            "[&_pre]:m-0 [&_pre]:p-0 [&_pre]:bg-transparent",
                                            "[&_code]:p-4 [&_code]:whitespace-pre [&_code]:overflow-x-auto",
                                            "[&_code]:leading-relaxed [&_code]:text-xs",
                                        ].join(" ")}
                                        // eslint-disable-next-line react/no-danger
                                        dangerouslySetInnerHTML={{ __html: html }}
                                    />
                                ) : (
                                    <pre className="p-4 whitespace-pre-wrap break-words text-xs text-neutral-400">{stack ?? "No stack trace available."}</pre>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RouteError;
