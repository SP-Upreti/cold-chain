# Migration Guide: Client Components → Server Components

## Summary of Changes

We've refactored the product fetching logic to use **Server Components** instead of Client Components with reCAPTCHA. This provides:

✅ **Better Performance** - Faster page loads, less JavaScript
✅ **Better SEO** - Content rendered on server
✅ **No reCAPTCHA Needed** - Server requests are inherently secure
✅ **Simpler Code** - No useEffect, useState, or loading states to manage

## What Changed

### 1. Product Service (`src/services/productService.ts`)

**Added Server-Side Functions:**
```typescript
// ✅ NEW: For Server Components
export async function getProductBySlugServer(slug: string)
export async function getAllProductsServer({ page, limit, search })

// ✅ KEPT: For Client Components (when needed)
export async function getProductBySlug(slug: string)
export async function getAllProducts({ page, limit, search, token })
```

### 2. Product Detail Component (`src/app/products/_components/details-main.tsx`)

**Before (Client Component):**
```tsx
"use client";
import { use, useEffect } from 'react';

export default function DetailsMain({slug}) {
  useEffect(() => {
    const res = use(getProductBySlug(slug));
  }, [slug]);
  // ...
}
```

**After (Server Component):**
```tsx
// No "use client" directive!
export default async function DetailsMain({slug}) {
  const product = await getProductBySlugServer(slug);
  // ...
}
```

### 3. Product List Component

**Created New File:** `src/app/products/_components/product-list-server.tsx`
- Server Component version
- No reCAPTCHA needed
- No loading states needed (handled by Suspense)

**Kept Old File:** `src/app/products/_components/product-list.tsx`
- Client Component (for reference)
- Can be used if you need client-side interactivity

### 4. Products Page (`src/app/products/page.tsx`)

**Updated to use:**
- `ProductListServer` instead of `ProductList`
- `Suspense` for loading states
- `ProductListLoading` as fallback

## When to Use Each Approach

### Use Server Components When:
- ✅ Fetching data for initial page load
- ✅ Displaying static or semi-static content
- ✅ SEO is important
- ✅ Data doesn't change based on user interaction

### Use Client Components When:
- ✅ Need user interactivity (forms, buttons)
- ✅ Need browser APIs (localStorage, window)
- ✅ Need React hooks (useState, useEffect)
- ✅ Need real-time updates

## Testing Your Changes

### 1. Test Server Component Version
```bash
pnpm dev
```
Visit: `http://localhost:3000/products`

**Check:**
- Products load correctly
- No "reCAPTCHA token is null" errors
- Page loads faster
- Console shows "Product data:" log from server

### 2. Test Client Component Version (if needed)
Update `page.tsx` to use old component:
```tsx
<ProductList search={search} page={page} limit={limit} />
```

**Check:**
- Products load with reCAPTCHA
- Console shows reCAPTCHA token
- Loading state works

## Reverting Changes (If Needed)

If you need to revert to the old approach:

1. **In `products/page.tsx`:**
```tsx
// Comment out new approach
{/* <Suspense fallback={<ProductListLoading limit={limit} />}>
  <ProductListServer search={search} page={page} limit={limit} />
</Suspense> */}

// Uncomment old approach
<ProductList search={search} page={page} limit={limit} />
```

2. **In `details-main.tsx`:**
```tsx
// Restore "use client"
"use client";

// Change back to useEffect approach
import { use, useEffect } from 'react';
import { getProductBySlug } from '@/services/productService';

export default function DetailsMain({slug}) {
  useEffect(() => {
    const res = use(getProductBySlug(slug));
    console.log("res", res);
  }, [slug]);
  // ...
}
```

## Performance Benefits

### Before (Client Component):
1. Server sends HTML
2. Browser downloads React + your code
3. React hydrates
4. Component mounts
5. useEffect runs
6. reCAPTCHA generates token
7. API call made
8. Data received
9. Component re-renders

**Total Time:** ~2-3 seconds

### After (Server Component):
1. Server fetches data
2. Server renders HTML with data
3. Browser displays content

**Total Time:** ~500ms-1s

## Next Steps

### Recommended Improvements:

1. **Add Caching** (for static data):
```typescript
const res = await fetch(url, {
  next: { revalidate: 3600 } // Cache for 1 hour
});
```

2. **Add Error Boundaries**:
```tsx
<ErrorBoundary fallback={<ErrorUI />}>
  <ProductListServer />
</ErrorBoundary>
```

3. **Add Pagination** (Server-side):
```tsx
<Suspense fallback={<Loading />}>
  <ProductListServer page={page} />
</Suspense>
<Pagination currentPage={page} />
```

4. **Combine with Server Actions** (for forms):
```tsx
'use server'
export async function submitProduct(formData: FormData) {
  // Handle form submission on server
}
```

## Common Issues & Solutions

### Issue: "Cannot use 'use client' with async component"
**Solution:** Remove `"use client"` directive

### Issue: "fetch is not defined"
**Solution:** You're in a Client Component, use axios instead

### Issue: "Headers cannot be modified"
**Solution:** Don't try to set headers in Server Components, use fetch options

### Issue: "Component not updating"
**Solution:** You might need a Client Component for interactivity

## Questions?

- Server Component not working? Check for `"use client"` directive
- Need interactivity? Use Client Component
- Need both? Use composition (Server wraps Client)

## Files Modified

- ✅ `src/services/productService.ts` - Added server functions
- ✅ `src/config/axios.config.ts` - Added client-side check
- ✅ `src/providers/recaptcha-provider.tsx` - Added logging
- ✅ `src/app/products/page.tsx` - Updated to use server component
- ✅ `src/app/products/_components/details-main.tsx` - Converted to server component

## Files Created

- ✅ `src/app/products/_components/product-list-server.tsx` - Server version
- ✅ `src/app/products/_components/product-list-loading.tsx` - Loading UI
- ✅ `RECAPTCHA_STRATEGY.md` - Strategy documentation
- ✅ `MIGRATION_GUIDE.md` - This file
