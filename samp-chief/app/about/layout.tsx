import SpecialPageLayout from "../../src/components/layout/SpecialPageLayout";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpecialPageLayout>{children}</SpecialPageLayout>;
}
