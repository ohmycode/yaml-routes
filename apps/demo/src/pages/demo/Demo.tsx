import { Link, useLocation } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale } from "../../routeCache.generated";
import { Browser } from "./components/Browser";
import { RouteInfoPanel } from "./components/RouteInfoPanel";
import { YamlHighlight, getPizzaHighlightedPaths, pizzaYamlContent } from "./components/highlightedRoutes";
import { PizzaSite } from "./components/PizzaSite";

export default function Demo() {
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
            },
            "meat-lovers": {
                name: "🥩 Carnivore Supreme",
                description: "Pepperoni, sausage, bacon, and ham with extra mozzarella",
                price: "$24",
                chef: "Luigi",
            },
            "vegan-delight": {
                name: "🌱 Garden Paradise",
                description: "Cashew cheese, roasted vegetables, and herb oil on whole wheat crust",
                price: "$22",
                chef: "Sofia",
            },
        },
    };

    const routeInfo = {
        type: "pizza-details",
        highlightedLines: [0, 1, 2, 3, 4, 5, 6, 7, 8], // pizza block
    };

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto p-8">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent">
                            YAML Routes Demo
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">An Interactive i18n routing demonstration with deeply nested URLs</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Side - YAML Configuration */}
                        <YamlHighlight />

                        {/* Right Side - Browser Mockup */}
                        <div className="space-y-4">
                            <Browser path={`/pizza/`} theme="dark">
                                <PizzaSite
                                    breadcrumbs={[
                                        {
                                            label: currentLocale === "es" ? "Inicio" : currentLocale === "fr" ? "Accueil" : "Home",
                                            to: routeTo("demo"),
                                        },
                                        {
                                            label: currentLocale === "es" ? "Menú de Pizzas" : currentLocale === "fr" ? "Menu Pizza" : "Pizza Menu",
                                        },
                                    ]}
                                ></PizzaSite>
                            </Browser>

                            <RouteInfoPanel />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
