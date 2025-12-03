# reCAPTCHA Strategy for Next.js App Router

## Overview
This document explains the reCAPTCHA implementation strategy for our Next.js application using App Router with Server and Client Components.

## Architecture

### 1. **Server Components (Recommended for Data Fetching)**
✅ **Use for:** Initial page loads, SEO-friendly content, static data
✅ **Benefits:** 
- No reCAPTCHA needed (requests come from your server)
- Better performance (data fetched on server)
- Better SEO
- Reduced JavaScript bundle size
- No hydration issues

**Example:**
```typescript
// app/products/[slug]/page.tsx
export default async function ProductPage({ params }) {
  const { slug } = await params;
  
  // Server-side fetch - NO reCAPTCHA needed
  const product = await getProductBySlugServer(slug);
  
  return <ProductDetails product={product} />;
}
```

### 2. **Client Components with reCAPTCHA**
✅ **Use for:** User interactions, forms, mutations
✅ **When reCAPTCHA is needed:**
- Form submissions
- User-triggered API calls
- Search/filter interactions

**Example:**
```typescript
"use client"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const handleSubmit = async (data) => {
    if (!executeRecaptcha) return;
    
    const token = await executeRecaptcha('contact_form');
    await submitForm({ ...data, recaptchaToken: token });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 3. **Server Actions (Best for Forms)**
✅ **Use for:** Form submissions without client-side JavaScript
✅ **Benefits:**
- Works without JavaScript enabled
- Progressive enhancement
- Built-in form validation

**Example:**
```typescript
// app/actions/contact.ts
'use server'

export async function submitContact(formData: FormData) {
  const recaptchaToken = formData.get('recaptchaToken');
  
  // Verify reCAPTCHA on server
  const isValid = await verifyRecaptcha(recaptchaToken);
  if (!isValid) throw new Error('Invalid reCAPTCHA');
  
  // Process form...
}
```

## Implementation Guide

### Service Layer Pattern

```typescript
// services/productService.ts

// ✅ Server-side (for Server Components)
export async function getProductsServer(params) {
  const res = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' }
  });
  return res.json();
}

// ✅ Client-side (for Client Components with reCAPTCHA)
export async function getProductsClient(params) {
  // reCAPTCHA token added via axios interceptor
  const res = await api.get('/products', { params });
  return res.data;
}
```

### Axios Configuration

```typescript
// config/axios.config.ts

api.interceptors.request.use(async (config) => {
  // Only add reCAPTCHA on client-side
  if (typeof window !== 'undefined') {
    const token = await recaptchaTokenManager.getToken();
    if (token) {
      config.headers['x-recaptcha-token'] = token;
    }
  }
  return config;
});
```

## Best Practices

### ✅ DO
- Use Server Components for initial data fetching
- Use Server Actions for form submissions
- Only use Client Components when necessary (interactivity)
- Keep reCAPTCHA in Client Components only
- Verify reCAPTCHA tokens on the server/backend

### ❌ DON'T
- Don't use reCAPTCHA in Server Components
- Don't fetch data client-side if you can do it server-side
- Don't add reCAPTCHA to every request (only user actions)
- Don't trust client-side reCAPTCHA verification

## When to Use Each Approach

| Scenario | Approach | reCAPTCHA? |
|----------|----------|------------|
| Product listing page | Server Component | ❌ No |
| Product detail page | Server Component | ❌ No |
| Search with filters | Client Component | ✅ Yes (optional) |
| Contact form | Client Component or Server Action | ✅ Yes |
| Newsletter signup | Client Component or Server Action | ✅ Yes |
| Add to cart | Client Component | ✅ Yes (optional) |
| Static content | Server Component | ❌ No |

## Migration Guide

### From Client Component to Server Component

**Before (Client):**
```tsx
"use client"
import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  
  return <div>{/* render */}</div>;
}
```

**After (Server):**
```tsx
// No "use client"
export default async function Products() {
  const products = await getProductsServer();
  
  return <div>{/* render */}</div>;
}
```

## Security Considerations

1. **Always verify reCAPTCHA on the server** - Never trust client verification
2. **Use appropriate score thresholds** - v3 scores range 0.0-1.0 (0.5 is common threshold)
3. **Rate limiting** - Combine with rate limiting for better security
4. **Environment variables** - Keep secret keys in `.env` files
5. **CORS** - Configure proper CORS policies for your API

## Performance Tips

1. **Server Components** are faster - less JavaScript, faster page loads
2. **Cache strategically** - Use `cache: 'force-cache'` for static data
3. **Revalidate** - Use ISR with `revalidate` for dynamic data
4. **Parallel fetching** - Fetch multiple resources in parallel on server
5. **Streaming** - Use React Suspense for progressive rendering

## Troubleshooting

**Issue: "reCAPTCHA token is null"**
- ✅ Check if component has `"use client"` directive
- ✅ Verify RecaptchaProvider wraps the app
- ✅ Check if using server-side function client-side
- ✅ Ensure reCAPTCHA script loaded (check Network tab)

**Issue: "reCAPTCHA verification failed"**
- ✅ Verify site key matches domain
- ✅ Check secret key on backend
- ✅ Ensure token is passed correctly
- ✅ Token expires after 2 minutes - generate fresh

**Issue: "TypeError: Cannot read property 'executeRecaptcha'"**
- ✅ Check RecaptchaProvider is in layout
- ✅ Use `useGoogleReCaptcha` in Client Components only
- ✅ Wait for executeRecaptcha to be defined before using
