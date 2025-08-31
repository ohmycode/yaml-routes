import { Link, useLocation } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale } from "../routeCache.generated";
import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-yaml";

function YamlHighlight({ yamlContent, highlightedPaths = [] }: { yamlContent: string; highlightedPaths: string[] }) {
    const [highlightedHtml, setHighlightedHtml] = useState("");

    useEffect(() => {
        // Apply Prism highlighting to the YAML content
        const highlighted = Prism.highlight(yamlContent, Prism.languages.yaml, "yaml");

        // Split into lines and apply route highlighting
        const lines = highlighted.split("\n");
        const processedLines = lines.map((line, index) => {
            const plainLine = yamlContent.split("\n")[index];
            const isHighlighted = highlightedPaths.some((path) => {
                // Check for exact path matches or parameter patterns
                return (
                    plainLine.includes(path) ||
                    (path.includes("{") && plainLine.includes(path.replace(/\{[^}]+\}/g, "{"))) ||
                    (path.includes(":") && plainLine.includes(path.split(":")[0]))
                );
            });

            return {
                html: line,
                highlighted: isHighlighted,
                lineNumber: index + 1,
            };
        });

        const finalHtml = processedLines
            .map(({ html, highlighted }) => {
                if (highlighted) {
                    return `<span class="bg-blue-600/30 border-l-4 border-blue-400 pl-2 -ml-2 block">${html}</span>`;
                }
                return html;
            })
            .join("\n");

        setHighlightedHtml(finalHtml);
    }, [yamlContent, highlightedPaths]);

    return (
        <div className="relative">
            <div className="bg-gray-800 px-4 py-3 text-sm text-gray-300 rounded-t-lg border-b border-gray-700 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="ml-3 font-medium">routes.yml - Live Demo</span>
            </div>
            <div className="bg-gray-900 rounded-b-lg overflow-hidden">
                <pre className="text-sm overflow-x-auto !bg-gray-900 !p-4">
                    <code className="language-yaml" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
                </pre>
            </div>
        </div>
    );
}

export default function DemoEN() {
    const routeTo = useRouteTo();
    const location = useLocation();
    const currentLocale = useCurrentLocale();

    // Demo data for our pizza restaurant
    const pizzaData = {
        pizzas: {
            margherita: {
                name: "🍅 Classic Margherita",
                description: "Fresh basil, mozzarella, and tomato sauce on wood-fired crust",
                price: "$18",
                chef: "Mario",
                reviews: {
                    "amazing-flavor": {
                        author: "Sofia K.",
                        rating: 5,
                        text: "The most authentic Italian taste in the city!",
                        replies: {
                            "chef-thanks": { author: "Chef Mario", text: "Grazie mille! Made with love 💚" },
                            "agree-completely": { author: "Luigi M.", text: "Couldn't agree more! My favorite too 🍕" },
                        },
                    },
                    "perfect-crust": {
                        author: "James R.",
                        rating: 5,
                        text: "The wood-fired crust is perfection!",
                        replies: {
                            "secret-technique": { author: "Chef Mario", text: "24-hour fermented dough is the secret! 👨‍🍳" },
                        },
                    },
                },
                toppings: {
                    "san-marzano": { name: "🍅 San Marzano Tomatoes", origin: "Napoli, Italy" },
                    "buffalo-mozzarella": { name: "🧀 Buffalo Mozzarella", origin: "Campania, Italy" },
                    "fresh-basil": { name: "🌿 Fresh Basil", origin: "Local Garden" },
                },
            },
            "meat-lovers": {
                name: "🥩 Carnivore Supreme",
                description: "Pepperoni, sausage, bacon, and ham with extra mozzarella",
                price: "$24",
                chef: "Luigi",
                reviews: {
                    "protein-paradise": {
                        author: "Mike T.",
                        rating: 5,
                        text: "Meat lover's dream come true!",
                        replies: {
                            "glad-you-enjoyed": { author: "Chef Luigi", text: "That's what we aim for! 🥩" },
                        },
                    },
                },
                toppings: {
                    pepperoni: { name: "🍕 Spicy Pepperoni", origin: "House-made" },
                    "italian-sausage": { name: "🌭 Italian Sausage", origin: "Traditional Recipe" },
                    "crispy-bacon": { name: "🥓 Crispy Bacon", origin: "Locally Sourced" },
                },
            },
            "vegan-delight": {
                name: "🌱 Garden Paradise",
                description: "Cashew cheese, roasted vegetables, and herb oil on whole wheat crust",
                price: "$22",
                chef: "Sofia",
                reviews: {
                    "surprisingly-good": {
                        author: "Emma L.",
                        rating: 4,
                        text: "I'm not vegan but this was incredible!",
                        replies: {
                            "plant-power": { author: "Chef Sofia", text: "Plants can be amazing! 🌱✨" },
                        },
                    },
                },
                toppings: {
                    "cashew-cheese": { name: "🥜 Cashew Mozzarella", origin: "House-made" },
                    "roasted-peppers": { name: "🫑 Roasted Bell Peppers", origin: "Local Farm" },
                    "herb-oil": { name: "🌿 Herb-infused Oil", origin: "Sofia's Recipe" },
                },
            },
        },
        orders: {
            "order-12345": {
                customer: "John D.",
                items: ["margherita", "meat-lovers"],
                status: "preparing",
                tracking: {
                    ordered: "2:30 PM",
                    preparing: "2:35 PM",
                    baking: "pending",
                    ready: "pending",
                },
            },
        },
        chefs: {
            mario: {
                name: "👨‍🍳 Chef Mario Rossi",
                specialty: "Traditional Italian",
                experience: "30 years",
                specialties: {
                    "wood-fire-master": { name: "🔥 Wood-Fire Mastery", description: "Expert in 900°F oven techniques" },
                    "dough-artisan": { name: "🥖 Dough Artistry", description: "24-hour fermentation specialist" },
                },
            },
        },
    };

    // Extract current route parameters from URL - but simulate pizza routes
    const getCurrentRouteInfo = (): any => {
        const path = location.pathname.replace("/yaml-routes", "").replace(`/${currentLocale}`, "").replace(/^\//, "");
        const segments = path.split("/").filter(Boolean);

        // We'll simulate pizza routes while using the existing user routes
        // This is just for demo visualization - the actual navigation still uses user routes
        if (segments.length === 0) return { type: "home", params: {}, simulatedPath: "/" };

        if (segments[0] === "user" && segments.length >= 2) {
            const userId = segments[1];

            // Map user IDs to pizza types for demo
            const pizzaMap: { [key: string]: string } = {
                mario: "margherita",
                luigi: "meat-lovers",
                sofia: "vegan-delight",
            };

            const pizzaType = pizzaMap[userId] || "margherita";
            const pizza = pizzaData.pizzas[pizzaType as keyof typeof pizzaData.pizzas];

            if (segments[2] === "images" && segments.length >= 4) {
                const imageId = segments[3];
                // Map to review/reply structure
                const reviewId = Object.keys(pizza.reviews)[0];
                const review = pizza.reviews[reviewId as keyof typeof pizza.reviews] as any;
                const replyId = Object.keys(review.replies || {})[0];

                return {
                    type: "pizza-review-reply",
                    params: { pizzaType, reviewId, replyId },
                    simulatedPath: `/pizza/${pizzaType}/reviews/${reviewId}/replies/${replyId}`,
                    data: { pizza, review, reply: review.replies?.[replyId] },
                };
            }
            if (segments[2] === "images") {
                return {
                    type: "pizza-reviews",
                    params: { pizzaType },
                    simulatedPath: `/pizza/${pizzaType}/reviews`,
                    data: { pizza },
                };
            }
            return {
                type: "pizza-details",
                params: { pizzaType },
                simulatedPath: `/pizza/${pizzaType}`,
                data: { pizza },
            };
        }

        return { type: "demo-home", params: {}, simulatedPath: "/demo" };
    };

    const routeInfo = getCurrentRouteInfo();

    // Generate YAML content with pizza-themed routes
    const yamlContent = `# 🍕 Mario's Legendary Pizza Palace - Routes Configuration
settings:
  i18n:
    enabled: true
    defaultLocale: en
    supportedLocales: [en, es, fr]
    forceLocaleUrl: true
  basePath: /yaml-routes
# 🏠 Main pages
demo:
  path:
    en: /demo
    es: /demo
    fr: /demo
  component:
    en: pages/DemoEN
    es: pages/DemoES
    fr: pages/DemoFR
# 🍕 Pizza menu and details
pizza_details:
  path: /pizza/{pizzaType}
  component: pages/PizzaDetails
  parameters:
    pizzaType:
      type: string
      required: true
      description: "Pizza type slug (margherita, meat-lovers, etc.)"
# ⭐ Pizza reviews section
pizza_reviews:
  path: /pizza/{pizzaType}/reviews
  component: pages/PizzaReviews
  parameters:
    pizzaType:
      type: string
      required: true
# 📝 Individual review with replies
pizza_review_details:
  path: /pizza/{pizzaType}/reviews/{reviewId}
  component: pages/PizzaReviewDetails
  parameters:
    pizzaType:
      type: string
      required: true
    reviewId:
      type: string
      required: true
# 💬 Deep nested: Reply to review
pizza_review_reply:
  path: /pizza/{pizzaType}/reviews/{reviewId}/replies/{replyId}
  component: pages/PizzaReviewReply
  parameters:
    pizzaType:
      type: string
      required: true
    reviewId:
      type: string
      required: true
    replyId:
      type: string
      required: true
# 🧀 Pizza toppings explorer
pizza_toppings:
  path: /pizza/{pizzaType}/toppings
  component: pages/PizzaToppings
  parameters:
    pizzaType:
      type: string
      required: true
# 📦 Order tracking system
order_tracking:
  path: /orders/{orderId}/tracking
  component: pages/OrderTracking
  parameters:
    orderId:
      type: string
      required: true
# 👨‍🍳 Chef profiles and specialties
chef_profile:
  path: /chef/{chefId}
  component: pages/ChefProfile
  parameters:
    chefId:
      type: string
      required: true
chef_specialty:
  path: /chef/{chefId}/specialties/{specialtyId}
  component: pages/ChefSpecialty
  parameters:
    chefId:
      type: string
      required: true
    specialtyId:
      type: string
      required: true`;

    // Determine which paths to highlight based on current route
    const getHighlightedPaths = () => {
        switch (routeInfo.type) {
            case "pizza-details":
                return ["pizza_details:", "/pizza/{pizzaType}", `pizzaType: ${routeInfo.params.pizzaType}`];
            case "pizza-reviews":
                return ["pizza_reviews:", "/pizza/{pizzaType}/reviews", `pizzaType: ${routeInfo.params.pizzaType}`];
            case "pizza-review-reply":
                return [
                    "pizza_review_reply:",
                    "/pizza/{pizzaType}/reviews/{reviewId}/replies/{replyId}",
                    `pizzaType: ${routeInfo.params.pizzaType}`,
                    `reviewId: ${routeInfo.params.reviewId}`,
                    `replyId: ${routeInfo.params.replyId}`,
                ];
            default:
                return ["demo:"];
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-yellow-500 to-red-800 bg-clip-text text-transparent">
                    🍕 Mario's Pizza Palace Demo
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Interactive routing demonstration with deeply nested URLs</p>
                <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Live YAML highlighting • Real-time parameter extraction
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Simulated Routes:</strong> This demo shows how pizza routes would look, but uses existing user routes for navigation.
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Current URL: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">{routeInfo.simulatedPath}</code>
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Side - YAML Configuration */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            📝 routes.yml Configuration
                            <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">Live</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">The highlighted sections show the current active route and parameters</p>
                        <YamlHighlight yamlContent={yamlContent} highlightedPaths={getHighlightedPaths()} />
                    </div>

                    {/* Current Route Info */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                        <h3 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-300">🔍 Current Route Analysis</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium">Route Type:</span>
                                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">{routeInfo.type}</code>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Simulated URL:</span>
                                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">{routeInfo.simulatedPath}</code>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Actual URL:</span>
                                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{location.pathname}</code>
                            </div>
                            {Object.keys(routeInfo.params).length > 0 && (
                                <div>
                                    <span className="font-medium">Parameters:</span>
                                    <div className="mt-1 space-y-1">
                                        {Object.entries(routeInfo.params).map(([key, value]) => (
                                            <div key={key} className="flex justify-between text-xs">
                                                <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                                                <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">{String(value)}</code>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side - Interactive Content */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            🎮 Interactive Demo
                            <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                                Click to navigate
                            </span>
                        </h2>

                        {/* Pizza Menu */}
                        <section className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">🍕 Our Signature Pizzas</h3>
                            <div className="grid gap-4">
                                {Object.entries(pizzaData.pizzas).map(([pizzaSlug, pizza]) => {
                                    // Map pizza types to user IDs for navigation
                                    const userIdMap: { [key: string]: string } = {
                                        margherita: "mario",
                                        "meat-lovers": "luigi",
                                        "vegan-delight": "sofia",
                                    };
                                    const userId = userIdMap[pizzaSlug];

                                    return (
                                        <div
                                            key={pizzaSlug}
                                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-lg">{pizza.name}</h4>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-green-600">{pizza.price}</div>
                                                    <Link
                                                        to={routeTo("user_profile", { id: userId })}
                                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium"
                                                    >
                                                        View Details →
                                                    </Link>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{pizza.description}</p>
                                            <div className="mb-3">
                                                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded">
                                                    Chef: {pizza.chef}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                <Link
                                                    to={routeTo("user_images", { id: userId })}
                                                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50"
                                                >
                                                    ⭐ Reviews ({Object.keys(pizza.reviews).length})
                                                </Link>
                                                {Object.entries(pizza.reviews)
                                                    .slice(0, 1)
                                                    .map(([reviewId, review]) => (
                                                        <Link
                                                            key={reviewId}
                                                            to={routeTo("user_image", { id: userId, imageId: reviewId })}
                                                            className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded hover:bg-yellow-200 dark:hover:bg-yellow-900/50"
                                                        >
                                                            💬 "{review.text.slice(0, 25)}..."
                                                        </Link>
                                                    ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Navigation Examples */}
                        <section>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">🧭 Navigation Examples</h3>
                            <div className="grid gap-3">
                                <Link
                                    to={routeTo("user_profile", { id: "mario" })}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors block"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium">🍅 Classic Margherita Details</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Simulates: <code>/pizza/margherita</code>
                                            </p>
                                        </div>
                                        <span className="text-blue-600 text-sm">View →</span>
                                    </div>
                                </Link>

                                <Link
                                    to={routeTo("user_images", { id: "luigi" })}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors block"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium">🥩 Meat Lovers Reviews</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Simulates: <code>/pizza/meat-lovers/reviews</code>
                                            </p>
                                        </div>
                                        <span className="text-blue-600 text-sm">Reviews →</span>
                                    </div>
                                </Link>

                                <Link
                                    to={routeTo("user_image", { id: "sofia", imageId: "surprisingly-good" })}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors block"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium">🌱 Vegan Pizza Review Reply</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Simulates: <code>/pizza/vegan-delight/reviews/surprisingly-good/replies/plant-power</code>
                                            </p>
                                        </div>
                                        <span className="text-blue-600 text-sm">Deep nested →</span>
                                    </div>
                                </Link>
                            </div>
                        </section>
                    </div>

                    {/* Content Preview */}
                    {routeInfo.data && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                            <h3 className="text-lg font-bold mb-3 text-orange-800 dark:text-orange-300">📄 Current Page Content Preview</h3>
                            {routeInfo.type === "pizza-details" && routeInfo.data.pizza && (
                                <div>
                                    <h4 className="font-medium text-lg mb-2">
                                        {routeInfo.data.pizza.name} - {routeInfo.data.pizza.price}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 mb-3">{routeInfo.data.pizza.description}</p>
                                    <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded mb-3">
                                        <p className="text-sm font-medium mb-2">Toppings:</p>
                                        <div className="grid grid-cols-1 gap-1 text-xs">
                                            {Object.entries(routeInfo.data.pizza.toppings).map(([toppingId, topping]: [string, any]) => (
                                                <div key={toppingId} className="flex justify-between">
                                                    <span>{topping.name}</span>
                                                    <span className="text-gray-500">({topping.origin})</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-orange-700 dark:text-orange-300">
                                        💡 This would be the PizzaDetails component showing pizza information, ingredients, and ordering options
                                    </p>
                                </div>
                            )}
                            {routeInfo.type === "pizza-reviews" && routeInfo.data.pizza && (
                                <div>
                                    <h4 className="font-medium mb-2">{routeInfo.data.pizza.name} - Customer Reviews</h4>
                                    <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded mb-3">
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Recent Reviews:</p>
                                        <div className="space-y-2 text-xs">
                                            {Object.entries(routeInfo.data.pizza.reviews).map(([reviewId, review]: [string, any]) => (
                                                <div key={reviewId} className="bg-blue-50 dark:bg-blue-900/50 p-2 rounded">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="font-medium">{review.author}</span>
                                                        <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                                                    </div>
                                                    <p className="text-gray-600 dark:text-gray-300">"{review.text}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-orange-700 dark:text-orange-300">
                                        💡 This would be the PizzaReviews component displaying all customer reviews for this pizza
                                    </p>
                                </div>
                            )}
                            {routeInfo.type === "pizza-review-reply" && routeInfo.data.pizza && routeInfo.data.review && routeInfo.data.reply && (
                                <div>
                                    <h4 className="font-medium text-lg mb-2">Reply to "{routeInfo.data.review.text}"</h4>
                                    <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded mb-3">
                                        <div className="mb-2">
                                            <strong>Original Review by {routeInfo.data.review.author}:</strong>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">"{routeInfo.data.review.text}"</p>
                                        </div>
                                        <div className="border-l-4 border-blue-400 pl-3">
                                            <strong>Reply by {routeInfo.data.reply.author}:</strong>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">"{routeInfo.data.reply.text}"</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-orange-700 dark:text-orange-300">
                                        💡 This would be the PizzaReviewReply component showing the detailed conversation thread
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Features Showcase */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">🚀 What This Demonstrates</h2>
                    <p className="text-xl text-blue-100">See how YAML Routes handles complex, nested routing scenarios</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">🎯 Deep Nesting</h3>
                        <p className="text-blue-100 mb-3">
                            Routes like{" "}
                            <code className="bg-white/20 px-1 rounded">
                                /pizza/{"{type}"}/reviews/{"{id}"}/replies/{"{id}"}
                            </code>
                            show how YAML Routes handles complex URL structures.
                        </p>
                        <ul className="text-sm text-blue-200 space-y-1">
                            <li>• Multiple path parameters</li>
                            <li>• Nested resource relationships</li>
                            <li>• Type-safe parameter extraction</li>
                        </ul>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">📱 Real-time Updates</h3>
                        <p className="text-blue-100 mb-3">
                            The YAML configuration updates in real-time as you navigate, highlighting the current route and parameters.
                        </p>
                        <ul className="text-sm text-blue-200 space-y-1">
                            <li>• Live syntax highlighting</li>
                            <li>• Parameter value extraction</li>
                            <li>• Route pattern matching</li>
                        </ul>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">🌍 i18n Ready</h3>
                        <p className="text-blue-100 mb-3">Switch languages and see how the same route structure works across different locales seamlessly.</p>
                        <ul className="text-sm text-blue-200 space-y-1">
                            <li>• Locale-aware URLs</li>
                            <li>• Automatic route generation</li>
                            <li>• Consistent navigation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
