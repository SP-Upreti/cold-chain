# GSAP Page Transitions - Implementation Guide

Modern, creative, and unique page transitions using GSAP for your Next.js application.

## ✨ What's Been Added

1. **Creative Page Transition System** - Random stunning transitions between pages
2. **14 Unique Transition Variants** - From liquid to particles effects
3. **Magnetic Links** - Interactive hover effects with smooth transitions
4. **3D Card Links** - Perspective-based card flip animations
5. **Text Reveal Animations** - 6 different text animation styles
6. **Parallax Sections** - Smooth scroll-based parallax effects
7. **Stagger Animations** - Animate multiple elements in sequence
8. **Scroll Reveal Animations** - Elements animate as they enter viewport

## 🚀 Quick Start

### Already Configured

The basic page transition is already active in your app! Navigate between pages to see the slide transition effect.

### Using Transition Links

Replace your existing links with `PageTransitionLink`:

```tsx
// Before
import Link from 'next/link';
<Link href="/products">Products</Link>

// After
import PageTransitionLink from '@/components/transitions/page-transition-link';
<PageTransitionLink href="/products">Products</PageTransitionLink>
```

### Programmatic Navigation

```tsx
import { usePageTransition } from '@/hooks/use-page-transition';

function MyComponent() {
  const { navigateWithTransition } = usePageTransition();

  return (
    <button onClick={() => navigateWithTransition('/about')}>
      Go to About
    </button>
  );
}
```

## 🎨 Transition Variants

### Available Variants

**Basic Transitions:**
1. **slide** - Slides in from right
2. **fade** - Simple fade in/out
3. **scale** - Circular scale animation
4. **curtain** - Vertical curtain effect
5. **wipe** - Circular wipe transition

**Creative Transitions:**
6. **liquid** - Elastic liquid-like animation
7. **glitch** - Digital glitch effect
8. **morph** - Shape-morphing transition
9. **shatter** - Breaking glass effect
10. **spiral** - Rotating spiral animation
11. **wave** - Horizontal wave strips
12. **zoom** - Dramatic zoom effect
13. **flip** - 3D flip transition
14. **particles** - Grid particle explosion

**Special:**
- **random** - Randomly selects a creative transition each time

### Using Different Variants

To use a different variant for specific routes, create a layout file:

```tsx
// src/app/products/layout.tsx
import AdvancedPageTransition from '@/components/transitions/advanced-page-transition';

export default function ProductsLayout({ children }) {
  return (
    <AdvancedPageTransition variant="curtain">
      {children}
    </AdvancedPageTransition>
  );
}
```

## 📦 Components Reference

### CreativePageTransition
Creative page transition with random effects (already in root layout)
```tsx
<CreativePageTransition variant="random" colorScheme="gradient">
  {children}
</CreativePageTransition>
```

### PageTransitionLink
Basic link component with transition animation
```tsx
<PageTransitionLink href="/path" className="...">
  Link Text
</PageTransitionLink>
```

### MagneticLink
Interactive link with magnetic hover effect
```tsx
<MagneticLink 
  href="/path" 
  strength={0.3} 
  transitionEffect="ripple"
>
  Hover Me
</MagneticLink>
```

### Card3DLink
3D perspective card with flip animation
```tsx
<Card3DLink href="/path" intensity={20}>
  <div className="card-content">
    Card Content
  </div>
</Card3DLink>
```

### TextReveal
Animated text reveal effects
```tsx
<TextReveal effect="wave" trigger="scroll">
  Your Text Here
</TextReveal>
```

### ParallaxSection
Scroll-based parallax animation
```tsx
<ParallaxSection speed={0.5} direction="up" scale rotate>
  <div>Parallax Content</div>
</ParallaxSection>
```

### StaggerAnimation
Animate children elements in sequence
```tsx
<StaggerAnimation stagger={0.1} delay={0.2}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerAnimation>
```

### RevealOnScroll
Reveal elements as they enter viewport
```tsx
<RevealOnScroll direction="up" delay={0}>
  <div>Content to reveal</div>
</RevealOnScroll>
```

## 💡 Usage Examples

### Example 1: Navbar with Magnetic Links

```tsx
import MagneticLink from '@/components/transitions/magnetic-link';

export function Navbar() {
  return (
    <nav className="flex gap-6">
      <MagneticLink href="/" transitionEffect="ripple">
        Home
      </MagneticLink>
      <MagneticLink href="/products" transitionEffect="swirl">
        Products
      </MagneticLink>
      <MagneticLink href="/about" transitionEffect="explode">
        About
      </MagneticLink>
    </nav>
  );
}
```

### Example 2: Product Grid with 3D Cards

```tsx
import StaggerAnimation from '@/components/transitions/stagger-animation';
import Card3DLink from '@/components/transitions/3d-card-link';

export function ProductGrid({ products }) {
  return (
    <StaggerAnimation className="grid grid-cols-3 gap-6" stagger={0.15}>
      {products.map((product) => (
        <Card3DLink 
          key={product.id} 
          href={`/products/${product.slug}`}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </Card3DLink>
      ))}
    </StaggerAnimation>
  );
}
```

### Example 3: Hero Section with Text Animations

```tsx
import TextReveal from '@/components/transitions/text-reveal';
import ParallaxSection from '@/components/transitions/parallax-section';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <TextReveal effect="wave" trigger="load">
          <h1 className="text-6xl font-bold">Welcome to Our Site</h1>
        </TextReveal>
        
        <TextReveal effect="slide" delay={0.5} trigger="load">
          <p className="text-xl mt-4">Creating amazing experiences</p>
        </TextReveal>

        <ParallaxSection speed={0.3} direction="up">
          <img src="/hero.jpg" alt="Hero" className="mt-8" />
        </ParallaxSection>
      </div>
    </section>
  );
}
```

### Example 4: Form with Transition Navigation

```tsx
import { usePageTransition } from '@/hooks/use-page-transition';

export function ContactForm() {
  const { navigateWithTransition } = usePageTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit form...
    await submitForm();
    // Navigate with transition
    navigateWithTransition('/thank-you');
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 🎯 Best Practices

1. **Use PageTransitionLink for internal navigation** - Provides consistent transitions
2. **Keep transitions short** - 0.5-0.8s is ideal for page transitions
3. **Use stagger sparingly** - Too many staggered elements can feel slow
4. **Test on mobile** - Ensure transitions perform well on all devices
5. **Combine with scroll animations** - Use RevealOnScroll for content sections

## 🔧 Customization

### Modify Transition Timing

Edit `src/components/transitions/transition-variants.tsx` to adjust durations and easing:

```tsx
slide: {
  enter: (container, overlay) => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { x: '100%' },
      { x: '0%', duration: 0.5, ease: 'power3.inOut' } // Adjust duration here
    )
    // ...
  }
}
```

### Create Custom Variants

Add new variants to `transition-variants.tsx`:

```tsx
export const transitionVariants = {
  // ... existing variants
  myCustom: {
    enter: (container, overlay) => {
      // Your custom GSAP animation
      return gsap.timeline()...
    }
  }
}
```

## 📱 Performance

- All animations use GPU-accelerated properties (transform, opacity)
- GSAP automatically optimizes animations
- Overlays are removed after transitions complete
- ScrollTrigger is only loaded when needed

## 🐛 Troubleshooting

**Transitions not working?**
- Ensure GSAP is installed: `pnpm install gsap`
- Check that PageTransition is in your root layout
- Verify you're using PageTransitionLink instead of regular Link

**Animations feel janky?**
- Reduce transition duration
- Check for heavy JavaScript on page load
- Ensure images are optimized

**ScrollTrigger not working?**
- Make sure you're using RevealOnScroll in a client component
- Check that elements have enough scroll space to trigger

## 📚 Additional Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- See `src/components/transitions/EXAMPLES.tsx` for more code examples

## 🎉 Next Steps

1. Update your navbar to use `PageTransitionLink`
2. Add `StaggerAnimation` to your product/blog grids
3. Use `RevealOnScroll` for content sections
4. Experiment with different transition variants
5. Create custom animations for your brand

Enjoy your smooth, modern page transitions! 🚀


### Example 5: Creative Landing Page

```tsx
import TextReveal from '@/components/transitions/text-reveal';
import ParallaxSection from '@/components/transitions/parallax-section';
import RevealOnScroll from '@/components/transitions/reveal-on-scroll';
import MagneticLink from '@/components/transitions/magnetic-link';

export function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <ParallaxSection speed={0.5} direction="down" className="absolute inset-0 -z-10">
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600" />
        </ParallaxSection>
        
        <div className="text-center text-white">
          <TextReveal effect="glitch" trigger="load">
            <h1 className="text-7xl font-bold mb-4">Innovation Starts Here</h1>
          </TextReveal>
          
          <TextReveal effect="typewriter" delay={1} trigger="load">
            <p className="text-2xl">Building the future, one pixel at a time</p>
          </TextReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <RevealOnScroll direction="up">
          <TextReveal effect="wave">
            <h2 className="text-5xl font-bold text-center mb-16">Our Features</h2>
          </TextReveal>
        </RevealOnScroll>

        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <RevealOnScroll key={i} direction="up" delay={i * 0.2}>
              <div className="p-8 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <ParallaxSection speed={0.3} scale>
          <MagneticLink 
            href="/contact" 
            transitionEffect="explode"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-6 rounded-full text-xl font-bold"
          >
            Get Started Now
          </MagneticLink>
        </ParallaxSection>
      </section>
    </div>
  );
}
```

### Example 6: Blog with Text Animations

```tsx
import TextReveal from '@/components/transitions/text-reveal';
import Card3DLink from '@/components/transitions/3d-card-link';
import StaggerAnimation from '@/components/transitions/stagger-animation';

export function BlogPage({ posts }) {
  return (
    <div className="max-w-7xl mx-auto py-20">
      <TextReveal effect="split" trigger="load">
        <h1 className="text-6xl font-bold mb-4">Latest Articles</h1>
      </TextReveal>

      <TextReveal effect="fade" delay={0.3} trigger="load">
        <p className="text-xl text-gray-600 mb-16">
          Insights, stories, and ideas from our team
        </p>
      </TextReveal>

      <StaggerAnimation className="grid grid-cols-2 gap-8" stagger={0.2}>
        {posts.map((post) => (
          <Card3DLink
            key={post.id}
            href={`/blog/${post.slug}`}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </div>
          </Card3DLink>
        ))}
      </StaggerAnimation>
    </div>
  );
}
```

### Example 7: Parallax Showcase

```tsx
import ParallaxSection from '@/components/transitions/parallax-section';
import TextReveal from '@/components/transitions/text-reveal';

export function ShowcasePage() {
  return (
    <div className="relative">
      {/* Layer 1 - Background */}
      <ParallaxSection speed={0.2} className="fixed inset-0 -z-30">
        <div className="w-full h-full bg-gradient-to-b from-blue-900 to-purple-900" />
      </ParallaxSection>

      {/* Layer 2 - Stars */}
      <ParallaxSection speed={0.4} className="fixed inset-0 -z-20">
        <div className="stars" />
      </ParallaxSection>

      {/* Content */}
      <div className="relative z-10">
        <section className="h-screen flex items-center justify-center">
          <TextReveal effect="wave">
            <h1 className="text-8xl font-bold text-white">Scroll Down</h1>
          </TextReveal>
        </section>

        <section className="h-screen flex items-center justify-center">
          <ParallaxSection speed={0.6} scale>
            <div className="text-center text-white">
              <h2 className="text-6xl font-bold mb-4">Experience Depth</h2>
              <p className="text-2xl">With parallax scrolling</p>
            </div>
          </ParallaxSection>
        </section>

        <section className="h-screen flex items-center justify-center">
          <ParallaxSection speed={0.8} rotate>
            <div className="w-64 h-64 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full" />
          </ParallaxSection>
        </section>
      </div>
    </div>
  );
}
```

## 🎭 Creative Combinations

### Magnetic Navigation Bar

```tsx
import MagneticLink from '@/components/transitions/magnetic-link';

export function CreativeNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <MagneticLink href="/" strength={0.5} transitionEffect="ripple">
          <span className="text-2xl font-bold text-white">Logo</span>
        </MagneticLink>

        <div className="flex gap-8">
          {['Products', 'About', 'Blog', 'Contact'].map((item) => (
            <MagneticLink
              key={item}
              href={`/${item.toLowerCase()}`}
              strength={0.3}
              transitionEffect="swirl"
              className="text-white hover:text-purple-400 transition-colors"
            >
              {item}
            </MagneticLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

### Animated Hero Section

```tsx
import TextReveal from '@/components/transitions/text-reveal';
import ParallaxSection from '@/components/transitions/parallax-section';
import MagneticLink from '@/components/transitions/magnetic-link';

export function AnimatedHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background layers */}
      <ParallaxSection speed={0.2} className="absolute inset-0 -z-30">
        <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      </ParallaxSection>

      <ParallaxSection speed={0.4} direction="right" className="absolute inset-0 -z-20 opacity-30">
        <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat" />
      </ParallaxSection>

      {/* Content */}
      <div className="text-center text-white z-10 max-w-4xl px-8">
        <TextReveal effect="glitch" trigger="load">
          <h1 className="text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
            FUTURE IS NOW
          </h1>
        </TextReveal>

        <TextReveal effect="slide" delay={0.5} trigger="load">
          <p className="text-2xl mb-12 text-gray-300">
            Experience the next generation of web design
          </p>
        </TextReveal>

        <ParallaxSection speed={0.6} scale>
          <MagneticLink
            href="/explore"
            transitionEffect="explode"
            strength={0.4}
            className="inline-block bg-gradient-to-r from-cyan-500 to-pink-500 px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-pink-500/50 transition-shadow"
          >
            Explore Now
          </MagneticLink>
        </ParallaxSection>
      </div>
    </section>
  );
}
```

## 🎨 Color Schemes

The `CreativePageTransition` component supports three color schemes:

```tsx
// Vibrant gradient (default)
<CreativePageTransition colorScheme="gradient">

// Solid primary color
<CreativePageTransition colorScheme="solid">

// Animated gradient
<CreativePageTransition colorScheme="animated">
```

## 🔥 Pro Tips

1. **Mix and Match**: Combine different components for unique effects
2. **Performance**: Use `will-change` CSS property for smoother animations
3. **Mobile**: Test all transitions on mobile devices
4. **Accessibility**: Provide `prefers-reduced-motion` alternatives
5. **Timing**: Keep page transitions under 1 second
6. **Stagger**: Use stagger values between 0.05-0.2 for best results
7. **Text Effects**: Use `trigger="scroll"` for content below the fold
8. **Parallax**: Keep speed values between 0.2-0.8 for natural movement

## 🎯 Recommended Combinations

- **E-commerce**: Use `Card3DLink` for products + `particles` transition
- **Portfolio**: Use `MagneticLink` for navigation + `morph` transition
- **Blog**: Use `TextReveal` for headings + `liquid` transition
- **Landing Page**: Use `ParallaxSection` + `glitch` transition
- **Corporate**: Use `slide` transition + `RevealOnScroll`
