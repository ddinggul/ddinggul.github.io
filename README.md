# Junseo Choi - Personal Website

A modern, clean portfolio and blog website built with Astro, showcasing research in computational linguistics, phonetics, and AI for language learning.

**Live Site:** [https://ddinggul.github.io](https://ddinggul.github.io)

## Features

- **Portfolio Pages**: Home, About, Projects, CV, Contact
- **Blog System**: Markdown-based blog with tags, categories, and search
- **Bilingual Support**: Korean/English language toggle with localStorage persistence
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **SEO Optimized**: Meta tags, Open Graph, sitemap, and RSS feed
- **Responsive Design**: Mobile-first, works on all devices
- **Academic Style**: Clean, minimal, typography-focused design
- **Fast Performance**: Static site generation with minimal JavaScript

## Tech Stack

- **Framework**: [Astro](https://astro.build) 4.15+
- **Language**: TypeScript
- **Styling**: CSS with custom properties (no framework)
- **Content**: Markdown with frontmatter
- **Deployment**: GitHub Pages with GitHub Actions
- **Integrations**: Sitemap, RSS

## Project Structure

```
ddinggul.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   ├── favicon.svg             # Site favicon
│   ├── og-image.png            # Open Graph image
│   └── .nojekyll              # Disable Jekyll processing
├── src/
│   ├── components/            # Reusable components
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   └── ThemeToggle.astro
│   ├── content/              # Content collections
│   │   ├── blog/            # Blog posts (Markdown)
│   │   └── config.ts        # Content schema
│   ├── layouts/             # Page layouts
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── pages/              # Page routes
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── index.astro     # Home
│   │   ├── about.astro
│   │   ├── projects.astro
│   │   ├── cv.astro
│   │   ├── contact.astro
│   │   └── rss.xml.ts     # RSS feed
│   ├── styles/
│   │   └── global.css     # Global styles & design system
│   └── utils/
│       └── helpers.ts     # Utility functions
├── astro.config.mjs       # Astro configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## Local Development

### Prerequisites

- Node.js 20+ (recommended: 22+)
- npm 9+

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ddinggul/ddinggul.github.io.git
   cd ddinggul.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

4. **Build for production**
   ```bash
   npm run build
   ```

   Output will be in the `dist/` directory

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes type checking)
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## Content Management

### Adding a New Blog Post

1. Create a new Markdown file in `src/content/blog/`:
   ```bash
   src/content/blog/my-new-post.md
   ```

2. Add frontmatter and content:
   ```markdown
   ---
   title: "My New Post Title"
   description: "A brief description of the post"
   pubDate: 2024-12-01
   tags: ["tag1", "tag2", "tag3"]
   draft: false
   ---

   Your content here in Markdown...
   ```

3. The post will automatically appear in the blog index and RSS feed

### Adding a New Project

Edit `src/pages/projects.astro` and add a new object to the `projects` array:

```javascript
{
  title: 'Project Name',
  description: 'Project description...',
  stack: ['Tech1', 'Tech2', 'Tech3'],
  status: 'Active', // or 'In Progress', 'Experimental'
  category: 'Research', // or 'Application'
  github: 'https://github.com/username/repo',
  demo: 'https://demo-url.com', // optional
}
```

### Updating Personal Information

- **About page**: Edit `src/pages/about.astro`
- **CV**: Edit `src/pages/cv.astro`
- **Contact**: Edit `src/pages/contact.astro`
- **Footer**: Edit `src/components/Footer.astro`

## Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Automatic Deployment**
   - GitHub Actions will automatically build and deploy
   - Check the "Actions" tab to monitor progress
   - Site will be live at `https://ddinggul.github.io`

### Manual Deployment

If automatic deployment fails, you can deploy manually:

```bash
npm run build
# Then manually upload the dist/ folder to GitHub Pages
```

### Deployment Troubleshooting

**Issue: Site shows 404**
- Ensure GitHub Pages source is set to "GitHub Actions"
- Check that the workflow completed successfully
- Verify `astro.config.mjs` has correct `site` URL

**Issue: CSS/JS not loading**
- The `.nojekyll` file should exist in `public/`
- Check browser console for errors

**Issue: Workflow fails**
- Ensure Node.js version is 20+ in workflow
- Check that all dependencies are in `package.json`
- Review workflow logs in GitHub Actions tab

## Customization

### Colors

Edit CSS custom properties in `src/styles/global.css`:

```css
:root {
  --color-accent: #2c5282;     /* Primary accent color */
  --color-bg: #ffffff;         /* Background color */
  /* ... */
}
```

### Fonts

Add font imports in `src/layouts/BaseLayout.astro`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet" />
```

Then update `--font-sans` in `global.css`

### Logo/Favicon

Replace `public/favicon.svg` with your own SVG or PNG icon

### Social Links

Update links in:
- `src/components/Footer.astro`
- `src/pages/contact.astro`

## SEO & Analytics

### Meta Tags

Meta tags are configured in `src/layouts/BaseLayout.astro`. Each page sets its own:
- Title
- Description
- Open Graph image
- Canonical URL

### Sitemap

Automatically generated at `/sitemap-index.xml` and `/sitemap-0.xml`

### RSS Feed

Available at `/rss.xml` for blog subscribers

### Adding Analytics

To add Google Analytics, Plausible, or other analytics:

1. Edit `src/layouts/BaseLayout.astro`
2. Add tracking script in the `<head>` section

## Performance

- **Lighthouse Score**: 95+ (aim for 100)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

Performance is optimized through:
- Static site generation
- Minimal JavaScript
- Optimized CSS
- Image optimization (when images are added)

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

This is a personal website, but if you find bugs or have suggestions:

1. Open an issue describing the problem
2. Or submit a pull request with a fix

## License

© 2024 Junseo Choi. All rights reserved.

The code is available for reference and learning, but please do not directly copy the content or design for your own site.

## Contact

- Email: litterrariuschwy@gmail.com
- GitHub: [@ddinggul](https://github.com/ddinggul)
- Website: [ddinggul.github.io](https://ddinggul.github.io)

---

Built with [Astro](https://astro.build) 🚀
