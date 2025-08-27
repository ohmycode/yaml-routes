export default function SpecialAnnouncementEN() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">🎉 Special Announcement</h1>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">English-specific Content</h2>
                    <p className="text-lg mb-4">
                        This is the English version of the special announcement page. This demonstrates how you can have completely different components for
                        different languages.
                    </p>
                    <p className="text-gray-600">
                        Perfect for when you need to display culturally-specific content, different layouts, or entirely different messaging strategies per
                        locale.
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">Technical Implementation</h3>
                    <p className="text-sm text-gray-600">
                        This page uses <code className="bg-gray-100 px-2 py-1 rounded">pages/SpecialAnnouncementEN</code> component for English users, while
                        French users see <code className="bg-gray-100 px-2 py-1 rounded">pages/SpecialAnnouncementFR</code>
                        and Spanish users see <code className="bg-gray-100 px-2 py-1 rounded">pages/SpecialAnnouncementES</code>.
                    </p>
                </div>
            </div>
        </div>
    );
}
