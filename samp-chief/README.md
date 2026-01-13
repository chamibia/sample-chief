This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Project Structure & Patterns

This codebase uses a container/presenter (smart/dumb) component pattern for maintainability and scalability:

- **Data logic** (fetching, transformation, slicing, calculations) is handled in custom hooks or container functions (e.g., `useProjectDetailData.ts`, `useProjectsListingData.ts`).
- **UI components** (pages, presentational components) focus only on rendering and layout, receiving data as props.

### Why?
- Makes it easier to add features (sorting, filtering, pagination, new layouts) by updating hooks, not UI code.
- Improves testability and reusability of data logic.
- Keeps UI components clean and focused.

### Where to add new logic
- If you need to add or change data transformation, create or update a hook in the relevant folder (e.g., `app/projects/useProjectsListingData.ts`).
- For new UI, add or update presentational components/pages as usual.

See the `app/projects/` directory for examples.


## Adding New Projects

To add a new project to the site, follow these steps:

### 1. Add Project Data
Add a new project object to the `events` array in `src/data/events.ts`:

```typescript
{
  title: "Project Name",
  projectcard: "/assets/projects/project-folder/cover.jpg",
  brandLogo: "/assets/brands/brand-logo.png", // Optional
  description: "Brief description of the project...",
  slug: "project-name", // URL-friendly identifier
  imageFolder: "project-folder",
  gridSpan: "col-span-1 row-span-1", // Grid layout (optional)
  colStart: "col-start-1", // Grid column position (optional)
  rowStart: "row-start-1", // Grid row position (optional)
  ethos: "Project philosophy or approach", // Optional
  location: "City, Country", // Optional
  services: "Services provided", // Optional
  heroImage: "/assets/projects/project-folder/hero.jpg", // Optional
  images: [ // Optional array of additional images
    {
      src: "/assets/projects/project-folder/image1.jpg",
      gridSpan: "col-span-2 row-span-1" // Optional grid layout
    }
  ]
}
```

### 2. Add Project Assets
Create a new folder in `public/assets/projects/` with your project slug name:
- `public/assets/projects/project-folder/cover.jpg` - Main project image (required)
- Add any additional project images in the same folder

### 3. Add Brand Logo (Optional)
If the project has a brand logo, add it to `public/assets/brands/` and reference it in the `brandLogo` field.

### 4. Test the Changes
1. Start the development server: `npm run dev`
2. Navigate to `/projects` to see the new project card
3. Click the project to view the detail page at `/projects/project-name`

The project will automatically appear in both the projects grid and the sidebar navigation list.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
