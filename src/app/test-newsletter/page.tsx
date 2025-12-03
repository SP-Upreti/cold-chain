"use client"

import { Button } from "@/components/ui/button"

export default function TestNewsletterPage() {
    const clearStorage = () => {
        localStorage.removeItem('newsletter_subscribed')
        sessionStorage.removeItem('newsletter_closed')
        alert('Storage cleared! Refresh the page to see the newsletter dialog.')
    }

    const checkStorage = () => {
        const subscribed = localStorage.getItem('newsletter_subscribed')
        const closed = sessionStorage.getItem('newsletter_closed')

        alert(`
Newsletter Status:
- Subscribed: ${subscribed || 'No'}
- Closed this session: ${closed || 'No'}
    `)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">Newsletter Dialog Test Page</h1>
                    <p className="text-muted-foreground">
                        Use this page to test the newsletter dialog functionality
                    </p>
                </div>

                <div className="bg-card border rounded-lg p-6 space-y-4">
                    <h2 className="text-2xl font-semibold">Test Instructions</h2>

                    <div className="space-y-3 text-sm">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <h3 className="font-semibold mb-2">✅ Expected Behavior:</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Dialog appears 2 seconds after page load (first visit)</li>
                                <li>Dialog appears at bottom-right corner</li>
                                <li>After closing: won&apos;t show again in same session</li>
                                <li>After subscribing: won&apos;t show again ever</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                            <h3 className="font-semibold mb-2">🧪 Test Scenarios:</h3>
                            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                                <li>Clear storage and refresh → Dialog should appear</li>
                                <li>Close dialog and refresh → Dialog should NOT appear</li>
                                <li>Open new tab → Dialog SHOULD appear</li>
                                <li>Subscribe and refresh → Dialog should NOT appear</li>
                                <li>Subscribe and open new tab → Dialog should NOT appear</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={clearStorage}
                        className="flex-1"
                        variant="default"
                    >
                        Clear Storage & Reset
                    </Button>

                    <Button
                        onClick={checkStorage}
                        className="flex-1"
                        variant="outline"
                    >
                        Check Current Status
                    </Button>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">💡 Developer Tips:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Open DevTools → Application → Storage to view localStorage/sessionStorage</li>
                        <li>Use incognito mode for clean testing</li>
                        <li>Check Network tab to see API calls when subscribing</li>
                        <li>Console will log subscription attempts</li>
                    </ul>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    <p>Navigate to any other page to test the dialog in normal flow</p>
                </div>
            </div>
        </div>
    )
}
