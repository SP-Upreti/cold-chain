# Newsletter Dialog - Quick Start

## ✅ What Was Created

1. **Newsletter Dialog Component** (`src/components/dialog/newsletter-dialog.tsx`)
   - Bottom-right positioned dialog
   - Appears 2 seconds after page load
   - Form with name and email fields
   - Smart display logic with localStorage/sessionStorage

2. **API Route** (`src/app/api/newsletter/subscribe/route.ts`)
   - Handles POST requests to `/api/newsletter/subscribe`
   - Validates email and name
   - Ready for backend integration

3. **Layout Integration** (`src/app/layout.tsx`)
   - Dialog added to root layout
   - Appears on all pages

4. **Test Page** (`src/app/test-newsletter/page.tsx`)
   - Visit `/test-newsletter` to test functionality
   - Includes storage management tools

## 🚀 How to Test

### Quick Test:
1. Start your dev server: `npm run dev` or `pnpm dev`
2. Visit `http://localhost:3000`
3. Wait 2 seconds - dialog should appear at bottom-right
4. Try subscribing with: `ac166001@gmail.com` and `Aditya Chaudhary`

### Detailed Testing:
1. Visit `http://localhost:3000/test-newsletter`
2. Use the "Clear Storage & Reset" button
3. Refresh the page
4. Dialog should appear after 2 seconds

## 🎯 User Behavior

| Action | Result |
|--------|--------|
| First visit | Dialog appears after 2 seconds |
| Close dialog | Won't show again in same session |
| Subscribe | Won't show again ever (stored in localStorage) |
| New tab (after closing) | Dialog appears again |
| New tab (after subscribing) | Dialog does NOT appear |

## 🔧 Backend Integration

Update `src/app/api/newsletter/subscribe/route.ts`:

```typescript
// Replace the TODO section with your actual API call
const response = await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, name })
})
```

## 📝 Storage Keys

- `localStorage.newsletter_subscribed` - Permanent subscription flag
- `sessionStorage.newsletter_closed` - Session-based close flag

## 🎨 Customization

### Change timing (in `newsletter-dialog.tsx`):
```typescript
setTimeout(() => setIsOpen(true), 2000) // Change 2000 to desired ms
```

### Change position (in `newsletter-dialog.tsx` DialogContent className):
```typescript
// Current: bottom-4 right-4
// Options: top-4, bottom-4, left-4, right-4
```

## 📱 Features

- ✅ Mobile responsive
- ✅ Form validation (Zod + React Hook Form)
- ✅ Toast notifications
- ✅ Animated border effect
- ✅ Smooth slide-in animation
- ✅ ESC key to close
- ✅ Click outside to close
- ✅ Session management
- ✅ Permanent subscription tracking

## 🐛 Troubleshooting

**Dialog not appearing?**
- Check browser console for errors
- Clear localStorage and sessionStorage
- Verify you're waiting 2 seconds after page load

**Dialog appearing every time?**
- Check if localStorage is enabled in browser
- Verify subscription is completing successfully
- Check Network tab for API response

**Styling issues?**
- Ensure Tailwind CSS is properly configured
- Check if `tw-animate-css` is installed
- Verify Radix UI Dialog is installed

## 📚 Documentation

See `NEWSLETTER_DIALOG_GUIDE.md` for detailed documentation.
