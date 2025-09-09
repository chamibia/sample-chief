import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import SubscribePopup from "../SubscribePopup";
import { CartProvider } from "../CartProvider";
import ClientLayout from "../../../app/ClientLayout";

interface SpecialPageLayoutProps {
  children: React.ReactNode;
}

export default function SpecialPageLayout({ children }: SpecialPageLayoutProps) {
  return (
    <CartProvider>
      <ClientLayout>
        <Navbar />
        <main className="flex-1 w-full pt-20 text-[#202020]">
          <div className="max-w-7xl mx-auto px-6">{children}</div>
        </main>
        <Footer />
        <SubscribePopup />
      </ClientLayout>
    </CartProvider>
  );
}
