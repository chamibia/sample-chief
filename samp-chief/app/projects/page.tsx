import ProjectGrid from "./ProjectGrid";

// Static optimization for reduced JavaScript execution
export const revalidate = 3600;
export const dynamic = 'force-static';
export const runtime = 'nodejs';

export default function Projects() {
  return (
    <>
      <ProjectGrid />
    </>
  );
}