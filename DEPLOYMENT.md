# GitHub Pages Deployment Guide

This guide will help you deploy the Bitcoin Buy Indicator to GitHub Pages.

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git Repository**: Your project should be in a GitHub repository
3. **Repository Name**: Make sure your repository is named `Bitcoin-Buy` (or update the homepage in package.json)

## Step 1: Update Package.json

The project is already configured for GitHub Pages deployment. Make sure your `package.json` has:

```json
{
  "homepage": "https://yourusername.github.io/Bitcoin-Buy",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "gh-pages": "^6.3.0"
  }
}
```

**Important**: Replace `yourusername` with your actual GitHub username.

## Step 2: Deploy to GitHub Pages

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

This command will:
- Build the production version (`npm run build`)
- Create/update a `gh-pages` branch
- Push the built files to GitHub Pages

## Step 3: Configure GitHub Repository

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose the **gh-pages** branch
5. Click **Save**

## Step 4: Access Your Website

Your website will be available at:
```
https://yourusername.github.io/Bitcoin-Buy/
```

Replace `yourusername` with your actual GitHub username.

## Updating the Deployment

To update your live website:

1. Make your changes to the code
2. Run the deployment command:
   ```bash
   npm run deploy
   ```

The changes will be live in a few minutes.

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the `public/` folder with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Update the `homepage` field in `package.json` to your custom domain

## Troubleshooting

### Common Issues:

1. **404 Error**: Make sure the repository name matches the homepage URL
2. **Build Failures**: Check that all dependencies are installed with `npm install`
3. **Deployment Errors**: Ensure you have push permissions to the repository

### Checking Deployment Status:

1. Go to your repository on GitHub
2. Click on the **Actions** tab to see deployment history
3. Check the **gh-pages** branch to see the deployed files

## Files Generated

The deployment process creates these important files:

- **build/index.html**: The main HTML file with optimized metadata
- **build/static/**: Contains CSS, JS, and other assets
- **gh-pages branch**: Contains the deployed website files

## SEO and Social Media

The build includes optimized metadata for:

- **SEO**: Title, description, keywords
- **Open Graph**: Facebook sharing
- **Twitter Cards**: Twitter sharing
- **Progressive Web App**: Manifest file for mobile installation

Your Bitcoin Buy Indicator is now ready for the world! 🚀