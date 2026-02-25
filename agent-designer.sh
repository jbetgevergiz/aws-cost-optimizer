#!/bin/bash
set -e
cd /root/.openclaw/workspace/mvp/design

echo "🎨 AGENT 1: DESIGNER - Starting..."

# Create design system document
cat > system.md << 'DESIGN'
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

DESIGN

echo "✅ Design system created"

# Create glass effect CSS
cat > glass.css << 'CSS'
/* Liquid Glass Card Component */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 0;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 255, 0.4);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.15);
}

/* Brutalist Buttons */
.btn-primary {
  background: #000000;
  color: #00FFFF;
  border: 1px solid #00FFFF;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-primary:hover {
  background: #00FFFF;
  color: #000000;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

/* Monospace headings */
h1, h2, h3 {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  letter-spacing: -0.02em;
}

h1 { font-size: 48px; line-height: 1.2; }
h2 { font-size: 32px; line-height: 1.3; }
h3 { font-size: 24px; line-height: 1.4; }

/* Three.js container */
.threejs-container {
  width: 100%;
  height: 500px;
  background: #000000;
  border: 1px solid #333333;
  position: relative;
}
CSS

echo "✅ Glass CSS created"

# Create tokens file
cat > tokens.css << 'TOKENS'
:root {
  /* Colors */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-cyan: #00FFFF;
  --color-dark-gray: #1A1A1A;
  --color-dark-gray-2: #2D2D2D;
  --color-border: #333333;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Typography */
  --font-mono: 'IBM Plex Mono', 'JetBrains Mono', monospace;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  
  /* Transitions */
  --transition-fast: 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-base: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-slow: 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Shadows */
  --shadow-sm: 0 0 10px rgba(0, 255, 255, 0.1);
  --shadow-md: 0 0 20px rgba(0, 255, 255, 0.2);
  --shadow-lg: 0 0 30px rgba(0, 255, 255, 0.3);
}
TOKENS

echo "✅ Design tokens created"

# Create Three.js specs
cat > threejs-specs.md << 'THREEJS'
# Three.js Implementation Specs

## Hero Particle System
- **Particle Count:** 1500 (responsive)
- **Size:** 2-4px
- **Color:** Cyan (#00FFFF) with alpha gradient
- **Movement:** 
  - Base: Subtle floating (0.5px/frame)
  - Cursor influence: 500px radius, attraction
  - Collision: Particles repel near edges
- **Performance:** Instanced geometry, 60fps target
- **Mobile:** Reduce to 500 particles

## 3D Cost Cube
- **Geometry:** Box (50x50x50 units)
- **Faces:** 6 faces = 6 AWS services (EC2, RDS, S3, Lambda, etc.)
- **Face Colors:** Cyan edges, dark fill with radial gradient
- **Text:** Monospace labels on each face
- **Rotation:** Auto-rotate Y axis (20s per rotation)
- **Interaction:** Click + drag to rotate manually
- **Values:** Show on hover (tooltip with cost)
- **Animation:** Spring ease on value updates

## Live Cost Ticker
- **Element:** Three.js Text geometry or DOM overlay
- **Font:** JetBrains Mono 48px
- **Color:** Cyan
- **Format:** $123,456.78 USD
- **Update Animation:** Spring ease (400ms) when value changes
- **Frequency:** Update every 5 seconds (mock)

THREEJS

echo "✅ Three.js specs created"

# Create mockup structure
mkdir -p mockups
cat > mockups/README.md << 'MOCKUPS'
# Mockups

## Files
- landing-page.png (wireframe/visual)
- dashboard.png (cost overview)
- settings.png (AWS credentials)

(Art direction: brutalist, high contrast, monospace, generous whitespace)
MOCKUPS

echo "✅ Mockup directory created"

echo "🎨 AGENT 1: DESIGNER - Complete! ✨"
echo "Outputs:"
echo "  ✓ /design/system.md (design system)"
echo "  ✓ /design/glass.css (liquid glass effects)"
echo "  ✓ /design/tokens.css (design tokens)"
echo "  ✓ /design/threejs-specs.md (3D element specs)"
echo "  ✓ /design/mockups/ (directory ready)"

