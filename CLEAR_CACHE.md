# Clear Browser Cache & LocalStorage

If you're seeing dark mode colors in light mode, please:

1. Open the browser DevTools (F12)
2. Go to "Application" or "Storage" tab
3. Clear localStorage by clicking "Clear All"
4. Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

OR run this in the browser console:
```javascript
localStorage.clear();
location.reload();
```

This will reset the theme to light mode by default.
