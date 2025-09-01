import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale, useRouteName, extractRouteParameters, useRouteParams } from "../../routeCache.generated";
import { Browser } from "./components/Browser";
import { RouteInfoPanel } from "./components/RouteInfoPanel";
import { YamlHighlight } from "./components/YamlHighlight";
import { PizzaSite } from "./components/PizzaSite";
import { Pizza } from "./components/Pizza";
import { getPizzaData } from "./PizzaType";
import { Layout } from "./components/Layout";

export default function Demo() {
    const routeTo = useRouteTo();
    const location = useLocation();
    const currentLocale = useCurrentLocale();
    const routeName = useRouteName();
    const params = useRouteParams();
    const pizzaData = getPizzaData(currentLocale);

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
                        {/* Pizza Grid */}
                        <div className="p-6 bg-gray-900 space-y-4">
                            {Object.entries(pizzaData).map(([pizzaId, pizza]: [string, any]) => {
                                return (
                                    <div
                                        key={pizzaId}
                                        className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-l-4 border-red-500"
                                    >
                                        <div className="p-5">
                                            <div className="flex items-start gap-4 mb-3">
                                                {/* Custom Pizza Slice */}
                                                <div className="flex-shrink-0">
                                                    <Pizza pizzaType={pizzaId} emoji={pizza.emoji} size="md" animated={true} />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-white mb-1">{pizza.name}</h3>
                                                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{pizza.description}</p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4 text-sm">
                                                            <span className="flex items-center gap-1 text-gray-300">
                                                                ⭐ <strong className="text-white">{pizza.rating}</strong> ({pizza.reviews}{" "}
                                                                {currentLocale === "es" ? "reseñas" : currentLocale === "fr" ? "avis" : "reviews"})
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-green-400">{pizza.price}</div>
                                                            <div className="text-xs text-gray-400">
                                                                {currentLocale === "es" ? "por pizza" : currentLocale === "fr" ? "par pizza" : "per pizza"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 mt-4">
                                                <Link
                                                    to={routeTo("pizza_detail", { pizzaType: pizzaId })}
                                                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 text-center font-medium text-sm shadow-md hover:shadow-lg"
                                                >
                                                    🍕 {currentLocale === "es" ? "Ver Detalles" : currentLocale === "fr" ? "Voir Détails" : "View Details"}
                                                </Link>
                                                <Link
                                                    to={routeTo("pizza_review_list", { pizzaType: pizzaId })}
                                                    className="bg-orange-900 text-orange-200 px-4 py-2 rounded-lg hover:bg-orange-800 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                                                >
                                                    💬 {pizza.reviews} {currentLocale === "es" ? "Reseñas" : currentLocale === "fr" ? "Avis" : "Reviews"}
                                                </Link>
                                                <button className="bg-green-900 text-green-200 px-4 py-2 rounded-lg hover:bg-green-800 transition-colors text-sm font-medium shadow-sm hover:shadow-md">
                                                    🛒 {currentLocale === "es" ? "Ordenar" : currentLocale === "fr" ? "Commander" : "Order"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Call to Action Footer */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg text-center border border-gray-600">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    🎉{" "}
                                    {currentLocale === "es"
                                        ? "¿No encuentras tu pizza favorita?"
                                        : currentLocale === "fr"
                                        ? "Vous ne trouvez pas votre pizza préférée?"
                                        : "Can't find your favorite pizza?"}
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    {currentLocale === "es"
                                        ? "¡Nuestros chefs pueden crear algo especial solo para ti!"
                                        : currentLocale === "fr"
                                        ? "Nos chefs peuvent créer quelque chose de spécial juste pour vous!"
                                        : "Our chefs can create something special just for you!"}
                                </p>
                                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg">
                                    📞 {currentLocale === "es" ? "Contactar Chef" : currentLocale === "fr" ? "Contacter le Chef" : "Contact Chef"}
                                </button>
                            </div>
                        </div>
                    </PizzaSite>
                </Browser>

                <RouteInfoPanel />
            </div>
        </Layout>
    );
}
