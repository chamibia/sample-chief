import { Metadata } from "next";

import { createPageMetadata,PageLayout } from "../../src/components/ui";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: "Explore Sample Chief's creative projects - bridging African music culture with global audiences.",
});

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return <PageLayout variant="project">{children}</PageLayout>;
}
