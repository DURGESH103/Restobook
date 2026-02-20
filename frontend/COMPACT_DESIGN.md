# 📐 Compact Design System - Professional & Refined

## Typography Scale (Reduced & Balanced)

### Before → After
```
text-7xl (4.5rem) → text-5xl (3rem)
text-6xl (3.75rem) → text-4xl (2.25rem)
text-5xl (3rem) → text-3xl (1.875rem)
text-4xl (2.25rem) → text-2xl (1.5rem)
text-3xl (1.875rem) → text-xl (1.25rem)
text-2xl (1.5rem) → text-lg (1.125rem)
```

### New Typography Classes

```jsx
// Hero Title - Compact
<h1 className="text-4xl md:text-5xl font-serif font-medium leading-tight">
  Fine Dining Excellence
</h1>

// Section Title - Balanced
<h2 className="text-3xl md:text-4xl font-serif font-medium leading-tight">
  Our Menu
</h2>

// Subsection Title - Refined
<h3 className="text-2xl md:text-3xl font-serif font-medium leading-snug">
  Featured Dishes
</h3>

// Card Title - Compact
<h4 className="text-xl font-serif font-medium leading-snug">
  Grilled Salmon
</h4>

// Body Text - Comfortable
<p className="text-base leading-relaxed">
  Regular paragraph text
</p>

// Small Text - Subtle
<p className="text-sm leading-normal">
  Caption or secondary text
</p>
```

---

## Spacing Scale (Reduced)

### Section Spacing
```jsx
// Before: py-24 → After: py-14
<section className="py-14 md:py-16">

// Before: py-20 → After: py-12
<section className="py-12 md:py-14">

// Before: py-16 → After: py-10
<section className="py-10 md:py-12">
```

### Component Spacing
```jsx
// Before: gap-12 → After: gap-6
<div className="grid gap-6 md:gap-8">

// Before: gap-8 → After: gap-4
<div className="flex gap-4 md:gap-6">

// Before: space-y-8 → After: space-y-4
<div className="space-y-4 md:space-y-6">
```

### Padding
```jsx
// Before: p-8 → After: p-5
<div className="p-5 md:p-6">

// Before: px-6 py-4 → After: px-4 py-2.5
<button className="px-4 py-2.5">
```

---

## Button Styles (Compact & Refined)

### Primary Button
```jsx
<button className="px-5 py-2 bg-gold text-white rounded-lg text-sm font-medium 
                   hover:bg-gold-600 transition-colors duration-300">
  Book Now
</button>
```

### Secondary Button
```jsx
<button className="px-5 py-2 border border-gold text-gold rounded-lg text-sm font-medium
                   hover:bg-gold hover:text-white transition-colors duration-300">
  Learn More
</button>
```

### Ghost Button
```jsx
<button className="px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
  Cancel
</button>
```

**Changes**:
- Padding: `px-6 py-3` → `px-5 py-2`
- Border radius: `rounded-xl` → `rounded-lg`
- No shadows on default state
- Subtle hover only

---

## Navbar (Slimmer)

```jsx
<nav className="fixed w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Before: h-20 → After: h-16 */}
    <div className="flex justify-between items-center h-16">
      
      {/* Logo - Smaller */}
      <Link to="/" className="flex items-center">
        <span className="text-xl font-serif font-medium tracking-tight text-gray-900 dark:text-white">
          Resto<span className="text-gold">Book</span>
        </span>
      </Link>

      {/* Nav Links - Compact spacing */}
      <div className="hidden md:flex items-center space-x-6">
        <Link className="text-sm font-medium">Home</Link>
      </div>

      {/* Icons - Smaller padding */}
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <FiSun className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</nav>
```

**Changes**:
- Height: `h-20` → `h-16`
- Logo: `text-2xl` → `text-xl`
- Nav spacing: `space-x-8` → `space-x-6`
- Icon padding: `p-2.5` → `p-2`
- Icon size: `w-5 h-5` → `w-4 h-4`

---

## Card Styles (Compact)

```jsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow duration-300">
  <img src={image} alt={name} className="w-full h-44 object-cover rounded-lg mb-4" />
  
  <div className="space-y-3">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-serif font-medium leading-snug">
        {name}
      </h3>
      <span className="px-2.5 py-0.5 bg-gold/10 text-gold text-xs font-medium rounded-full">
        Special
      </span>
    </div>
    
    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
      {description}
    </p>
    
    <div className="flex justify-between items-center pt-2">
      <span className="text-xl font-serif font-medium text-gold">
        ${price}
      </span>
      <button className="px-4 py-2 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold-600 transition-colors">
        Add
      </button>
    </div>
  </div>
</div>
```

**Changes**:
- Padding: `p-6` → `p-5`
- Image height: `h-56` → `h-44`
- Title: `text-xl` → `text-lg`
- Price: `text-2xl` → `text-xl`
- Border radius: `rounded-2xl` → `rounded-lg`
- Shadow: `shadow-soft` → `shadow-sm`

---

## Hero Section (Compact & Elegant)

```jsx
<section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Subtitle - Compact */}
      <p className="text-xs font-medium text-gold tracking-widest uppercase">
        Welcome to RestoBook
      </p>
      
      {/* Title - Reduced size */}
      <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white leading-tight">
        Fine Dining <span className="text-gold">Excellence</span>
      </h1>
      
      {/* Description - Comfortable */}
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Experience culinary artistry in an atmosphere of refined elegance
      </p>
      
      {/* Buttons - Compact */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <button className="px-6 py-2.5 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold-600 transition-colors">
          Reserve a Table
        </button>
        <button className="px-6 py-2.5 border border-gold text-gold rounded-lg text-sm font-medium hover:bg-gold hover:text-white transition-colors">
          View Menu
        </button>
      </div>
    </motion.div>
  </div>
</section>
```

**Changes**:
- Section padding: `py-28 md:py-36` → `py-16 md:py-20`
- Title: `text-5xl md:text-6xl` → `text-4xl md:text-5xl`
- Subtitle: `text-sm` → `text-xs`
- Description: `text-lg` → `text-base md:text-lg`
- Button gap: `gap-4` → `gap-3`
- Button padding: `px-8 py-3.5` → `px-6 py-2.5`
- Space between: `space-y-10` → `space-y-6`

---

## Section Header (Compact)

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4 }}
  className="text-center mb-10"
>
  <p className="text-xs font-medium text-gold tracking-widest uppercase mb-2">
    Our Menu
  </p>
  <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 dark:text-white leading-tight mb-3">
    Culinary Excellence
  </h2>
  <div className="w-12 h-0.5 bg-gold mx-auto"></div>
</motion.div>
```

**Changes**:
- Margin bottom: `mb-16` → `mb-10`
- Subtitle: `text-sm` → `text-xs`
- Title: `text-4xl md:text-5xl` → `text-3xl md:text-4xl`
- Line width: `w-16` → `w-12`
- Spacing: `mb-3` → `mb-2`, `mb-4` → `mb-3`

---

## Form Inputs (Compact)

```jsx
<div className="space-y-1.5">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Email Address
  </label>
  <input
    type="email"
    className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800
               border border-gray-200 dark:border-gray-700 rounded-lg text-sm
               text-gray-900 dark:text-white placeholder-gray-400
               focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20
               transition-all duration-300"
    placeholder="you@example.com"
  />
</div>
```

**Changes**:
- Padding: `px-4 py-3` → `px-3.5 py-2.5`
- Border radius: `rounded-xl` → `rounded-lg`
- Text size: `text-base` → `text-sm`
- Ring width: `ring-2` → `ring-1`
- Label spacing: `space-y-2` → `space-y-1.5`

---

## Stats Card (Compact)

```jsx
<div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        Total Bookings
      </p>
      <p className="text-2xl font-serif font-medium text-gray-900 dark:text-white">
        248
      </p>
    </div>
    <div className="p-2.5 bg-gold/10 rounded-lg">
      <FiCalendar className="w-5 h-5 text-gold" />
    </div>
  </div>
</div>
```

**Changes**:
- Padding: `p-6` → `p-5`
- Label: `text-sm` → `text-xs`
- Value: `text-3xl` → `text-2xl`
- Icon padding: `p-3` → `p-2.5`
- Icon size: `w-6 h-6` → `w-5 h-5`
- Border radius: `rounded-xl` → `rounded-lg`

---

## Grid Layouts (Compact)

```jsx
{/* 3-column grid - Reduced gap */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
  <Card />
</div>

{/* 2-column grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  <Card />
</div>

{/* 4-column grid */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
  <Card />
</div>
```

**Changes**:
- Gap: `gap-6` → `gap-5`, `gap-8` → `gap-6`

---

## Line Heights (Tighter)

```jsx
// Headings - Tight
<h1 className="leading-tight">     // 1.25
<h2 className="leading-tight">     // 1.25
<h3 className="leading-snug">      // 1.375

// Body - Relaxed (comfortable)
<p className="leading-relaxed">    // 1.625

// Small text - Normal
<p className="leading-normal">     // 1.5
```

---

## Complete Example Page

```jsx
function MenuPage() {
  return (
    <div className="pt-16">
      {/* Hero Section - Compact */}
      <section className="py-14 md:py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-medium text-gold tracking-widest uppercase mb-2">
            Our Menu
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white leading-tight mb-4">
            Culinary Excellence
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated selection of fine dishes
          </p>
        </div>
      </section>

      {/* Menu Grid - Compact spacing */}
      <section className="py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {/* Menu cards */}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## Quick Reference

### Typography
- Hero: `text-4xl md:text-5xl`
- Section: `text-3xl md:text-4xl`
- Card: `text-lg`
- Body: `text-base`

### Spacing
- Section: `py-12 md:py-14`
- Grid gap: `gap-5 md:gap-6`
- Card padding: `p-5`

### Buttons
- Padding: `px-5 py-2`
- Radius: `rounded-lg`
- Text: `text-sm`

### Navbar
- Height: `h-16`
- Logo: `text-xl`
- Links: `text-sm`

---

## Result

Your website will now feel:
- ✅ Compact and professional
- ✅ Balanced proportions
- ✅ Refined and elegant
- ✅ Not oversized
- ✅ Fine-dining style
- ✅ Comfortable to read
- ✅ Responsive across devices

All elements are **20-30% smaller** while maintaining elegance and readability!
