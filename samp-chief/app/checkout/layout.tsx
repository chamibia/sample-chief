import { ReactNode } from "react";

// Cart context comes from the root layout (app/layout.tsx) — do not add
// another CartProvider here (see app/shop/layout.tsx for why).
export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
