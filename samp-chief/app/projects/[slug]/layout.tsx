
interface ProjectLayoutProps {
  children: React.ReactNode;
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <div className="absolute left-0 right-0 w-screen text-[#202020]">
      {children}
    </div>
  );
}