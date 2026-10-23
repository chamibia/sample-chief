# Sample Chief

A high-performance creative portfolio and e-commerce platform built with Next.js.

## Tech Stack

- **Next.js 16.1.1** - App Router with TypeScript
- **React 18.3.1** - UI library
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Framer Motion** - Animations

## Prerequisites

- Node.js 18+
- Yarn package manager

## Quick Start

```bash
# Clone and install
git clone [repository-url]
cd samp-chief
yarn install

# Set up environment variables
cp .env.example .env.local
# Add your API keys to .env.local

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/                 # Next.js pages and API routes
src/
├── components/      # Reusable UI components
├── data/           # Static data and configuration
└── lib/            # Utility functions
public/assets/      # Static media files
```

## Development

```bash
# Development
yarn dev              # Start dev server
yarn build            # Build for production
yarn start            # Start production server

# Code Quality
yarn lint             # Run linting
yarn lint:fix         # Fix linting issues

# Performance
yarn check-performance # Run performance checks
yarn optimize-images  # Optimize project images
```

## Adding Projects

Projects are managed through the data file at `src/data/events.ts`. See [ADDING_PROJECTS.md](ADDING_PROJECTS.md) for detailed instructions.

## Projects Page Layout

`/projects` currently shows every project as a tile in a single full-width,
tetris-style grid (`app/projects/AllProjectsGrid.tsx`) — the "Projects"
heading and the old sidebar/mobile "all projects" list are hidden.

The original layout — a fixed 5-slot featured grid (`app/projects/ProjectGrid.tsx`)
alongside a sidebar/mobile list of every other project (`app/projects/components/ProjectList.tsx`)
— is still fully intact in the code, just unused. To restore it, flip the
`SHOW_ALL_PROJECTS_AS_TILES` constant at the top of `app/projects/page.tsx`
to `false`.

## Contributing

1. Follow the established component patterns
2. Run `yarn lint` before submitting changes
3. Ensure performance checks pass with `yarn check-performance`
4. **Never commit files larger than 50MB** — A pre-commit hook will automatically block them

### File Size Guidelines

- **Video files**: Compress to under 50MB before committing
  - Use H.264 codec (browser-compatible)
  - Recommended tool: [HandBrake](https://handbrake.fr/) or FFmpeg
- **Image files**: Optimize using `yarn optimize-images`
- **Media files**: Consider using Git LFS for files approaching 50MB

If a file is rejected by the pre-commit hook, compress it and try committing again. The hook exists to prevent repository bloat and accidental upload failures to GitHub.

## Architecture

This project uses a container/presenter component pattern with centralized data management. Components focus on UI rendering while custom hooks handle business logic and data transformation...
