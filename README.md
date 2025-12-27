# Business Website with CMS

A clean, modern static website with content management via Netlify CMS.

## Features

- ✅ Modern, responsive design
- ✅ SEO optimized
- ✅ Accessible (WCAG compliant)
- ✅ Content managed via JSON files
- ✅ Netlify CMS integration for easy editing
- ✅ Netlify Forms for contact submissions
- ✅ No build tools required

## Quick Start

1. **Deploy to Netlify** - See `DEPLOYMENT_GUIDE.md` for detailed instructions
2. **Enable Identity & Git Gateway** - Required for CMS to work
3. **Access Admin** - Go to `/admin` after setup

## File Structure

```
/
 ├── admin/              # Netlify CMS files
 │   ├── index.html      # CMS interface
 │   └── config.yml      # CMS configuration
 ├── content/            # Content files (editable via CMS)
 │   ├── home.json
 │   └── about.json
 ├── css/
 │   └── styles.css
 ├── js/
 │   └── main.js
 ├── images/             # Image uploads go here
 ├── index.html
 ├── about.html
 └── DEPLOYMENT_GUIDE.md
```

## Editing Content

### Via CMS (Recommended for clients):
1. Go to `https://your-site.netlify.app/admin`
2. Log in with Netlify Identity
3. Edit content in the visual interface
4. Save changes

### Via Code:
- Edit JSON files in `/content/` folder
- Changes will be reflected after deployment

## Deployment

See `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions.

## Requirements

- GitHub account (for repository)
- Netlify account (free tier works)
- Public GitHub repository (required for Git Gateway)


