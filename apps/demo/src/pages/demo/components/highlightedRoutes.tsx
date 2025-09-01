import { useState, useEffect } from "react";
import { codeToHtml } from "shiki";

// Add custom styles for line highlighting following Shiki standards
const lineHighlightStyles = `
.highlighted {
    background-color: rgba(59, 130, 246, 0.15);
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.25));
    border-left: 4px solid rgb(96, 165, 250);
    padding-left: calc(1.5rem - 4px);
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    padding-right: 1.5rem;
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
    animation: highlight-pulse 2s ease-in-out infinite;
}

@keyframes highlight-pulse {
    0%, 100% { 
        opacity: 1;

    }
    50% { 
        opacity: 0.6;
    }
}
`;

interface YamlHighlightProps {
    highLightedLineNumbers?: number[];
    highLightedLines?: string[];
    title?: string;
    referenceLine?: string | number;
    yamlContent?: string;
}

export function YamlHighlight({
    referenceLine = 0,
    highLightedLineNumbers = [],
    highLightedLines = [],
    title = "routes.yml - Live Demo",
    yamlContent = pizzaYamlContent,
}: YamlHighlightProps) {
    const [highlightedHtml, setHighlightedHtml] = useState("");

    useEffect(() => {
        const highlightCode = async () => {
            // Find the reference line and calculate relative line numbers
            const lines = yamlContent.split("\n");
            let referenceLineIndex: number;

            if (typeof referenceLine === "string") {
                referenceLineIndex = lines.findIndex((line) => line.trim() === referenceLine);
                referenceLineIndex = referenceLineIndex === -1 ? 0 : referenceLineIndex + 1; // Default to 0 if not found
            } else {
                referenceLineIndex = referenceLine + 1; // Convert to 1-based index
            }

            // add highLightedLines to highLightedLineNumbers: lines.findIndex((line) => line.trim() === highLightedLine )
            const additionalLineNumbers = highLightedLines.map((lineText) => lines.findIndex((l) => l.trim() === lineText)).filter((index) => index !== -1);

            const allHighlightedNumbers = [...highLightedLineNumbers, ...additionalLineNumbers];

            // Convert relative line numbers to absolute line numbers
            const absoluteLines: number[] = allHighlightedNumbers.map((number) => {
                if (referenceLineIndex === 0) {
                    return number + 1; // Add offset (1-indexed)
                }
                return referenceLineIndex + number; // Add relative offset
            });

            // Apply Shiki highlighting with built-in line highlighting
            const highlighted = await codeToHtml(yamlContent, {
                lang: "yaml",
                theme: "github-dark",
                transformers: [
                    {
                        pre(node) {
                            // Add custom styling to match Home component
                            node.properties.style =
                                "background-color: transparent; padding: 1.5rem; margin: 0; font-size: 0.875rem; line-height: 1.6; overflow-x: auto;";
                        },
                        line(node, line) {
                            // Add line highlighting with Shiki's built-in system
                            if (absoluteLines.includes(line)) {
                                this.addClassToHast(node, "highlighted");
                            }
                        },
                    },
                ],
            });

            setHighlightedHtml(highlighted);
        };

        highlightCode();
    }, [yamlContent, highLightedLineNumbers, highLightedLines, referenceLine]);

    return (
        <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                    📝 routes.yml
                    <span className="text-sm bg-blue-900 text-blue-300 px-2 py-1 rounded">Live</span>
                </h2>
                <p className="text-gray-300 mb-4">The highlighted sections show the current active route and parameters</p>
                <div className="relative group">
                    <style dangerouslySetInnerHTML={{ __html: lineHighlightStyles }} />
                    <div className="bg-gradient-to-r from-gray-800 to-gray-750 px-6 py-4 text-sm text-gray-300 rounded-t-xl border-b border-gray-700/50 flex items-center gap-3 shadow-lg">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full shadow-sm animate-pulse"></span>
                            <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></span>
                            <span className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></span>
                        </div>
                        <span className="ml-2 font-medium text-gray-200">{title}</span>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-xs text-green-400 font-medium">Live</span>
                        </div>
                    </div>
                    <div className="relative overflow-hidden">
                        <div className="!bg-gradient-to-br !from-gray-900 !to-gray-800 shadow-2xl border border-gray-700/50 rounded-b-xl relative overflow-x-auto group-hover:shadow-3xl transition-all duration-300">
                            <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-b-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// YAML content for pizza routes
export const pizzaYamlContent = `# 🍕 Pizzalandia.com - Routes Configuration
# settings is a reserved word for global configuration
settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, es, fr]
        forceLocaleUrl: true
    basePath: /yaml-routes

# all other sections are routes
home:
    path: /
    component: pages/Home

pizza_list:
    path: /pizzas
    component: pages/PizzaList

pizza_detail:
    path:
        en: /our-pizzas/{pizzaType}
        es: /nuestras-pizzas/{pizzaType}
    component: pages/PizzaType

pizza_review_list:
    path:
        en: /our-pizzas/{pizzaType}/reviews
        es: /nuestras-pizzas/{pizzaType}/recomendaciones
    component: pages/PizzaReviewList

pizza_review:
    path:
        en: /our-pizzas/{pizzaType}/reviews/{reviewId}
        es: /nuestras-pizzas/{pizzaType}/recomendaciones/{reviewId}
    component:
        en: pages/PizzaReview
        es: pages/Recomendacion

pizza_review_comments:
    path:
        en: /our-pizzas/{pizzaType}/reviews/{reviewId}/comment/{commentId}
        es: /nuestras-pizzas/{pizzaType}/recomendaciones/{reviewId}/commentario/{commentId}
    component: pages/PizzaReviewComment
`;

// Helper function to get highlighted paths for pizza routes
export function getPizzaHighlightedPaths(routeType: string, params: Record<string, string> = {}, currentLocale: string = "en"): number[] {
    switch (routeType) {
        case "pizza":
            // Line numbers relative to "pizza:" line (0 = pizza: line itself)
            // 0: "pizza:"
            // 2: "    en: /pizza-corner/{pizzaType}"
            // 3: "    es: /pizzalandia/{pizzaType}"
            // 4: "  component: pages/Pizza"
            const lines = [0]; // "pizza:" line

            if (currentLocale === "en") {
                lines.push(2); // "en: /pizza-corner/{pizzaType}"
            } else if (currentLocale === "es") {
                lines.push(3); // "es: /pizzalandia/{pizzaType}"
            }

            lines.push(4); // "component: pages/Pizza"

            return lines;
        default:
            return [0]; // Just "pizza:" line
    }
}
