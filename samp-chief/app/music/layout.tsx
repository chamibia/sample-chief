
import SpecialPageLayout from "../../src/components/layout/SpecialPageLayout";

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpecialPageLayout>{children}</SpecialPageLayout>;
}
