import { Metadata } from "next";

import { createPageMetadata, PageLayout } from "../../src/components/ui";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How Sample Chief collects, uses, and protects your information.",
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout variant="special">{children}</PageLayout>;
}
