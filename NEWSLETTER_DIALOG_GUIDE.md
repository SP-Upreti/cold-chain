# Newsletter Dialog Implementation Guide

## Overview
A newsletter subscription dialog that appears at the bottom-right corner when users first visit the website. The dialog respects user preferences and won't show again once they subscribe or close it.

## Features

### 1. **Smart Display Logic**
- Appears 2 seconds after page load
- Only shows on first visit
- Never shows again after subscription (permanent)
- Never shows again in the same session after closing (session-based)

### 2. **Storage Strategy**
- **localStorage**: Tracks permanent subscription status (`newsletter_subscribed`)
- **sessionStorage**: Tracks if user closed the dialog in current session (`newsletter_closed`)

### 3. **User Experience**
- Bottom-right positioning (non-intrusive)
- Smooth slide-in animation
- Mobile responsive
- Can be closed by:
  - Clicking "Maybe Later" button
  - Clicking outside the dialog
  - Pressing ESC key
  - Clicking the X button

## Files Created

### 1. Newsletter Dialog Component
**Location**: `src/components/dialog/newsletter-dialog.tsx`

Features:
- Form validation using Zod schema
- React Hook Form integration
- Toast notifications for feedback
- Animated border beam effect
- Responsive design

### 2. API Route
**Location**: `src/app/api/newsletter/subscribe/route.ts`

Handles:
- Email and name validation
- POST request processing
- Error handling
- Ready for backend integration

### 3. Layout Integration
**Location**: `src/app/layout.tsx`

The dialog is added to the root layout so it appears on all pages.

## How It Works

### Flow Diagram
```
User visits website
    ↓
Check localStorage for 'newsletter_subscribed'
    ↓
Check sessionStorage for 'newsletter_closed'
    ↓
If both are false → Show dialog after 2 seconds
    ↓
User Action:
├─ Subscribe → Save to localStorage → Never show again
├─ Close → Save to sessionStorage → Don't show this session
└─ Ignore → Dialog remains visible
```

## Integration with Backend

To connect to your actual backend, update the API route:

```typescript
// src/app/api/newsletter/subscribe/route.ts

// Replace the TODO section with your backend call:
const response = await fetch('YOUR_BACKEND_API_URL/newsletter/subscribe', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY' // if needed
  },
  body: JSON.stringify({ email, name })
})

if (!response.ok) {
  throw new Error('Failed to subscribe')
}
```

## Customization

### Change Display Timing
```typescript
// In newsletter-dialog.tsx, line ~35
const timer = setTimeout(() => {
  setIsOpen(true)
}, 2000) // Change this value (in milliseconds)
```

### Change Position
```typescript
// In newsletter-dialog.tsx, DialogContent className
// Current: bottom-4 right-4
// Options:
// - Top right: top-4 right-4
// - Bottom left: bottom-4 left-4
// - Top left: top-4 left-4
```

### Modify Form Fields
Add more fields in the schema and form:

```typescript
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  // Add more fields:
  phone: z.string().optional(),
  interests: z.array(z.string()).optional(),
})
```

## Testing

### Test Scenarios

1. **First Visit**
   - Clear browser storage
   - Refresh page
   - Dialog should appear after 2 seconds

2. **After Closing**
   - Close the dialog
   - Refresh page in same tab
   - Dialog should NOT appear
   - Open new tab → Dialog SHOULD appear

3. **After Subscribing**
   - Subscribe with valid email
   - Refresh page
   - Dialog should NOT appear
   - Even in new tabs/windows

### Clear Storage (for testing)
```javascript
// Run in browser console:
localStorage.removeItem('newsletter_subscribed')
sessionStorage.removeItem('newsletter_closed')
```

## Styling

The dialog uses:
- Tailwind CSS for styling
- Radix UI Dialog primitives
- Border Beam animation effect
- Responsive breakpoints (sm:, md:)

## Dependencies Used

- `@radix-ui/react-dialog` - Dialog component
- `react-hook-form` - Form management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod integration
- `sonner` - Toast notifications
- `@iconify/react` - Icons

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires localStorage and sessionStorage support
- Mobile responsive

## Future Enhancements

Potential improvements:
- Add email verification
- Integrate with email marketing services (Mailchimp, SendGrid)
- Add preference center (frequency, topics)
- A/B testing different copy/designs
- Analytics tracking
- GDPR compliance features
