# GitHub Pages Deployment Guide

This guide will help you deploy your Astro site to GitHub Pages.

## Prerequisites

- Git repository pushed to GitHub
- Repository name is `ddinggul.github.io` (or your-username.github.io)

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Add complete portfolio and blog website"

# Push to main branch
git push origin main
```

### 2. Configure GitHub Pages Settings

1. Go to your repository on GitHub: `https://github.com/ddinggul/ddinggul.github.io`

2. Click on **Settings** (top menu)

3. In the left sidebar, click **Pages**

4. Under **Source**, select:
   - **Source**: `GitHub Actions` (NOT "Deploy from a branch")

   ![GitHub Pages Source](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/configure-github-actions.webp)

5. Save (it should save automatically)

### 3. Wait for Deployment

1. Go to the **Actions** tab in your repository

2. You should see a workflow run called "Deploy to GitHub Pages"

3. Click on it to see the progress

4. Wait for it to complete (usually 1-2 minutes)

5. Once complete with a green checkmark ✓, your site is live!

### 4. Access Your Site

Visit: `https://ddinggul.github.io`

## Troubleshooting

### Error: "Jekyll is trying to build"

**Problem**: GitHub is trying to use Jekyll instead of GitHub Actions

**Solution**:
1. Make sure you selected "GitHub Actions" as the source (not "Deploy from a branch")
2. The `.nojekyll` file in the root directory tells GitHub not to use Jekyll
3. If the error persists, try pushing a new commit:
   ```bash
   git commit --allow-empty -m "Trigger deployment"
   git push origin main
   ```

### Error: "No such file or directory - /github/workspace/docs"

**Problem**: GitHub is looking for a docs folder (Jekyll default)

**Solution**:
- Change the Source to "GitHub Actions" in Settings → Pages
- This tells GitHub to use our custom workflow instead

### Error: "404 Page Not Found"

**Problem**: Site is deployed but shows 404

**Solution**:
1. Check that `astro.config.mjs` has the correct site URL:
   ```javascript
   site: 'https://ddinggul.github.io'
   ```
2. Make sure the workflow completed successfully
3. Wait a few minutes for DNS propagation
4. Clear your browser cache and try again

### Error: "Workflow fails to build"

**Problem**: Build errors in GitHub Actions

**Solution**:
1. Click on the failed workflow in the Actions tab
2. Expand the logs to see the error
3. Common issues:
   - TypeScript errors: Run `npm run build` locally first
   - Missing dependencies: Make sure `package.json` is committed
   - Node version: Workflow uses Node 20+

### CSS/JS Not Loading

**Problem**: Site loads but no styling

**Solution**:
- Ensure `.nojekyll` file exists in the root
- Check browser console for errors
- Verify the site URL in `astro.config.mjs` is correct

## Manual Deployment (If Automatic Fails)

If the automatic deployment doesn't work, you can deploy manually:

```bash
# Build locally
npm run build

# Install gh-pages package
npm install -D gh-pages

# Deploy dist folder
npx gh-pages -d dist -b gh-pages

# Then in GitHub Settings → Pages:
# Source: "Deploy from a branch"
# Branch: "gh-pages" / "(root)"
```

## Updating Your Site

Every time you push to the `main` branch, GitHub Actions will automatically rebuild and deploy your site.

```bash
# Make changes to your files
# ...

# Commit and push
git add .
git commit -m "Update content"
git push origin main

# Wait 1-2 minutes, changes will be live!
```

## Verification Checklist

Before deploying, make sure:

- [ ] `.nojekyll` file exists in root directory
- [ ] `.github/workflows/deploy.yml` exists
- [ ] `astro.config.mjs` has correct site URL
- [ ] `npm run build` works locally without errors
- [ ] All files are committed to Git
- [ ] Repository is public (or you have GitHub Pro for private repos)

## Important Files for Deployment

```
ddinggul.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── .nojekyll                   # Tells GitHub not to use Jekyll
├── astro.config.mjs            # Must have correct 'site' URL
└── package.json                # Dependencies for build
```

## Expected Workflow Output

When the workflow runs successfully, you should see:

```
✓ Checkout repository
✓ Setup Node.js
✓ Install dependencies
✓ Build Astro site
✓ Upload artifact
✓ Deploy to GitHub Pages
```

## Getting Help

If you encounter issues:

1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review the [Astro deployment guide](https://docs.astro.build/en/guides/deploy/github/)
3. Check workflow logs in the Actions tab
4. Ensure your repository is public or you have the right permissions

## Next Steps After Deployment

Once your site is live:

1. **Update Content**:
   - Add real information to CV, About, Contact pages
   - Write new blog posts in `src/content/blog/`
   - Update project information

2. **Custom Domain** (Optional):
   - Buy a domain name
   - Add a `CNAME` file to `public/` with your domain
   - Configure DNS settings
   - Update in GitHub Settings → Pages → Custom domain

3. **Analytics** (Optional):
   - Add Google Analytics or Plausible
   - Edit `src/layouts/BaseLayout.astro` to include tracking code

4. **SEO**:
   - Submit sitemap to Google Search Console
   - Verify ownership
   - Monitor search performance

---

Your site should now be live at **https://ddinggul.github.io**! 🎉
