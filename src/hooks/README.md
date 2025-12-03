# Custom React Hooks

This directory contains optimized custom React hooks for the application.

## Available Hooks

### `useSearch`
Manages search functionality with debouncing and API integration.

```tsx
const {
  searchQuery,
  searchResults,
  isSearching,
  handleSearchChange,
  navigateToResults,
  clearSearch,
} = useSearch({
  debounceMs: 300,
  limit: 5,
});
```

**Options:**
- `debounceMs` - Debounce delay in milliseconds (default: 300)
- `limit` - Maximum number of results (default: 5)
- `onSearchStart` - Callback when search starts
- `onSearchComplete` - Callback when search completes

---

### `useModal`
Manages modal state with keyboard and click-outside handling.

```tsx
const {
  isOpen,
  open,
  close,
  toggle,
  modalRef,
} = useModal({
  closeOnEscape: true,
  closeOnOutsideClick: true,
  preventBodyScroll: true,
  onOpen: () => console.log('opened'),
  onClose: () => console.log('closed'),
});
```

**Options:**
- `onOpen` - Callback when modal opens
- `onClose` - Callback when modal closes
- `closeOnEscape` - Close on ESC key (default: true)
- `closeOnOutsideClick` - Close on outside click (default: true)
- `preventBodyScroll` - Prevent body scroll when open (default: true)

---

### `useScrollVisibility`
Manages navbar visibility based on scroll direction.

```tsx
const isVisible = useScrollVisibility({
  threshold: 50,
  hideThreshold: 100,
});
```

**Options:**
- `threshold` - Scroll position to show navbar (default: 50)
- `hideThreshold` - Scroll position to start hiding (default: 100)

---

### `useMediaQuery`
Responsive media query hook with SSR support.

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
```

---

### `useMousePositionRef`
Tracks mouse/touch position with performance optimization.

```tsx
const positionRef = useMousePositionRef(containerRef);
// Access position: positionRef.current.x, positionRef.current.y
```

---

### `usePageTransition`
GSAP-powered page transitions.

```tsx
const { navigateWithTransition, isTransitioning } = usePageTransition();

navigateWithTransition('/about', () => {
  console.log('Transition started');
});
```

---

### `useRecaptchaReady` & `useRecaptchaToken`
Google reCAPTCHA integration hooks.

```tsx
const isReady = useRecaptchaReady();
const { getToken } = useRecaptchaToken();

const token = await getToken('submit');
```

---

### `useAuth`
Authentication state management.

```tsx
const { user, loading, isAdmin, isSudoAdmin, isAuthenticated } = useAuth();
```

## Optimization Features

All hooks include:
- ✅ Memoized callbacks with `useCallback`
- ✅ Passive event listeners for better performance
- ✅ RequestAnimationFrame for scroll handling
- ✅ Proper cleanup on unmount
- ✅ SSR/hydration safety
- ✅ TypeScript support
