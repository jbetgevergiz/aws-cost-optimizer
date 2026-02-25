# AWS Cost Optimizer - Design System

## Brutalist Philosophy
- **Principle:** Form follows function, aggressive use of whitespace
- **Aesthetic:** Anti-design, monospace, stark contrasts
- **Inspiration:** Early web, technical documentation style

## Color Palette

```css
--color-black: #000000;
--color-white: #FFFFFF;
--color-cyan: #00FFFF;
--color-dark-gray: #1A1A1A;
--color-dark-gray-2: #2D2D2D;
--color-border: #333333;
```

## Typography

- **Headings:** IBM Plex Mono, 700 weight, 12-18px, letter-spacing: -0.02em
- **Body:** JetBrains Mono, 400 weight, 14px, line-height: 1.6
- **Labels:** Courier New fallback, 12px, uppercase, letter-spacing: 0.1em

## Spacing Scale

```
4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px
```

## Grid
- 12-column responsive grid
- Gutters: 16px mobile, 24px desktop
- Max width: 1440px

## Components

### Cards (Liquid Glass)
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(12px);
border: 1px solid rgba(0, 255, 255, 0.2);
border-radius: 0; /* Sharp edges */
padding: 24px;
```

### Buttons
- Primary (CTA): Black bg, cyan text, uppercase mono
- Secondary: Transparent, cyan border, cyan text
- No border-radius, 4px padding

### Inputs
- Monospace font
- Cyan border on focus
- Black background
- White text

## Microinteractions

### Spring Easing
```
duration: 400ms
stiffness: 100
damping: 15
mass: 1
```

### Staggered Animations
- Delay between children: 40-80ms
- Direction: top-to-bottom or left-to-right

### Hover States
- Cards: Increase blur, brighten border
- Buttons: Invert colors briefly
- Text: Underline in cyan

## Three.js Elements

### Hero Particles
- 1000-2000 particles
- Colors: Cyan with alpha fade
- Movement: Brownian + cursor influence
- Performance: LOD system for mobile

### Cost Cube
- 6 faces, each a service cost
- Rotation: Auto + interactive drag
- Labels: Monospace, positioned on faces
- Colors: Cyan edges, black fill with gradient

### Live Ticker
- Font: Monospace 24px
- Color: Cyan
- Animation: Spring ease on number change
- Format: $123,456.78

