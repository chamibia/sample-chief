import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full">
<section className="relative w-full h-screen -mt-16 pt-16">
<video
    src="/videos/sample.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  />
</section>

      <section className="w-full">
        <div className="grid grid-cols-3 auto-rows-[70vh]">
          <div className="relative bg-gray-100">
            <Image
              src="/assets/home1.jpg"
              alt="Sample Chief Event 1"
              fill
              loading="lazy"
              className="object-cover object-center"
            />
          </div>

          <div className="relative bg-gray-100">
            <Image
              src="/assets/home4.jpg"
              alt="Sample Chief DJ Set"
              fill
              loading="lazy"
              className="object-cover object-center"
            />
          </div>

          <div className="relative bg-gray-100">
            <Image
              src="/assets/home9.webp"
              alt="Sample Chief Performance"
              fill
              loading="lazy"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="grid grid-cols-2 h-[90vh]">
          <div className="relative bg-gray-100">
            <Image
              src="/assets/home8.webp"
              alt="Sample Chief Home 6"
              fill
              loading="lazy"
              className="object-cover object-center"
            />
          </div>
                   
          <div className="relative bg-gray-100">
            <video
              src="/videos/sample2.MP4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="relative w-full">
        <div className="relative bg-gray-100 min-h-[100vh]">
          <Image
            src="/assets/home10.webp"
            alt="Sample Chief Crowd"
            fill
            loading="lazy"
            className="object-cover object-center"
          />
        </div>
      </section>
    </div>
  )
}
