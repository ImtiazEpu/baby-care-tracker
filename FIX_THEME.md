# Fix Theme Issue - Step by Step

## CRITICAL: Follow these steps exactly

### Step 1: Clear Everything
Open your browser and paste this in the console (F12):

```javascript
// Clear all storage
localStorage.clear();
sessionStorage.clear();

// Force remove dark class
document.documentElement.classList.remove('dark');
document.body.classList.remove('dark');

// Reload
location.reload();
```

### Step 2: After Reload, Verify
Run this in console:

```javascript
console.log({
  htmlClasses: document.documentElement.className,
  bodyClasses: document.body.className,
  hasDark: document.documentElement.classList.contains('dark'),
  theme: localStorage.getItem('theme')
});
```

Expected output:
```
{
  htmlClasses: "",  // or just "lang-en", NO 'dark'
  bodyClasses: "",
  hasDark: false,
  theme: null  // or "light"
}
```

### Step 3: If Still Not Working
Hard refresh:
- Mac: Cmd + Shift + R
- Windows: Ctrl + Shift + R

### Step 4: Nuclear Option
If text is still white:

```javascript
// Force override in console
document.body.style.color = '#111827';
document.querySelectorAll('h1, h2, h3, p, div').forEach(el => {
  if (!el.classList.contains('text-white')) {
    el.style.color = '#111827';
  }
});
```

## What Was Fixed:
1. ✅ Tailwind v4 dark mode configured with `@variant dark (.dark &);`
2. ✅ Added !important to force color overrides
3. ✅ Default to light mode
4. ✅ Pre-load script removes dark class
5. ✅ Theme context forces remove before applying

## Dev Mode:
```bash
npm run dev
```

Then open http://localhost:5173 and follow Step 1 above.
