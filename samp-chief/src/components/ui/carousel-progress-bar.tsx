import React, { useEffect, useState } from "react";
import { useCarousel } from "@/components/ui/carousel";

export function CarouselProgressBar({ className = "" }: { className?: string }) {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(1);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSelectedIndex(api.selectedScrollSnap() ?? 0);
      setSlideCount(api.scrollSnapList().length);
    };
    api.on("select", update);
    api.on("reInit", update);
    update();
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className={`flex justify-center items-center gap-2 mt-4 ${className}`}>
      {Array.from({ length: slideCount }).map((_, idx) => (
        <div
          key={idx}
          className={`w-1 h-3 rounded-full transition-all duration-300 ${
            idx === selectedIndex ? "bg-[#07693A] scale-y-110" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
