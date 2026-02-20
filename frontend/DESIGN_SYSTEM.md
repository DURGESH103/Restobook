# 🎨 Premium Design System - RestoBook

## Overview
This design system transforms RestoBook into a refined, elegant, luxury fine-dining brand with professional SaaS-level UI.

---

## 1️⃣ Color Palette

### Primary Gold
```css
--gold-50: #FAF7F0
--gold-100: #F0E9D8
--gold-200: #E5D9B8
--gold-300: #D9C698
--gold-400: #CEB77B
--gold-500: #C6A75E  /* Primary */
--gold-600: #B08F45
--gold-700: #8A7036
--gold-800: #645128
--gold-900: #3E321A
```

### Dark Backgrounds
```css
--dark: #0F0F0F          /* Primary dark */
--dark-secondary: #161616 /* Cards, elevated surfaces */
--dark-tertiary: #1E1E1E  /* Hover states */
```

### Light Text
```css
--light: #F5F5F5          /* Primary text on dark */
--light-secondary: #B8B8B8 /* Secondary text on dark */
```

### Usage Guidelines
- **Gold**: Use sparingly for accents, underlines, buttons, and highlights
- **Dark**: Primary background in dark mode
- **Light**: Text on dark backgrounds
- **Avoid**: Overusing gold - it should feel premium, not overwhelming

---

## 2️⃣ Typography System

### Font Families
```css
/* Headings - Elegant Serif */
font-family: 'Playfair Display', Georgia, serif;

/* Body - Clean Sans-Serif */
font-family: 'Inter', system-ui, sans-serif;
```

### Type Scale
```css
/* Display - Hero sections */
font-size: 4.5rem (72px)
line-height: 1.1
letter-spacing: -0.02em
font-weight: 500

/* H1 - Page titles */
font-size: 3.5rem (56px)
line-height: 1.2
letter-spacing: -0.01em
font-weight: 500

/* H2 - Section titles */
font-size: 2.5rem (40px)
line-height: 1.3
letter-spacing: -0.01em
font-weight: 500

/* H3 - Subsection titles */
font-size: 2rem (32px)
line-height: 1.4
letter-spacing: 0
font-weight: 500

/* H4 - Card titles */
font-size: 1.5rem (24px)
line-height: 1.5
letter-spacing: 0
font-weight: 500

/* Body - Paragraphs */
font-size: 1rem (16px)
line-height: 1.7
letter-spacing: 0.01em
font-weight: 400

/* Small - Captions */
font-size: 0.875rem (14px)
line-height: 1.6
letter-spacing: 0.01em
font-weight: 400
```

### Font Weight Guidelines
- **Never use**: 800, 900 (too bold)
- **Headings**: 500-600 max
- **Body**: 400 (regular)
- **Medium**: 500 (for emphasis)

---

## 3️⃣ Spacing System

### Vertical Spacing (Sections)
```css
section: py-20 md:py-28  /* 80px / 112px */
section-sm: py-16 md:py-20  /* 64px / 80px */
```

### Component Spacing
```css
gap-2: 0.5rem (8px)
gap-3: 0.75rem (12px)
gap-4: 1rem (16px)
gap-6: 1.5rem (24px)
gap-8: 2rem (32px)
gap-12: 3rem (48px)
```

### Padding Scale
```css
p-2: 0.5rem (8px)
p-3: 0.75rem (12px)
p-4: 1rem (16px)
p-6: 1.5rem (24px)
p-8: 2rem (32px)
```

---

## 4️⃣ Component Styles

### Buttons

#### Primary Button
```jsx
<button className="btn-primary">
  Sign Up
</button>
```
- Background: Gold (#C6A75E)
- Text: White
- Padding: px-6 py-3
- Border radius: 12px
- Hover: Darker gold + subtle shadow
- Transition: 300ms

#### Secondary Button
```jsx
<button className="btn-secondary">
  Learn More
</button>
```
- Background: Transparent
- Border: 1px solid gold
- Text: Gold
- Hover: Fill with gold, text white

#### Ghost Button
```jsx
<button className="btn-ghost">
  Cancel
</button>
```
- Background: Transparent
- Text: Gray
- Hover: Light gray background

### Cards

#### Standard Card
```jsx
<div className="card">
  {/* Content */}
</div>
```
- Background: White / Dark secondary
- Border: 1px solid gray-100 / gray-800
- Border radius: 16px
- Shadow: Soft (subtle)
- Hover: Medium shadow

#### Elevated Card
```jsx
<div className="card-elevated">
  {/* Content */}
</div>
```
- Same as card but with medium shadow
- Hover: Large shadow

### Form Inputs

#### Text Input
```jsx
<input className="input" />
```
- Padding: px-4 py-3
- Border: 1px solid gray-200
- Border radius: 12px
- Focus: Gold border + ring

#### With Label
```jsx
<Input label="Email" placeholder="you@example.com" />
```

#### With Error
```jsx
<Input label="Email" error="Email is required" />
```

### Badges

```jsx
<Badge variant="gold">Featured</Badge>
<Badge variant="success">Confirmed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Rejected</Badge>
```

---

## 5️⃣ Layout Guidelines

### Container
```jsx
<div className="container-custom">
  {/* Max-width: 1280px, centered, responsive padding */}
</div>
```

### Section Structure
```jsx
<section className="section">
  <div className="container-custom">
    <SectionHeader 
      subtitle="Our Menu"
      title="Culinary Excellence"
    />
    {/* Content */}
  </div>
</section>
```

### Grid Layouts
```jsx
{/* 3 columns on desktop, 1 on mobile */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

---

## 6️⃣ Animation Guidelines

### Fade In
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
>
  {/* Content */}
</motion.div>
```

### Slide Up
```jsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  {/* Content */}
</motion.div>
```

### Button Hover
```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Click Me
</motion.button>
```

### Rules
- Duration: 0.3-0.4s (never longer)
- Easing: ease-out
- No bounce effects
- No aggressive scaling
- Subtle movements only

---

## 7️⃣ Navbar Specifications

### Height
- Desktop: 80px (h-20)
- Mobile: 80px (h-20)

### Logo
```jsx
<span className="text-2xl font-serif font-medium">
  Resto<span className="text-gold">Book</span>
</span>
```

### Nav Links
- Font size: 14px (text-sm)
- Font weight: 500 (medium)
- Spacing: 32px between items
- Active indicator: 2px gold underline

### Hover Effect
- Color transition to gold
- Duration: 300ms
- No background change

---

## 8️⃣ Dashboard Components

### Stats Card
```jsx
<StatCard 
  icon={FiUsers}
  label="Total Bookings"
  value="248"
  trend={12}
/>
```

### Table
- Row height: 56px
- Border: 1px solid gray-100
- Hover: Light gray background
- Text: 14px

### Status Badges
- Pending: Yellow
- Confirmed: Green
- Rejected: Red
- Size: Small, rounded-full

---

## 9️⃣ Mobile Optimization

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Mobile Navbar
- Full-width dropdown
- Smooth animation (300ms)
- Proper touch targets (min 44px)

### Typography Scaling
- Display: 3rem on mobile
- H1: 2.5rem on mobile
- H2: 2rem on mobile
- Body: 1rem (same)

---

## 🎯 Implementation Checklist

### Global
- [x] Tailwind config updated
- [x] Global CSS with design system
- [x] Typography system implemented
- [x] Color palette applied

### Components
- [x] Navbar redesigned
- [x] Button components
- [x] Card components
- [x] Form inputs
- [x] Badges
- [x] Section headers

### Pages (Apply to all)
- [ ] Hero section
- [ ] Menu page
- [ ] Booking page
- [ ] Gallery
- [ ] Testimonials
- [ ] Contact
- [ ] Dashboard
- [ ] User dashboard

### Final Polish
- [ ] Remove all heavy gradients
- [ ] Replace bright colors with refined palette
- [ ] Adjust font weights (max 600)
- [ ] Add proper spacing
- [ ] Test dark mode
- [ ] Mobile responsiveness
- [ ] Animation smoothness

---

## 📐 Design Principles

1. **Less is More**: Use gold sparingly
2. **Breathing Space**: Generous padding and margins
3. **Subtle Animations**: Smooth, not flashy
4. **Typography Hierarchy**: Clear visual structure
5. **Consistent Spacing**: Use spacing scale
6. **Refined Colors**: Muted, sophisticated palette
7. **Premium Feel**: Quality over quantity

---

## 🚀 Quick Start

### 1. Import Components
```jsx
import { Button, Card, Input, SectionHeader } from './components/UI';
```

### 2. Use Design System Classes
```jsx
<section className="section">
  <div className="container-custom">
    <SectionHeader title="Welcome" subtitle="Discover" />
    <Card>
      <h3 className="text-h4 font-serif mb-4">Title</h3>
      <p className="text-body text-gray-600">Content</p>
      <Button variant="primary">Action</Button>
    </Card>
  </div>
</section>
```

### 3. Follow Typography
```jsx
<h1 className="text-h1 font-serif">Page Title</h1>
<h2 className="text-h2 font-serif">Section Title</h2>
<p className="text-body">Body text with proper line height</p>
```

---

## 💡 Examples

### Hero Section
```jsx
<section className="section bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-dark-secondary">
  <div className="container-custom text-center">
    <motion.h1 
      className="text-display font-serif text-gray-900 dark:text-light mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Fine Dining <span className="text-gold">Excellence</span>
    </motion.h1>
    <p className="text-xl text-gray-600 dark:text-light-secondary max-w-2xl mx-auto mb-8">
      Experience culinary artistry in an elegant atmosphere
    </p>
    <div className="flex gap-4 justify-center">
      <Button variant="primary" size="lg">Reserve Table</Button>
      <Button variant="secondary" size="lg">View Menu</Button>
    </div>
  </div>
</section>
```

### Menu Card
```jsx
<Card>
  <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-xl" />
  <div className="p-6">
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-h4 font-serif">{name}</h3>
      <Badge variant="gold">Chef's Special</Badge>
    </div>
    <p className="text-body text-gray-600 dark:text-light-secondary mb-4">
      {description}
    </p>
    <div className="flex justify-between items-center">
      <span className="text-2xl font-serif text-gold">${price}</span>
      <Button variant="primary">Add to Cart</Button>
    </div>
  </div>
</Card>
```

---

This design system ensures consistency, elegance, and premium feel across the entire RestoBook application.
