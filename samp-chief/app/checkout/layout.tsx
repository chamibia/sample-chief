import { ReactNode } from "react";

import { CartProvider } from "@/components/CartProvider";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
