# RestoBook - Modern UI/UX Redesign Documentation

## 📁 New Folder Structure

```
frontend/src/
├── components/
│   ├── ui/                          # Reusable UI components
│   │   ├── Button.js
│   │   ├── Button.css
│   │   ├── Card.js
│   │   ├── Card.css
│   │   ├── Input.js
│   │   ├── Input.css
│   │   ├── StatusBadge.js
│   │   ├── StatusBadge.css
│   │   ├── Loader.js
│   │   ├── Loader.css
│   │   ├── BookingForm.js
│   │   └── BookingForm.css
│   ├── layouts/                     # Layout components
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── AdminDashboard.js
│   │   └── AdminDashboard.css
│   ├── hooks/                       # Custom React hooks
│   │   └── useCustomHooks.js
│   └── [existing components]
├── theme/                           # Design system
│   └── theme.js
├── styles/                          # Global styles
│   └── globals.css
└── [existing folders]
```

## 🎨 Design System

### Color Palette
- **Primary Gold**: #D4AF37
- **Gold Light**: #E5C158
- **Gold Dark**: #B8941F
- **Status Colors**:
  - Pending: #F59E0B (Yellow)
  - Confirmed: #10B981 (Green)
  - Rejected: #EF4444 (Red)
  - Cancelled: #6B7280 (Gray)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Poppins (sans-serif)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

### Border Radius
- sm: 0.5rem (8px)
- md: 0.75rem (12px)
- lg: 1rem (16px)
- xl: 1.5rem (24px)
- full: 9999px (pill shape)

## 🧩 Component Usage

### Button Component
```jsx
import Button from './components/ui/Button';

// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// With loading state
<Button variant="primary" loading={isLoading}>
  Submit
</Button>

// With icon
<Button variant="secondary" icon={<FiUser />}>
  Profile
</Button>
```

**Variants**: primary, secondary, ghost, danger
**Sizes**: sm, md, lg

### Card Component
```jsx
import Card from './components/ui/Card';

// Default card
<Card>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// Glass morphism card
<Card glass>
  <h3>Glass Card</h3>
</Card>

// Without hover effect
<Card hover={false}>
  <p>Static card</p>
</Card>
```

### Input Component (Floating Labels)
```jsx
import Input from './components/ui/Input';
import { FiMail } from 'react-icons/fi';

<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  icon={<FiMail />}
  required
/>
```

### StatusBadge Component
```jsx
import StatusBadge from './components/ui/StatusBadge';

<StatusBadge status="pending" />
<StatusBadge status="confirmed" />
<StatusBadge status="rejected" />
```

### Loader Components
```jsx
import Loader, { Spinner, SkeletonCard, SkeletonTable } from './components/ui/Loader';

// Full screen loader
<Loader fullScreen />

// Spinner only
<Spinner size="lg" />

// Skeleton loaders
<SkeletonCard />
<SkeletonTable rows={5} />
```

## 🎯 Custom Hooks

### useApi Hook
```jsx
import { useApi } from './components/hooks/useCustomHooks';

const { data, loading, error, refetch } = useApi(
  () => fetch('/api/bookings').then(res => res.json()),
  []
);
```

### useForm Hook
```jsx
import { useForm } from './components/hooks/useCustomHooks';

const validate = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Email is required';
  return errors;
};

const { values, errors, handleChange, handleSubmit } = useForm(
  { email: '', password: '' },
  validate
);
```

### useLocalStorage Hook
```jsx
import { useLocalStorage } from './components/hooks/useCustomHooks';

const [theme, setTheme] = useLocalStorage('theme', 'light');
```

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Default: Mobile (< 640px) */

@media (min-width: 640px) {
  /* Small tablets */
}

@media (min-width: 768px) {
  /* Tablets */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large desktop */
}
```

## 🎭 Animation Guidelines

### Framer Motion Examples
```jsx
import { motion } from 'framer-motion';

// Fade in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Hover effect
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>

// Stagger children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

## 🔧 Implementation Steps

### Step 1: Update Global Styles
```jsx
// In your main index.js or App.js
import './styles/globals.css';
```

### Step 2: Replace Navbar
```jsx
// Update your App.js or layout
import Navbar from './components/layouts/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* Your routes */}
    </>
  );
}
```

### Step 3: Update Booking Page
```jsx
import BookingForm from './components/ui/BookingForm';

function BookingPage() {
  const handleSubmit = async (formData) => {
    // Your API call
    await api.createBooking(formData);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <BookingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
```

### Step 4: Update Admin Dashboard
```jsx
import AdminDashboard from './components/layouts/AdminDashboard';

function AdminPage() {
  return (
    <div className="page-wrapper">
      <AdminDashboard />
    </div>
  );
}
```

## 🎨 CSS Variables Usage

```css
/* Use in your custom CSS */
.my-component {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-premium);
  transition: var(--transition-normal);
}

.my-component:hover {
  border-color: var(--gold);
}
```

## 🚀 Performance Optimization

### Lazy Loading Components
```jsx
import { lazy, Suspense } from 'react';
import Loader from './components/ui/Loader';

const AdminDashboard = lazy(() => import('./components/layouts/AdminDashboard'));

function App() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <AdminDashboard />
    </Suspense>
  );
}
```

### Image Optimization
```jsx
// Use lazy loading for images
<img 
  src={imageUrl} 
  alt="Description" 
  loading="lazy"
  style={{ objectFit: 'cover' }}
/>
```

## 📋 Best Practices

1. **Component Structure**
   - Keep components small and focused
   - Separate logic from presentation
   - Use custom hooks for reusable logic

2. **Styling**
   - Use CSS variables for theming
   - Avoid inline styles
   - Follow mobile-first approach

3. **State Management**
   - Use Context API for global state
   - Keep local state when possible
   - Avoid prop drilling

4. **Performance**
   - Lazy load routes and heavy components
   - Use React.memo for expensive renders
   - Optimize images and assets

5. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels where needed
   - Ensure keyboard navigation works

## 🎯 Next Steps

1. **Update existing pages** with new components
2. **Implement toast notifications** using react-toastify
3. **Add page transitions** with Framer Motion
4. **Create more reusable components** (Modal, Dropdown, etc.)
5. **Add unit tests** for components
6. **Optimize bundle size** with code splitting

## 📦 Required Dependencies

```bash
npm install framer-motion react-icons react-toastify
```

## 🎨 Color Usage Guide

```jsx
// In your components
import { theme } from '../theme/theme';

const styles = {
  primary: theme.colors.primary.gold,
  background: theme.colors.dark.bg,
  shadow: theme.shadows.premium
};
```

---

**Note**: This redesign maintains backward compatibility while providing a modern, scalable foundation for future development.
