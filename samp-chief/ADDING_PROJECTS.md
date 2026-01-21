# Adding Projects to Sample Chief

## Overview

Projects are managed through a data file and appear in multiple locations:
- **Featured Grid**: Up to 5 projects displayed prominently on the projects page
- **Sidebar**: All projects listed for desktop navigation
- **Mobile List**: All projects shown in the "All" tab on mobile

## Project Types

### Featured Projects
- Appear in the main grid layout
- Also appear in sidebar and mobile list
- Require a `featured` field with position 1-5

### Non-Featured Projects
- Appear only in sidebar and mobile list
- Do not require a `featured` field
- Good for smaller or less prominent work

## Adding a New Project

### 1. Add Project Assets
Place images in `/public/assets/projects/[project-folder]/`:
```
/public/assets/projects/new-project/
  ├── cover.jpg       (required: grid thumbnail)
  ├── hero.jpg        (optional: project page hero)
  └── additional/     (optional: detail page images)
```

### 2. Update Data File
Add project object to `src/data/events.ts` in the `events` array:

```typescript
{
  title: "Project Name",
  projectcard: "/assets/projects/project-folder/cover.jpg",
  description: "Project description for detail page",
  slug: "project-url-slug",
  imageFolder: "project-folder",
  ethos: "Short tagline",
  location: "City, Country",
  services: "Service types provided"
}
```

### 3. For Featured Projects
Add the featured field to control grid position:
```typescript
featured: { position: 1 }, // Positions 1-5 available
```

### 4. For Detail Page Content
Add contentBlocks for rich project pages:
```typescript
contentBlocks: [
  { type: 'image', src: "/path/to/image.jpg", gridSpan: "col-span-2 row-span-2" },
  { type: 'text', html: "<p>Text content</p>", gridSpan: "col-span-2" },
  { type: 'video', src: "/path/to/video.mp4", gridSpan: "col-span-1 row-span-1" }
]
```

## Required Fields

- **title**: Project name (appears everywhere)
- **projectcard**: Path to grid thumbnail image
- **description**: Full project description
- **slug**: URL identifier (must be unique)
- **imageFolder**: Folder name in assets directory

## Optional Fields

- **featured**: Grid position object for featured projects
- **brandLogo**: Client/brand logo path
- **ethos**: Short tagline (shows in mobile list)
- **location**: Project location
- **services**: Services provided
- **heroImage**: Hero image for project page
- **contentBlocks**: Rich content for project detail page

## Featured Grid Positions

The featured grid has 5 fixed positions with specific layouts:

- **Position 1**: Large vertical card
- **Position 2**: Standard size card  
- **Position 3**: Large square card
- **Position 4**: Standard size card
- **Position 5**: Full width card

## Grid Layout Reference

### Desktop Layout (4 columns)
```
[1]   [2] [3---]
[1]   [4] [3---]
[5-----------]
```

### Mobile Layout (2 columns)
```
[1------]
[2] [3]
[4------]
[5------]
```

## Build Process

After adding a project:
1. Run `yarn build` to generate static pages
2. Project page automatically created at `/projects/[slug]`
3. Project appears in navigation immediately

## File Structure

```
src/data/events.ts           # Project data
public/assets/projects/      # Project images
app/projects/               # Projects page components
  ├── page.tsx              # Main projects page
  ├── ProjectGrid.tsx       # Featured grid component
  └── [slug]/page.tsx       # Individual project pages
```