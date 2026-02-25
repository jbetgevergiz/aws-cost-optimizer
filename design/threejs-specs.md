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

