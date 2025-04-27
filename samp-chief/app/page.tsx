export default function Home() {
  return (
    <div className="relative w-full h-full">
     <video
  src="/videos/sample.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="fixed inset-0 w-full h-screen object-cover -z-10"
/>
    </div>
  )
}
