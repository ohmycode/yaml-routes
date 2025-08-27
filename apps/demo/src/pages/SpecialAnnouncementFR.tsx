export default function SpecialAnnouncementFR() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">🎉 Annonce Spéciale</h1>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Contenu spécifique au français</h2>
                    <p className="text-lg mb-4">
                        Ceci est la version française de la page d'annonce spéciale. Cela démontre comment vous pouvez avoir des composants complètement
                        différents pour différentes langues.
                    </p>
                    <p className="text-gray-600">
                        Parfait lorsque vous devez afficher du contenu culturellement spécifique, des mises en page différentes, ou des stratégies de messagerie
                        entièrement différentes par locale.
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">Implémentation technique</h3>
                    <p className="text-sm text-gray-600">
                        Cette page utilise le composant <code className="bg-gray-100 px-2 py-1 rounded">pages/SpecialAnnouncementFR</code>
                        pour les utilisateurs français, tandis que les utilisateurs anglais voient{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">pages/SpecialAnnouncementEN</code>
                        et les utilisateurs espagnols voient <code className="bg-gray-100 px-2 py-1 rounded">pages/SpecialAnnouncementES</code>.
                    </p>
                </div>
            </div>
        </div>
    );
}
