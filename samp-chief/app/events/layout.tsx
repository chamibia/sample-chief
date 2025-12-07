import { Metadata } from "next";

import { createPageMetadata,PageLayout } from "../../src/components/ui";

export const metadata: Metadata = createPageMetadata({
  title: "Events",
  description: "Discover upcoming Sample Chief events - immersive experiences celebrating African music culture.",
});

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout variant="special">{children}</PageLayout>;
}