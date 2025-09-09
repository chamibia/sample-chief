
import SpecialPageLayout from "../../src/components/layout/SpecialPageLayout";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpecialPageLayout>{children}</SpecialPageLayout>;
}
