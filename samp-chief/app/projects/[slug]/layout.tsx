
interface ProjectLayoutProps {
  children: React.ReactNode;
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <div className="w-full text-[#202020]">
      {children}
    </div>
  );
}