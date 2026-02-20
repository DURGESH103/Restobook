# 🚀 Quick Start Guide - RestoBook UI Redesign

## ⚡ Immediate Implementation Steps

### Step 1: Install Dependencies (2 minutes)
```bash
cd frontend
npm install framer-motion react-icons react-toastify
```

### Step 2: Import Global Styles (1 minute)
Update your `src/index.js`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';  // Add this line
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 3: Update App.js (3 minutes)
```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import new layouts
import Navbar from './components/layouts/Navbar';
import HeroSection from './components/layouts/HeroSection';

// Your existing pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
// ... other imports

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/booking" element={<Booking />} />
          {/* ... other routes */}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;
```

### Step 4: Update Home Page (5 minutes)
```jsx
import React from 'react';
import HeroSection from '../components/layouts/HeroSection';

function Home() {
  return (
    <div className="page-wrapper">
      <HeroSection />
      {/* Your other home sections */}
    </div>
  );
}

export default Home;
```

### Step 5: Update Menu Page (5 minutes)
```jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MenuCard from '../components/ui/MenuCard';
import { Spinner } from '../components/ui/Loader';
import { addToCart } from '../utils/cart';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Your API call
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      // Your API logic
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load menu');
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="page-wrapper flex-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container section">
        <h1 className="text-center" style={{ marginBottom: '3rem' }}>
          Our Menu
        </h1>
        <div className="grid-auto">
          {menuItems.map((item) => (
            <MenuCard
              key={item._id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
```

### Step 6: Update Booking Page (5 minutes)
```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingForm from '../components/ui/BookingForm';
import api from '../utils/api';

function Booking() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await api.post('/bookings', formData);
      toast.success('Booking submitted successfully!');
      navigate('/my-bookings');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <BookingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Booking;
```

### Step 7: Update Admin Page (5 minutes)
```jsx
import React from 'react';
import AdminDashboard from '../components/layouts/AdminDashboard';

function Admin() {
  return (
    <div className="page-wrapper">
      <AdminDashboard />
    </div>
  );
}

export default Admin;
```

## 🎨 Using Components

### Button Examples
```jsx
import { Button } from './components/ui';
import { FiSave } from 'react-icons/fi';

// Primary button
<Button variant="primary" onClick={handleClick}>
  Save
</Button>

// With loading
<Button variant="primary" loading={isLoading}>
  Submitting...
</Button>

// With icon
<Button variant="secondary" icon={<FiSave />}>
  Save Draft
</Button>
```

### Card Examples
```jsx
import { Card } from './components/ui';

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Glass effect
<Card glass>
  <h3>Glass Card</h3>
</Card>
```

### Input Examples
```jsx
import { Input } from './components/ui';
import { FiMail } from 'react-icons/fi';

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  icon={<FiMail />}
  error={errors.email}
  required
/>
```

### StatusBadge Examples
```jsx
import { StatusBadge } from './components/ui';

<StatusBadge status="pending" />
<StatusBadge status="confirmed" />
<StatusBadge status="rejected" />
```

## 🎯 Testing Checklist

- [ ] Dark/Light mode toggle works
- [ ] Navbar is responsive (test mobile menu)
- [ ] Hero section animations play smoothly
- [ ] Menu cards display correctly
- [ ] Booking form validation works
- [ ] Toast notifications appear
- [ ] Admin dashboard loads stats
- [ ] All buttons have hover effects
- [ ] Status badges show correct colors
- [ ] Loading states display properly

## 🐛 Common Issues & Fixes

### Issue: Styles not applying
**Fix**: Make sure `globals.css` is imported in `index.js`

### Issue: Framer Motion animations not working
**Fix**: Check that framer-motion is installed:
```bash
npm install framer-motion
```

### Issue: Icons not showing
**Fix**: Install react-icons:
```bash
npm install react-icons
```

### Issue: Dark mode not persisting
**Fix**: Check localStorage in browser DevTools. Clear if corrupted:
```javascript
localStorage.removeItem('theme');
```

### Issue: Components not found
**Fix**: Check import paths. Use relative paths:
```jsx
import Button from '../components/ui/Button';
// or
import { Button } from '../components/ui';
```

## 📱 Mobile Testing

Test on these breakpoints:
- 📱 Mobile: 375px, 414px
- 📱 Tablet: 768px, 1024px
- 💻 Desktop: 1280px, 1920px

## 🚀 Performance Tips

1. **Lazy load routes**:
```jsx
const Admin = lazy(() => import('./pages/Admin'));
```

2. **Optimize images**:
```jsx
<img loading="lazy" src={url} alt="description" />
```

3. **Use React.memo for expensive components**:
```jsx
export default React.memo(MenuCard);
```

## 📦 File Checklist

Created files:
- ✅ `theme/theme.js`
- ✅ `styles/globals.css`
- ✅ `components/ui/Button.js` + `.css`
- ✅ `components/ui/Card.js` + `.css`
- ✅ `components/ui/Input.js` + `.css`
- ✅ `components/ui/StatusBadge.js` + `.css`
- ✅ `components/ui/Loader.js` + `.css`
- ✅ `components/ui/BookingForm.js` + `.css`
- ✅ `components/ui/MenuCard.js` + `.css`
- ✅ `components/ui/index.js`
- ✅ `components/layouts/Navbar.js` + `.css`
- ✅ `components/layouts/HeroSection.js` + `.css`
- ✅ `components/layouts/AdminDashboard.js` + `.css`
- ✅ `components/hooks/useCustomHooks.js`

## 🎉 You're Done!

Your restaurant booking system now has a modern, premium UI! 

**Next Steps**:
1. Test all pages
2. Customize colors in `theme.js`
3. Add your own images
4. Deploy and enjoy! 🚀

---

**Need Help?** Check `REDESIGN_DOCUMENTATION.md` for detailed component usage.
