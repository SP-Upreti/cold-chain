import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, name } = body

        // Validate input
        if (!email || !name) {
            return NextResponse.json(
                { message: 'Email and name are required' },
                { status: 400 }
            )
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Here you would typically:
        // 1. Save to your database
        // 2. Send to your email marketing service (Mailchimp, SendGrid, etc.)
        // 3. Send a confirmation email

        // For now, we'll just log it and return success
        console.log('Newsletter subscription:', { email, name, timestamp: new Date().toISOString() })

        // TODO: Integrate with your backend API or email service
        // Example:
        // await fetch('YOUR_BACKEND_API/newsletter/subscribe', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, name })
        // })

        return NextResponse.json(
            {
                message: 'Successfully subscribed to newsletter',
                success: true
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Newsletter subscription error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
