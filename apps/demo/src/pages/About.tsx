import * as m from "../paraglide/messages.js";

export default function About() {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{m["page.about.title"]()}</h1>
            <p className="text-lg text-gray-600 mb-4">{m["page.about.description"]()}</p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h2 className="text-lg font-semibold">I18n Routes:</h2>
                <ul className="mt-2 space-y-1">
                    <li>
                        English: <code>/about</code>
                    </li>
                    <li>
                        French: <code>/a-propos</code>
                    </li>
                    <li>
                        Spanish: <code>/acerca-de</code>
                    </li>
                </ul>
            </div>
        </div>
    );
}
