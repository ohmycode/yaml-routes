import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale, useRouteName, extractRouteParameters, useRouteParams } from "../../routeCache.generated";
import { Browser } from "./components/Browser";
import { RouteInfoPanel } from "./components/RouteInfoPanel";
import { YamlHighlight } from "./components/YamlHighlight";
import { PizzaSite } from "./components/PizzaSite";
import { getPizzaData } from "./PizzaType";
import { Layout } from "./components/Layout";

export default function Demo() {
    const routeTo = useRouteTo();
    const location = useLocation();
    const currentLocale = useCurrentLocale();
    const routeName = useRouteName();
    const params = useRouteParams();
    const pizzaTypes = getPizzaData(currentLocale);

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
        <Layout>
            {/* Left Side - Browser Mockup */}
            <YamlHighlight referenceLine={"home:"} highLightedLineNumbers={[0, 1, 2]} />

            {/* Right Side - Browser Mockup */}
            <div className="space-y-4">
                <Browser>
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
                    >
                        TO DO
                    </PizzaSite>
                </Browser>

                <RouteInfoPanel />
            </div>
        </Layout>
    );
}
