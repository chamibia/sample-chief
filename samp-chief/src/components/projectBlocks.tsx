"use client";
import React from "react";
import Image from "../../app/projects/[slug]/Image";
import LazyVideo from "@/components/LazyVideo";

// --- Utility: getMediaClasses ---
export function getMediaClasses(block: ProjectBlock) {
  const fit = block.fit || 'cover';
  const fitClass = (() => {
    switch (fit) {
      case 'contain': return 'object-contain';
      case 'fill': return 'object-fill';
      case 'none': return 'object-none';
      case 'scale-down': return 'object-scale-down';
      case 'cover':
      default: return 'object-cover';
    }
  })();
  const position = block.position || '';
  const positionClass = (() => {
    switch ((position || '').toLowerCase()) {
      case 'top': return 'object-top';
      case 'bottom': return 'object-bottom';
      case 'left': return 'object-left';
      case 'right': return 'object-right';
      case 'center': return 'object-center';
      case 'top-left': case 'left-top': return 'object-top object-left';
      case 'top-right': case 'right-top': return 'object-top object-right';
      case 'bottom-left': case 'left-bottom': return 'object-bottom object-left';
      case 'bottom-right': case 'right-bottom': return 'object-bottom object-right';
      default: return '';
    }
  })();
  const inlineStyle: React.CSSProperties = {};
  if (!positionClass && position) {
    inlineStyle.objectPosition = position;
  }
  return { fitClass, positionClass, inlineStyle };
}

// --- Reusable PlayPauseButton ---
function PlayPauseButton({ isPlaying, onClick, className, style }: {
  isPlaying: boolean;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 hover:bg-black hover:bg-opacity-40 hover:border-transparent transition-all duration-300 text-white text-sm font-medium cursor-pointer rounded-full border border-white ${className || ''}`}
      style={style}
      aria-label={isPlaying ? 'Pause video' : 'Play video'}
    >
      {isPlaying ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="4" height="16" fill="white" />
          <rect x="14" y="4" width="4" height="16" fill="white" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="8,5 8,19 18,12" fill="white" />
        </svg>
      )}
      <span className="hidden sm:inline">Play/Pause</span>
    </button>
  );
}

// --- Video ControlType Use Cases ---
// 'short': For video content that is primarily a visual collection (e.g., photo booth compilations, image montages) and does not require sequential viewing.
// 'long': For narrative or contextual videos that should be watched from beginning to end to understand the story or message.
// --- Types ---
export type ProjectBlock = {
  type: "image" | "video" | "text";
  src?: string;
  html?: string;
  alt?: string;
  gridSpan?: string;
  colStart?: string;
  rowStart?: string;
  fit?: string;
  position?: string;
  controlType?: 'short' | 'long';
};

// --- Utility: getGridClasses ---
export function getGridClasses(block: ProjectBlock) {
  function toMdGridClasses(str?: string) {
    if (!str) return '';
    return str.split(/\s+/).map(cls => {
      if (/^col-span-\d+$/.test(cls)) return `md:col-span-${cls.split('-')[2]}`;
      if (/^row-span-\d+$/.test(cls)) return `md:row-span-${cls.split('-')[2]}`;
      if (/^col-start-\d+$/.test(cls)) return `md:col-start-${cls.split('-')[2]}`;
      if (/^row-start-\d+$/.test(cls)) return `md:row-start-${cls.split('-')[2]}`;
      return '';
    }).join(' ');
  }
  const mdGridSpan = toMdGridClasses(block.gridSpan);
  const mdColStart = toMdGridClasses(block.colStart);
  const mdRowStart = toMdGridClasses(block.rowStart);
  return {
    base: `relative overflow-hidden w-full md:bg-gray-100 ${mdGridSpan} ${mdColStart} ${mdRowStart}`.trim(),
    media: `relative overflow-hidden h-full w-full min-h-[60vh] md:min-h-[30vh] border-0 md:bg-gray-100 ${mdGridSpan} ${mdColStart} ${mdRowStart}`.trim(),
  };
}

// --- Block Components ---
export function ProjectImageBlock({ block, idx, eventTitle }: { block: ProjectBlock; idx: number; eventTitle: string }) {
  const { media } = getGridClasses(block);
  const { fitClass, positionClass, inlineStyle } = getMediaClasses(block);
  return (
    <div className={media}>
      <Image
        src={block.src || ''}
        alt={eventTitle + ' project image ' + (idx + 1)}
        fill
        sizes="(min-width:1280px) 18vw, (min-width:1024px) 24vw, (min-width:640px) 40vw, 80vw"
        className={`${fitClass} ${positionClass || 'object-center'}`}
        style={inlineStyle}
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' fill='%23e5e7eb'/%3E%3C/svg%3E"
        loading={idx < 4 ? "eager" : "lazy"}
      />
    </div>
  );
}

export function ProjectVideoBlock({ block, idx, eventTitle }: { block: ProjectBlock; idx: number; eventTitle: string }) {
  // State for video controls
  const [isPlayingLong, setIsPlayingLong] = React.useState(false);
  const [progressLong, setProgressLong] = React.useState(0);
  const videoRefLong = React.useRef<HTMLVideoElement>(null);

  const handlePlayPauseLong = () => {
    if (!videoRefLong.current) return;
    if (videoRefLong.current.paused) {
      videoRefLong.current.muted = false;
      videoRefLong.current.volume = 0;
      videoRefLong.current.play();
      setIsPlayingLong(true);
      // Fade in sound
      let fadeStep = 0.05;
      let fadeInterval = setInterval(() => {
        if (!videoRefLong.current) return;
        if (videoRefLong.current.volume < 0.7) {
          videoRefLong.current.volume = Math.min(videoRefLong.current.volume + fadeStep, 0.7);
        } else {
          clearInterval(fadeInterval);
        }
      }, 50);
    } else {
      videoRefLong.current.pause();
      setIsPlayingLong(false);
    }
  };

  const handleTimeUpdateLong = () => {
    if (!videoRefLong.current) return;
    const progress = videoRefLong.current.currentTime / videoRefLong.current.duration;
    setProgressLong(isNaN(progress) ? 0 : progress);
  };
  const { media } = getGridClasses(block);
  const { fitClass, positionClass, inlineStyle } = getMediaClasses(block);
  const isExternal = typeof block.src === 'string' && /youtube|vimeo/.test(block.src);
  // State for short controls
  const [isPlayingShort, setIsPlayingShort] = React.useState(false);
  const videoRefShort = React.useRef<HTMLVideoElement>(null);

  const handlePlayPauseShort = () => {
    if (!videoRefShort.current) return;
    if (videoRefShort.current.paused) {
      videoRefShort.current.play();
      setIsPlayingShort(true);
    } else {
      videoRefShort.current.pause();
      setIsPlayingShort(false);
    }
  };

  return (
    <div className={media}>
      <div className="w-full h-full relative bg-black flex items-center justify-center">
        {isExternal ? (
          <iframe
            src={block.src}
            title={block.alt || `${eventTitle} video ${idx + 1}`}
            className="w-full h-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : block.controlType === 'short' ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <video
              ref={videoRefShort}
              src={block.src || ''}
              className={`w-full h-full ${fitClass} ${positionClass || 'object-center'}`}
              style={inlineStyle}
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
            />
            <PlayPauseButton
              isPlaying={isPlayingShort}
              onClick={handlePlayPauseShort}
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              style={{ zIndex: 2 }}
            />
          </div>
        ) : block.controlType === 'long' ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <video
              ref={videoRefLong}
              src={block.src || ''}
              className={`w-full h-full ${fitClass} ${positionClass || 'object-center'}`}
              style={inlineStyle}
              loop={false}
              muted={false}
              playsInline
              preload="none"
              controls={false}
              onTimeUpdate={handleTimeUpdateLong}
            />
            <div className="absolute left-0 right-0 bottom-0 flex flex-col items-center w-full" style={{zIndex:2}}>
              <div className="flex items-center justify-end w-full mb-2 pr-4 pb-2">
                <PlayPauseButton
                  isPlaying={isPlayingLong}
                  onClick={handlePlayPauseLong}
                  style={{ zIndex: 2 }}
                />
              </div>
              <div
                className="w-full h-[10px] bg-transparent relative cursor-pointer"
                onClick={e => {
                  if (!videoRefLong.current) return;
                  const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percent = x / rect.width;
                  if (videoRefLong.current.duration) {
                    videoRefLong.current.currentTime = percent * videoRefLong.current.duration;
                  }
                }}
              >
                <div className="absolute left-0 top-0 h-full bg-white/90" style={{width: `${progressLong * 100}%`, transition: 'width 0.2s'}} />
              </div>
            </div>
          </div>
        ) : (
          <LazyVideo
            src={block.src || ''}
            className=""
            style={inlineStyle}
            fitClass={fitClass}
            positionClass={positionClass || 'object-center'}
          />
        )}
      </div>
    </div>
  );
}

export function ProjectTextBlock({ block, idx }: { block: ProjectBlock; idx: number }) {
  const { base } = getGridClasses(block);
  return (
    <div className={base}>
      <div className="block md:hidden w-full bg-[#0F0500]">
        <div className="max-w-3xl mx-auto px-4 py-6 flex items-center">
          <div className="bg-[#0F0500] rounded-lg p-4 text-white w-full py-10">
            <div className="text-base leading-relaxed max-w-none text-white w-full">
              <div dangerouslySetInnerHTML={{ __html: block.html || '' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex p-8 items-center justify-center h-full w-full bg-[#0F0500] min-h-[30vh]">
        <div className="max-w-3xl w-full">
          <div className="bg-[#0F0500] rounded-lg p-6 text-white h-full flex items-center">
            <div className="text-base leading-relaxed w-full" dangerouslySetInnerHTML={{ __html: block.html || '' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Block Renderer ---
export function renderProjectBlock(block: ProjectBlock, idx: number, eventTitle: string) {
  let key = block.src || block.html || idx;
  switch (block.type) {
    case 'image':
      return <ProjectImageBlock key={key} block={block} idx={idx} eventTitle={eventTitle} />;
    case 'video':
      return <ProjectVideoBlock key={key} block={block} idx={idx} eventTitle={eventTitle} />;
    case 'text':
      return <ProjectTextBlock key={key} block={block} idx={idx} />;
    default:
      return null;
  }
}
