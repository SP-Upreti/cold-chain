# Build Error Fix - Rate Limiting (429 Error)

## Problem
The build was failing with a 429 (Too Many Requests) error when trying to fetch brand data during static generation. This happened because Next.js was making too many concurrent API calls to your backend during the build process.

## Root Cause
- The brand pages were using `cache: 'no-store'` which prevented caching
- Multiple brand pages were being built simultaneously
- Each page was making fresh API calls without any rate limiting protection
- The backend API was rate limiting these requests

## Solutions Implemented

### 1. Added Request Caching (Primary Fix)
**File**: `src/services/brandService.ts`

Changed from:
```typescript
cache: 'no-store'
```

To:
```typescript
next: { revalidate: 3600 } // Cache for 1 hour
```

This ensures:
- API responses are cached for 1 hour
- Reduces API calls during build
- Subsequent builds reuse cached data
- Pages are revalidated every hour in production

### 2. Added Page-Level Revalidation
**Files**: 
- `src/app/brand/page.tsx`
- `src/app/brand/[slug]/page.tsx`

Added:
```typescript
export const revalidate = 3600; // Revalidate every hour
```

This tells Next.js to:
- Cache the entire page for 1 hour
- Regenerate the page in the background after 1 hour
- Serve cached version while regenerating

### 3. Added Error Handling
**File**: `src/app/brand/page.tsx`

```typescript
let brands: IBrand[] = [];

try {
  const response = await fetchBrandsServer();
  brands = response?.data?.brands || [];
} catch (error) {
  console.error('Error fetching brands:', error);
  // Return empty array on error
}
```

This ensures:
- Build doesn't fail if API is temporarily unavailable
- Graceful fallback to empty state
- Error is logged for debugging

### 4. Reduced Build Concurrency
**File**: `next.config.ts`

Added:
```typescript
experimental: {
  workerThreads: false,
  cpus: 1
}
```

This:
- Reduces concurrent API calls during build
- Prevents overwhelming the API with requests
- Slower build but more reliable

## Testing the Fix

### 1. Clean Build
```bash
# Remove build cache
rm -rf .next

# Run build
pnpm run build
```

### 2. Check Build Output
Look for:
- ✅ No 429 errors
- ✅ All brand pages build successfully
- ✅ Build completes without errors

### 3. Verify Caching
```bash
# First build (should hit API)
pnpm run build

# Second build immediately after (should use cache)
pnpm run build
```

Second build should be faster as it uses cached data.

## Alternative Solutions (If Issue Persists)

### Option 1: Increase API Rate Limits
Contact your backend team to increase rate limits for build server IP.

### Option 2: Use Static Paths with Fallback
```typescript
// In src/app/brand/[slug]/page.tsx
export async function generateStaticParams() {
  // Only pre-render top 10 brands
  const response = await fetchBrandsServer();
  const brands = response?.data?.brands?.slice(0, 10) || [];
  
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export const dynamicParams = true; // Generate others on-demand
```

### Option 3: Add Retry Logic with Exponential Backoff
```typescript
async function fetchWithRetry(url: string, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 3600 }
      });
      
      if (res.ok) return res;
      
      if (res.status === 429 && i < retries - 1) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      
      throw new Error(`HTTP ${res.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}
```

### Option 4: Use ISR (Incremental Static Regeneration)
Already implemented with `revalidate: 3600`, but you can adjust:
- Lower value (e.g., 1800 = 30 minutes) for more frequent updates
- Higher value (e.g., 7200 = 2 hours) for less API load

## Monitoring

### Check Build Logs
```bash
pnpm run build 2>&1 | tee build.log
```

### Check for Rate Limit Errors
```bash
grep "429" build.log
grep "rate limit" build.log
```

### Monitor API Calls
Add logging to see how many API calls are made:
```typescript
console.log(`[API] Fetching brands at ${new Date().toISOString()}`);
```

## Production Considerations

### 1. CDN Caching
If using Vercel/Netlify, they add additional caching layers:
- Edge caching
- CDN caching
- Browser caching

### 2. On-Demand Revalidation
You can trigger revalidation manually:
```typescript
// In your CMS webhook or admin panel
await fetch('https://yoursite.com/api/revalidate?path=/brand');
```

### 3. Background Regeneration
With ISR, pages regenerate in the background:
- User always gets fast response (cached)
- Fresh data is generated asynchronously
- No user-facing delays

## Summary

The main fix is **adding caching** to reduce API calls during build. The combination of:
1. Request-level caching (`next: { revalidate: 3600 }`)
2. Page-level revalidation (`export const revalidate = 3600`)
3. Error handling (graceful fallbacks)
4. Reduced concurrency (fewer simultaneous requests)

Should resolve the 429 rate limiting errors during build.

## Next Steps

1. ✅ Try building again: `pnpm run build`
2. ✅ If successful, deploy to production
3. ✅ Monitor build times and API usage
4. ✅ Adjust cache duration if needed
5. ✅ Consider implementing retry logic if issues persist

## Related Files Modified

- ✅ `src/services/brandService.ts` - Added caching to API calls
- ✅ `src/app/brand/page.tsx` - Added revalidation and error handling
- ✅ `src/app/brand/[slug]/page.tsx` - Added revalidation
- ✅ `next.config.ts` - Reduced build concurrency
