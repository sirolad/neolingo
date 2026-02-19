# Typography System

This app uses a two-font typography system:

- **Parkinsans**: Major headlines (already configured)
- **Metropolis**: Subtexts and body content (configured with local font files)

## Usage

Simply use the CSS classes in your components - no imports needed!

### Headlines (Parkinsans Font)

```tsx
// Major page titles
<h1 className="heading-1">Page Title</h1>

// Section headings
<h2 className="heading-2">Section Title</h2>

// Subsection headings
<h3 className="heading-3">Subsection</h3>

// Card titles
<h4 className="card-title">Card Title</h4>
```

### Body Text (Metropolis Font)

```tsx
// Regular body text
<p className="body-base">This is regular body text</p>

// Large body text
<p className="body-large">This is larger body text</p>

// Small body text
<p className="body-small">This is smaller body text</p>

// Extra small text
<p className="body-xs">This is extra small text</p>
```

### Subtitles (Metropolis Font)

```tsx
// Subtitles with muted color
<p className="subtitle-base">This is a subtitle</p>
<p className="subtitle-large">Large subtitle</p>
<p className="subtitle-small">Small subtitle</p>
```

### UI Elements (Metropolis Font)

```tsx
// Button text
<button className="text-button">Button Text</button>

// Form labels
<label className="text-label">Form Label</label>

// Captions and helper text
<span className="text-caption">Helper text</span>
```

### Navigation (Metropolis Font)

```tsx
// Primary navigation items
<a className="nav-primary">Home</a>

// Secondary navigation items
<a className="nav-secondary">Settings</a>
```

### Card Elements

```tsx
<div className="card">
  <h3 className="card-title">Card Title</h3>
  <p className="card-subtitle">Card subtitle</p>
  <p className="card-content">Card content goes here</p>
</div>
```

## Font Files Location

Metropolis font files are located in:

```
public/fonts/Metropolis Font family/
├── Metropolis-Light.otf
├── Metropolis-Regular.otf
├── Metropolis-Medium.otf
├── Metropolis-SemiBold.otf
└── Metropolis-Bold.otf
```

## Responsive Behavior

All headline classes automatically scale up on larger screens (lg: breakpoint) for better readability.

## Examples in Components

Instead of:

```tsx
// ❌ Don't do this
import { typography } from '@/lib/typography';

<h1 className={typography.headline.h1}>Title</h1>;
```

Do this:

```tsx
// ✅ Do this
<h1 className="heading-1">Title</h1>
<p className="subtitle-base">Subtitle text</p>
<p className="body-base">Body content</p>
```

This approach is cleaner, more performant, and easier to maintain!
