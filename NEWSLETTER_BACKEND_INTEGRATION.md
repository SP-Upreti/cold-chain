# Newsletter Backend Integration Examples

## Overview
This guide shows how to integrate the newsletter dialog with various backend services and email marketing platforms.

## Option 1: Custom Backend API

### Update API Route
```typescript
// src/app/api/newsletter/subscribe/route.ts

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

    // Call your backend API
    const response = await fetch('https://your-backend.com/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
      },
      body: JSON.stringify({ email, name, timestamp: new Date().toISOString() })
    })

    if (!response.ok) {
      throw new Error('Backend API failed')
    }

    const data = await response.json()

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        success: true,
        data 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
```

### Environment Variables
```env
# .env.local
BACKEND_API_KEY=your_api_key_here
BACKEND_API_URL=https://your-backend.com/api
```

## Option 2: Mailchimp Integration

### Install Mailchimp SDK
```bash
npm install @mailchimp/mailchimp_marketing
# or
pnpm add @mailchimp/mailchimp_marketing
```

### Update API Route
```typescript
// src/app/api/newsletter/subscribe/route.ts

import { NextRequest, NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1'
})

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name.split(' ')[0],
          LNAME: name.split(' ').slice(1).join(' ') || '',
        },
      }
    )

    return NextResponse.json(
      { message: 'Successfully subscribed!', success: true },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Mailchimp error:', error)
    
    if (error.status === 400 && error.title === 'Member Exists') {
      return NextResponse.json(
        { message: 'This email is already subscribed.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
```

### Environment Variables
```env
# .env.local
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your_audience_id
```

## Option 3: SendGrid Integration

### Install SendGrid SDK
```bash
npm install @sendgrid/mail
# or
pnpm add @sendgrid/mail
```

### Update API Route
```typescript
// src/app/api/newsletter/subscribe/route.ts

import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    // Add to SendGrid Marketing Contacts
    const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contacts: [
          {
            email,
            first_name: name.split(' ')[0],
            last_name: name.split(' ').slice(1).join(' ') || '',
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error('SendGrid API failed')
    }

    // Optional: Send welcome email
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Welcome to Our Newsletter!',
      text: `Hi ${name}, thank you for subscribing to our newsletter!`,
      html: `<p>Hi ${name},</p><p>Thank you for subscribing to our newsletter!</p>`,
    })

    return NextResponse.json(
      { message: 'Successfully subscribed!', success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('SendGrid error:', error)
    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
```

### Environment Variables
```env
# .env.local
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

## Option 4: Database Storage (Prisma Example)

### Install Prisma
```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

### Define Schema
```prisma
// prisma/schema.prisma

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  active    Boolean  @default(true)
}
```

### Update API Route
```typescript
// src/app/api/newsletter/subscribe/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { message: 'This email is already subscribed.' },
        { status: 400 }
      )
    }

    // Create new subscriber
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        name,
      }
    })

    return NextResponse.json(
      { 
        message: 'Successfully subscribed!', 
        success: true,
        subscriber: { id: subscriber.id, email: subscriber.email }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
```

## Option 5: Supabase Integration

### Install Supabase Client
```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

### Create Table
```sql
-- In Supabase SQL Editor
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);

-- Add RLS policies if needed
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
```

### Update API Route
```typescript
// src/app/api/newsletter/subscribe/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, name }])
      .select()

    if (error) {
      if (error.code === '23505') { // Unique violation
        return NextResponse.json(
          { message: 'This email is already subscribed.' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!', success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Supabase error:', error)
    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
```

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Testing Your Integration

### Using cURL
```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### Using Postman
1. Method: POST
2. URL: `http://localhost:3000/api/newsletter/subscribe`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "email": "test@example.com",
  "name": "Test User"
}
```

## Error Handling Best Practices

```typescript
// Enhanced error handling
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    // Validation
    if (!email || !name) {
      return NextResponse.json(
        { message: 'Email and name are required', field: 'validation' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format', field: 'email' },
        { status: 400 }
      )
    }

    // Your integration code here...

  } catch (error: any) {
    // Log error for debugging
    console.error('Newsletter subscription error:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })

    // Return user-friendly error
    return NextResponse.json(
      { 
        message: 'An unexpected error occurred. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
```

## Security Considerations

1. **Rate Limiting**: Add rate limiting to prevent abuse
2. **CAPTCHA**: Consider adding reCAPTCHA for bot protection
3. **Email Verification**: Send confirmation emails
4. **Data Validation**: Always validate on server-side
5. **API Keys**: Never expose API keys in client-side code
6. **CORS**: Configure CORS properly if needed
7. **HTTPS**: Always use HTTPS in production

## Next Steps

1. Choose your preferred integration method
2. Set up environment variables
3. Test thoroughly in development
4. Add error logging/monitoring (Sentry, LogRocket, etc.)
5. Set up email templates
6. Configure unsubscribe functionality
7. Add analytics tracking
8. Ensure GDPR/privacy compliance
