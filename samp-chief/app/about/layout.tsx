import { Metadata } from "next";

import { createPageMetadata,PageLayout } from "../../src/components/ui";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: "Learn about Sample Chief - a global community that celebrates African music culture through immersive experiences.",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout variant="special">{children}</PageLayout>;
}
