# Quick Fix for Consistency Issues

## Run These Commands

### 1. Clear All Caches
```bash
# Stop the dev server (Ctrl+C)

# Clear npm cache
npm cache clean --force

# Remove cache folders
rm -rf node_modules/.cache
rm -rf build
rm -rf .cache

# Reinstall (optional, if issues persist)
# npm install
```

### 2. Restart Dev Server
```bash
npm start
```

### 3. Clear Browser Cache

**On localhost device:**
- Press `Ctrl + Shift + R` (hard refresh)
- Or: DevTools (F12) → Right-click refresh → "Empty Cache and Hard Reload"

**On IP device (10.50.113.53):**
- Clear browser cache completely
- Close and reopen browser
- Navigate to `http://10.50.113.53:3000`

### 4. Verify Fonts Loaded

Open browser console on BOTH URLs and run:
```javascript
// Check fonts
document.fonts.check('1em Playfair Display')  // Should be true
document.fonts.check('1em Inter')             // Should be true

// Check font weight
const h1 = document.querySelector('h1');
console.log(window.getComputedStyle(h1).fontWeight);  // Should be "500"
```

### 5. Force Light Mode (for testing)

If one appears darker, force light mode:
```javascript
localStorage.removeItem('theme');
document.documentElement.classList.remove('dark');
location.reload();
```

## What Was Fixed

1. ✅ Added cache control headers in `index.html`
2. ✅ Added CSS reset in `index.css`
3. ✅ Forced font-weight with `!important`
4. ✅ Added font-synthesis prevention
5. ✅ Added text-size-adjust prevention

## Result

Both URLs should now render identically:
- Same font sizes
- Same font weights (500 for headings)
- Same spacing
- Same colors
- No bold differences

## If Still Different

Try incognito/private mode on both URLs to rule out extensions or cached data.
