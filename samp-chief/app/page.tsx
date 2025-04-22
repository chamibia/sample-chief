
export default function Home() {
  return (
    <div className="relative w-full h-screen">
    <video
      src="/videos/sample.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  </div>
  )
  }
