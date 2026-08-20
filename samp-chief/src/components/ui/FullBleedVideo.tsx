import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

type FullBleedVideoProps = React.VideoHTMLAttributes<HTMLVideoElement>;

const FullBleedVideo = forwardRef<HTMLVideoElement, FullBleedVideoProps>(
  ({ className, ...props }, ref) => (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className={cn("absolute inset-0 w-full h-full object-cover z-0", className)}
      {...props}
    />
  )
);

FullBleedVideo.displayName = "FullBleedVideo";

export default FullBleedVideo;
