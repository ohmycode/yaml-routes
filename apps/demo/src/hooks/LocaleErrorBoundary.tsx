import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * Error boundary specifically for locale-related errors
 * Provides graceful fallback when language switching fails
 */
export class LocaleErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Locale Error Boundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
                    <h3 className="text-red-800 font-semibold mb-2">Language Error</h3>
                    <p className="text-red-600 text-sm">There was an issue with language switching. Please refresh the page.</p>
                    <button onClick={() => window.location.reload()} className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
