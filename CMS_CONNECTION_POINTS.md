# CMS Connection Points

This document explains where CMS data would connect in the website code.

## Overview

The website is structured to easily integrate with any headless CMS. All editable content is marked with `data-content` attributes and comments indicating CMS integration points.

## Text Content from CMS

### Home Page (`index.html`)

1. **Hero Section** (Lines 40-46)
   - Hero title: `data-content="hero.title"`
   - Hero subtitle: `data-content="hero.subtitle"`
   - Button text: `data-content="hero.buttonText"`

2. **Services Section** (Lines 48-56)
   - Services heading: `data-content="services.heading"`
   - Services list: `data-content="services.items"` (array from CMS)
   - Each service includes: icon, title, description

3. **Contact Section** (Lines 65-69)
   - Contact heading: `data-content="contact.heading"`
   - Contact description: `data-content="contact.description"`

4. **Footer** (Lines 101-123)
   - Business name, tagline, contact info, location
   - Currently static, but marked for potential CMS integration

### About Page (`about.html`)

1. **Page Title** (Line 42)
   - Page title: `data-content="pageTitle"`

2. **Content Paragraphs** (Line 50)
   - Paragraphs array: `data-content="content.paragraphs"`
   - Each paragraph is a separate text block in CMS

## Images from CMS

### Home Page (`index.html`)
- **Main Image** (Line 61)
  - Image element: `data-content="image"`
  - CMS provides: `{ src: "URL", alt: "text", width: 1000, height: 600 }`
  - Image comes from CMS media library

### About Page (`about.html`)
- **About Image** (Line 59)
  - Image element: `data-content="image"`
  - CMS provides: `{ src: "URL", alt: "text", width: 1000, height: 600 }`
  - Image comes from CMS media library

## JavaScript Integration Points

### `js/main.js`

1. **`loadContent()` function** (Lines 76-97)
   - **CMS INTEGRATION POINT**: Replace `fetch(contentPath)` with CMS API call
   - Currently loads from local JSON files
   - Would call CMS API endpoint instead
   - Example: `fetch('https://api.cms.com/entries?content_type=homePage')`

2. **`injectContent()` function** (Lines 103-175)
   - Handles injection of CMS data into HTML
   - Works with CMS data structure as-is
   - May need transformation for CMS field names

3. **`createTemplateElement()` function** (Lines 189-227)
   - Creates HTML elements from CMS array data
   - Handles service cards and paragraphs
   - CMS provides structured data, function generates HTML

## How It Works

1. **Current Flow** (JSON files):
   ```
   HTML with data-content attributes
   → JavaScript loads JSON
   → JavaScript injects content into HTML
   ```

2. **CMS Flow** (when integrated):
   ```
   HTML with data-content attributes
   → JavaScript calls CMS API
   → CMS returns structured data
   → JavaScript injects content into HTML
   ```

## Data Structure

CMS should provide data in this structure (or transform to match):

```json
{
  "hero": {
    "title": "Text from CMS",
    "subtitle": "Text from CMS",
    "buttonText": "Text from CMS"
  },
  "services": {
    "heading": "Text from CMS",
    "items": [
      {
        "icon": "📋",
        "title": "Text from CMS",
        "description": "Text from CMS"
      }
    ]
  },
  "image": {
    "src": "https://cdn.cms.com/image.jpg",
    "alt": "Text from CMS",
    "width": 1000,
    "height": 600
  }
}
```

## Notes

- All placeholders remain visible until CMS is integrated
- `data-content` attributes indicate where CMS data connects
- Comments in code mark all CMS integration points
- Images use `data-content="image"` for CMS media library
- Text uses `data-content="path.to.field"` for CMS text fields


