# TenTwenty Farms

A modern, animation-rich landing page for TenTwenty Farms, built with React, TypeScript, and Tailwind CSS.

## Live Demo

The site features a full-screen hero carousel and an interactive circular product showcase.

## Tech Stack

- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **CSS Animations** - Custom keyframe animations for smooth transitions

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (opens automatically on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/
│   ├── icons/          # SVG icons
│   └── images/         # Background images
├── components/
│   ├── common/         # Reusable components
│   ├── features/       # Feature-specific components
│   │   ├── HeroSection/
│   │   └── ProductsSection/
│   └── layout/         # Layout components (Header, etc.)
├── constants/          # App-wide constants
│   ├── animation.ts    # Animation timing configs
│   └── breakpoints.ts  # Responsive breakpoints
├── data/               # Static data
│   └── products.ts     # Product listings
├── hooks/              # Custom React hooks
│   ├── useIsMobile.ts
│   └── useWordAnimation.tsx
├── pages/              # Page components
│   └── landing/
├── styles/             # Global styles
│   └── animations.css  # CSS keyframe animations
├── types/              # TypeScript type definitions
│   ├── product.ts
│   └── animation.ts
└── utils/              # Helper functions
    ├── math.ts
    └── imageOptimization.ts
```

## Key Features

### Hero Section
- Auto-rotating background images (5-second intervals)
- Animated text reveals with word-by-word effects
- Preview controller for next slide
- Manual navigation

### Products Carousel
- Unique circular layout with drag interaction
- Mouse and touch support
- Smooth lerp-based animations
- Responsive card sizing (mobile/desktop)
- Animated product information transitions

### Performance
- Image preloading for hero section
- Lazy loading for carousel images
- Optimized re-renders with proper React patterns
- requestAnimationFrame for smooth 60fps animations

## Development Decisions

### Why Custom Animations?
Instead of using animation libraries like Framer Motion, I implemented custom CSS keyframes and JavaScript-based animations. This keeps the bundle small and gives precise control over timing.

### State Management
No Redux or external state management needed. The app uses React's built-in hooks (useState, useEffect, useRef) with custom hooks for complex logic separation.

### Component Architecture
Each major feature has its own hook (useHeroSection, useProductsSection) that handles all the logic, keeping components clean and focused on rendering.

### Path Aliases
The project uses path aliases for cleaner imports:
```typescript
import { Product } from '@types'
import { ANIMATION_CONFIG } from '@constants'
import { lerp } from '@utils'
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

The initial bundle includes large PNG images. For production, images should be optimized:
- Convert to WebP/AVIF formats
- Compress PNGs
- Expected 70-80% size reduction

The code already includes lazy loading and preloading strategies to handle this.

## Customization

### Changing Animation Timing
Edit `src/constants/animation.ts`:
```typescript
export const ANIMATION_CONFIG = {
  HERO_ROTATION_INTERVAL: 5000,  // Milliseconds between slides
  WORD_ANIMATION_DELAY: 0.15,    // Delay between word animations
  // ...
}
```

### Modifying Products
Edit `src/data/products.ts`:
```typescript
export const products: Product[] = [
  {
    id: 1,
    title: "Your Title",
    description: "Your Description",
    image: yourImage,
  },
  // ...
]
```

### Responsive Breakpoints
Edit `src/constants/breakpoints.ts` to adjust mobile/desktop thresholds.

## Known Issues & Future Improvements

- Image files are currently unoptimized PNGs (see performance notes)
- No automated tests yet
- Accessibility could be enhanced (keyboard navigation for carousel)
- No CMS integration (products are hardcoded)

## Architecture Highlights

### Separation of Concerns
Each component folder contains:
- `index.tsx` - Presentational component
- `useComponentName.tsx` - Business logic hook
- Component-specific sub-components when needed

### Type Safety
All components have proper TypeScript interfaces. Shared types live in `src/types/` for reusability.

### Constants Over Magic Numbers
All timing, sizing, and configuration values are extracted to constant files instead of being scattered throughout components.

## Build Output

Production build creates optimized assets in `dist/`:
```bash
npm run build

# Typical output:
# dist/index.html         ~0.36 kB
# dist/assets/*.png       ~3.8 MB (needs optimization)
# dist/assets/*.css       ~17 kB
# dist/assets/*.js        ~209 kB
```

## License

This is a test assignment project.

---

Built with attention to performance, maintainability, and modern React patterns.
