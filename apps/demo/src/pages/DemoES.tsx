import { Link } from "@tanstack/react-router";
import { routeTo } from "../routeCache.generated";

export default function ExamplesES() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Ejemplos y Características</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">🎯 Ejemplos Interactivos</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Explora las características de YAML Routes con estos ejemplos interactivos.</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-3">🔗 Rutas Básicas</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Rutas simples con URLs limpias y navegación type-safe.</p>
                            <div className="space-y-2">
                                <Link
                                    to={routeTo("home")}
                                    className="block px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-center text-sm"
                                >
                                    Página Principal
                                </Link>
                                <Link
                                    to={routeTo("about")}
                                    className="block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-center text-sm"
                                >
                                    Acerca De
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-3">📄 Parámetros de Ruta</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Rutas dinámicas con manejo type-safe de parámetros.</p>
                            <div className="space-y-2">
                                <Link
                                    to={routeTo("user_profile", { id: "alice" })}
                                    className="block px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-center text-sm"
                                >
                                    Perfil de Usuario (alice)
                                </Link>
                                <Link
                                    to={routeTo("user_profile", { id: "demo-123" })}
                                    className="block px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-center text-sm"
                                >
                                    Perfil de Usuario (demo-123)
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🌐 Internacionalización</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Esta página demuestra componentes específicos por idioma. El mismo ID de ruta renderiza diferentes componentes basados en el idioma
                        actual.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">🇪🇸 Versión en Español</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Actualmente estás viendo la versión en español de esta página, que utiliza el componente{" "}
                            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">ExamplesES</code>.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="font-medium mb-1">Configuración de Ruta:</p>
                                <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                                    {`examples:
    path:
        en: /examples
        es: /ejemplos
    component:
        en: pages/ExamplesEN
        es: pages/ExamplesES`}
                                </pre>
                            </div>
                            <div>
                                <p className="font-medium mb-1">URLs Actuales:</p>
                                <ul className="space-y-1">
                                    <li>
                                        🇺🇸 Inglés: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">/examples</code>
                                    </li>
                                    <li>
                                        🇪🇸 Español: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">/es/ejemplos</code>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">💻 Ejemplos de Código</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Navegación Type-Safe</h3>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                                {`import { routeTo } from "./routeCache.generated";

// Ruta simple
const homeUrl = routeTo("home");

// Ruta con parámetros (TypeScript obliga parámetros requeridos)
const userUrl = routeTo("user_profile", { id: "123" });

// Enrutamiento consciente del idioma (usa automáticamente el idioma actual)
const aboutUrl = routeTo("about");

// Navegación
<Link to={userUrl}>Ver Perfil</Link>`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Seguridad de Tipos Generada</h3>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                                {`// Los tipos generados aseguran la seguridad de parámetros
routeTo("user_profile", { id: "123" });        // ✅ Válido
routeTo("user_profile", { userId: "123" });    // ❌ Error de TypeScript
routeTo("user_profile");                       // ❌ Falta parámetro requerido

// Soporte de IntelliSense para IDs de ruta
routeTo("user_prof|");  // Auto-completa a "user_profile"`}
                            </pre>
                        </div>
                    </div>
                </section>

                <section className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">✨ Por Qué Esto Importa</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2">🔒 Seguridad de Tipos</h3>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                <li>• Detecta errores de enrutamiento en tiempo de compilación</li>
                                <li>• Auto-completado para IDs de ruta</li>
                                <li>• Validación de parámetros</li>
                                <li>• Seguridad en refactoring</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">🌍 i18n Primero</h3>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                <li>• URLs localizadas por defecto</li>
                                <li>• Componentes por idioma</li>
                                <li>• URLs amigables para SEO</li>
                                <li>• Manejo automático de idiomas</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
