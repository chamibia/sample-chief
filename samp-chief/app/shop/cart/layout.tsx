

// This layout disables all parent layouts for the cart page, so only the cart page's own layout is used
export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
