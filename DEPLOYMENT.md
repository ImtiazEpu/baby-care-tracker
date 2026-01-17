# Deployment Guide for Netlify via GitHub

This guide will help you deploy the Baby Care & Vaccine Tracker application to Netlify using GitHub.

## Prerequisites

- GitHub account
- Netlify account (free tier is sufficient)
- Git installed on your local machine

## Step 1: Push to GitHub

1. **Initialize Git repository** (if not already done):
```bash
git init
```

2. **Add all files to Git**:
```bash
git add .
```

3. **Commit your changes**:
```bash
git commit -m "Initial commit - Baby Care & Vaccine Tracker"
```

4. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name your repository (e.g., `baby-care-tracker`)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

5. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/baby-care-tracker.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Netlify UI (Recommended)

1. **Go to Netlify**:
   - Visit https://www.netlify.com/
   - Sign in or create an account

2. **Import Project**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select your repository (`baby-care-tracker`)

3. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Build environment variables**: None required

4. **Deploy**:
   - Click "Deploy site"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at: `https://random-name-123456.netlify.app`

5. **Optional: Custom Domain**:
   - In Site settings → Domain management
   - Add your custom domain
   - Follow Netlify's DNS configuration instructions

### Option B: Netlify CLI

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Initialize and Deploy**:
```bash
netlify init
# Follow the prompts to connect your GitHub repo
```

4. **Deploy to Production**:
```bash
netlify deploy --prod
```

## Step 3: Verify Deployment

1. Open your Netlify site URL
2. Test all features:
   - Add a baby profile
   - View dashboard
   - Track vaccines, milestones, and growth
   - Test dark mode toggle
   - Test shareable links

## Automatic Deployments

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to the `main` branch
- Build and deploy pull requests for preview
- Show build logs and errors

## Build Configuration

The project includes:

- `netlify.toml` - Netlify configuration file
- `public/_redirects` - SPA routing configuration

These files ensure proper routing for the React single-page application.

## Environment Variables

This application doesn't require any environment variables. All data is stored locally in the browser using LocalStorage.

## Troubleshooting

### Build Fails
- Check the Netlify build logs
- Ensure all dependencies are in `package.json`
- Try building locally with `npm run build`

### 404 on Routes
- Ensure `_redirects` file exists in `public/` folder
- Verify `netlify.toml` configuration

### Styles Not Loading
- Clear Netlify cache and redeploy
- Check if CSS files are in the `dist` folder after build

## Performance

Expected build time: ~1-2 minutes
Build output size: ~733 KB (221 KB gzipped)

## Support

For Netlify-specific issues, check:
- Netlify Docs: https://docs.netlify.com/
- Netlify Support: https://www.netlify.com/support/

---

**Copyright © 2026 - Developed by MatrixLab**
