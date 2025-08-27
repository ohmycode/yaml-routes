import React from "react";
import { useLocale } from "./LocaleContext";
import * as m from "../paraglide/messages.js";

/**
 * Demo component to showcase instant language switching
 * Updates all text content immediately when locale changes
 */
export function LanguageSwitchDemo() {
    const { currentLocale } = useLocale();

    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-6">
            <h3 className="text-xl font-semibold mb-4">🌍 Language Switching Demo</h3>

            <div className="grid gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-medium text-gray-700 mb-2">Current Content:</h4>
                    <ul className="space-y-2">
                        <li>
                            <strong>Home:</strong> {m["nav.home"]()}
                        </li>
                        <li>
                            <strong>About:</strong> {m["nav.about"]()}
                        </li>
                        <li>
                            <strong>Products:</strong> {m["nav.products"]()}
                        </li>
                        <li>
                            <strong>Settings:</strong> {m["nav.settings"]()}
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-medium text-gray-700 mb-2">Page Content:</h4>
                    <p className="text-gray-600">{m["page.home.description"]()}</p>
                </div>

                <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm">
                        <strong>Active Locale:</strong> <code>{currentLocale}</code>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Content updates instantly when you switch languages using the buttons above! No page reload needed.
                    </p>
                </div>
            </div>
        </div>
    );
}
