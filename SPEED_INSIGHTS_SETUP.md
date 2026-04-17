# Vercel Speed Insights Integration - React/Vanilla JS

## What Was Done

Successfully integrated Vercel Speed Insights into your project using the npm package with a modern bundler setup.

## Changes Made

### 1. Installed Dependencies
- `@vercel/speed-insights` - Already installed
- `vite` - Added as dev dependency for bundling

### 2. Created Files
- **`speed-insights.js`** - Module that initializes Speed Insights using the npm package
- **`vite.config.js`** - Vite configuration for bundling your multi-page site

### 3. Updated Files
- **`package.json`** - Added scripts for development and build
- **`index.html`** - Added module script tag for Speed Insights
- **`services.html`** - Added module script tag for Speed Insights

## How to Use

### Development
```bash
npm run dev
```
This starts the Vite dev server at http://localhost:8080/

### Build for Production
```bash
npm run build
```
This creates optimized production files in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
This serves the production build locally for testing.

## How It Works

1. The `speed-insights.js` module imports the `injectSpeedInsights` function from `@vercel/speed-insights`
2. This function is called when the page loads
3. Vite bundles the module and makes it available to your HTML files
4. Speed Insights automatically tracks Core Web Vitals and sends data to Vercel

## Deployment

When you deploy to Vercel:
1. Run `npm run build` to create the production bundle
2. Deploy the `dist` folder
3. Speed Insights will automatically start collecting performance data
4. View insights in your Vercel dashboard

## Note

This setup uses the vanilla JavaScript version of Speed Insights, not the React component. To use the React component (`<SpeedInsights />`), you would need to convert your entire site to a React application (using Next.js, Vite + React, or similar).

The current implementation is the recommended approach for HTML/JS sites and provides the same functionality.
