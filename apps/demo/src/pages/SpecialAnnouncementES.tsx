export default function SpecialAnnouncementES() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">🎉 Anuncio Especial</h1>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Contenido específico para español</h2>
                    <p className="text-lg mb-4">
                        Esta es la versión en español de la página de anuncio especial. Esto demuestra cómo puedes tener componentes completamente diferentes
                        para diferentes idiomas.
                    </p>
                    <p className="text-gray-600">
                        Perfecto para cuando necesitas mostrar contenido culturalmente específico, diseños diferentes, o estrategias de mensajería completamente
                        diferentes por localización.
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">Implementación técnica</h3>
                    <p className="text-sm text-gray-600">
                        Esta página usa el componente <code className="bg-gray-100 px-2 py-1 rounded">pages/SpecialAnnouncementES</code>
                        para usuarios españoles, mientras que los usuarios ingleses ven{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">pages/SpecialAnnouncementEN</code>y los usuarios franceses ven{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">pages/SpecialAnnouncementFR</code>.
                    </p>
                </div>
            </div>
        </div>
    );
}
