interface SpecialPageLayoutProps {
  children: React.ReactNode;
}

export default function SpecialPageLayout({ children }: SpecialPageLayoutProps) {
  return (
        <main className="flex-1 w-full pt-20 text-[#202020]">
          <div className="max-w-7xl mx-auto px-6">{children}</div>
        </main>
  );
}
