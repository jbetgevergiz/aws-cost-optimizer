# Framer Motion Animations Guide

This document provides usage examples for all animation components implemented in the AWS Cost Optimizer frontend.

## Overview

All animations respect the `prefers-reduced-motion` media query for accessibility. When enabled, animations are disabled.

**Timing Standards:**
- Fast: 100ms (quick feedback)
- Normal: 200ms (standard interaction)
- Slow: 300ms (thoughtful transition)
- Slower: 400ms (showcase/emphasis)

**Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design standard)

---

## 1. Loading States

### Skeleton Loading

Shimmer animation for placeholder content.

```tsx
import { Skeleton } from '@/components';

export function DataCard() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div>
        <Skeleton variant="text" count={3} className="mb-4" />
        <Skeleton variant="card" />
      </div>
    );
  }

  return <div>Your content here</div>;
}
```

**Variants:** `text`, `card`, `metric`, `image`

### Spinner

Rotating spinner for loading states.

```tsx
import { Spinner, DotSpinner } from '@/components';

// Rotating spinner
<Spinner size="md" color="#d4af37" />

// Dot spinner variant
<DotSpinner dotSize="md" color="#d4af37" />
```

**Sizes:** `sm`, `md`, `lg`

### Progress Bar

Animated gradient flowing progress bar.

```tsx
import { ProgressBar, IndeterminateProgressBar } from '@/components';

// With value
<ProgressBar value={75} showLabel />

// Indeterminate (for unknown duration)
<IndeterminateProgressBar />
```

---

## 2. Data Update Animations

### Cost Ticker

Number counter animation (0 → final value).

```tsx
import { CostTicker, NumberCounter } from '@/components';

// Currency format
<CostTicker 
  value={1250.50} 
  duration={2}
  prefix="$"
  decimals={2}
/>

// Generic number counter
<NumberCounter
  value={15234}
  duration={2}
  format={(v) => v.toLocaleString()}
/>
```

### Savings Animation

Spring-based scale + fade animation.

```tsx
import { SavingsAnimation, PulseAnimation, StaggeredSavingsList } from '@/components';

// Single item
<SavingsAnimation delay={0.1}>
  <div className="savings-badge">+$1,200 monthly</div>
</SavingsAnimation>

// Pulse on update
<PulseAnimation>
  <Card>Updated metric value</Card>
</PulseAnimation>

// Staggered list
<StaggeredSavingsList
  items={[
    <div key="1">Savings item 1</div>,
    <div key="2">Savings item 2</div>,
    <div key="3">Savings item 3</div>,
  ]}
/>
```

---

## 3. Form Validations

### Validation Error (with shake)

```tsx
import { ValidationError, ValidatedField } from '@/components';

<ValidationError message="AWS account ID is required" />

// Or with wrapper
<ValidatedField error={error}>
  <Input placeholder="AWS Account ID" />
</ValidatedField>
```

### Success Message

```tsx
import { SuccessMessage } from '@/components';

<SuccessMessage message="AWS account connected successfully!" />
```

---

## 4. Page Transitions

Wrap page content for entry animations.

```tsx
import { PageTransition, FadeIn, SlideInFromTop } from '@/components';

// Full page transition (fade + slide)
<PageTransition>
  <div>Page content</div>
</PageTransition>

// Fade only
<FadeIn delay={0.2}>
  <div>Fades in after 0.2s</div>
</FadeIn>

// Slide from top
<SlideInFromTop delay={0.1}>
  <Header />
</SlideInFromTop>
```

---

## 5. Component Updates

### Button

Automatic scale + shadow on hover/tap.

```tsx
import { Button } from '@/components';

<Button variant="primary">
  Click me
</Button>
```

**Animations:**
- Hover: scale 1.05 + shadow
- Tap: scale 0.95
- Loading: rotating spinner

### Modal

Backdrop fade + content scale-in animation.

```tsx
import { Modal } from '@/components';

<Modal isOpen={isOpen} onClose={handleClose} title="Settings">
  <p>Modal content...</p>
</Modal>
```

**Animations:**
- Backdrop: fade in/out (200ms)
- Content: scale-in (300ms)
- Close button: scale on hover

### Card

Lift effect on hover.

```tsx
import { Card, CardBody } from '@/components';

<Card variant="hover">
  <CardBody>Content lifts on hover</CardBody>
</Card>
```

**Animations:**
- Hover: lift 2px + border highlight + shadow expand

### Navigation

Hamburger rotation + menu slide-in.

```tsx
import { Navigation } from '@/components';

<Navigation
  navItems={[...]}
  ctaButton={{text: 'Sign In'}}
/>
```

**Animations:**
- Hamburger: 90° rotation (200ms)
- Menu: slide down (300ms)
- Items: staggered fade-in (50ms between)

### Input/Textarea

Focus state with label color change.

```tsx
import { Input } from '@/components';

<Input 
  label="AWS Account ID"
  error={error}
/>
```

**Animations:**
- Focus: label color change + border color (150ms)
- Error: shake animation (200ms)
- Success: color transition (300ms)

---

## 6. Notifications

### Toast

Quick notifications with auto-dismiss.

```tsx
import { Toast, ToastContainer } from '@/components';

const [toasts, setToasts] = useState([]);

const addToast = (message, type = 'info') => {
  const id = Date.now();
  setToasts(prev => [...prev, { id, message, type }]);
};

return (
  <>
    <button onClick={() => addToast('Success!', 'success')}>
      Show Success
    </button>
    <ToastContainer 
      toasts={toasts}
      onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
      position="bottom-right"
    />
  </>
);
```

**Types:** `success`, `error`, `info`, `warning`
**Positions:** `top-right`, `top-left`, `bottom-right`, `bottom-left`

---

## 7. Hero Section

Staggered fade + slide animations.

```tsx
import { Hero } from '@/components';

<Hero
  title="Optimize AWS Costs"
  subtitle="Save money instantly"
  description="Get real-time insights into your AWS spending"
  primaryCTA={{
    text: 'Start Free Trial',
    onClick: handleStartTrial,
  }}
/>
```

**Animations:**
- Badge: fade-in (300ms delay)
- Title: fade + slide up (200ms)
- Description: fade + slide up (200ms, staggered)
- CTAs: fade + slide up (200ms, staggered)

---

## 8. Accessibility

### Respecting User Preferences

All components automatically disable animations when:
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
}
```

### Keyboard Navigation

All interactive components maintain keyboard focus visibility:
- Focus: outline with 2px primary color
- Outline offset: 2px

---

## 9. Performance Optimization

Components use `will-change` for optimal 60fps performance:

```tsx
// Automatic on animated elements
// Avoid adding will-change manually to animated components
```

Animations use:
- GPU acceleration (transform, opacity)
- Framer Motion's requestAnimationFrame batching
- Minimal repaints/reflows

---

## 10. Design Tokens Integration

All animations use design tokens for consistency:

```ts
// Timing
--timing-fast: 100ms
--timing-normal: 200ms
--timing-slow: 300ms
--timing-slower: 400ms

// Easing
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)

// Colors
--color-primary: #FF9900
--color-success: #10B981
--color-error: #EF4444
```

---

## 11. Common Patterns

### Loading → Success → Error

```tsx
const [state, setState] = useState('idle');
const [error, setError] = useState('');

async function handleSubmit() {
  setState('loading');
  try {
    await submitForm();
    setState('success');
    setTimeout(() => setState('idle'), 2000);
  } catch (err) {
    setError(err.message);
    setState('error');
  }
}

return (
  <>
    {state === 'loading' && <Spinner />}
    {state === 'success' && <SuccessMessage message="Done!" />}
    {state === 'error' && <ValidationError message={error} />}
  </>
);
```

### Data List with Staggered Animations

```tsx
import { StaggeredSavingsList } from '@/components';

<StaggeredSavingsList
  items={items.map(item => (
    <div key={item.id} className="p-4">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  ))}
/>
```

---

## 12. Troubleshooting

### Animations Not Working?

1. Check `prefers-reduced-motion` is not enabled in OS settings
2. Verify Framer Motion is installed: `npm list framer-motion`
3. Ensure component has `'use client'` directive for Next.js App Router
4. Check browser DevTools > Rendering > Paint flashing

### Performance Issues?

1. Use `PulseAnimation` instead of custom animations
2. Limit number of animated items (use virtualization for long lists)
3. Use Framer Motion's `layoutId` for shared layout animations
4. Profile with Chrome DevTools > Performance tab

### Accessibility Issues?

1. Always test with `prefers-reduced-motion: reduce` enabled
2. Ensure focus states are visible
3. Use semantic HTML (button, input, form)
4. Test with screen readers (NVDA, JAWS)

---

## References

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Animations Performance](https://web.dev/animations-guide/)
- [Accessible Animations](https://alistapart.com/article/designing-safer-web-animation-for-motion/)
