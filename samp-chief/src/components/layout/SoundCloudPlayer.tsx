"use client";
import { useState, useEffect } from 'react';

interface SoundCloudPlayerProps {
  url: string;
  visual?: boolean;
  autoPlay?: boolean;
  hideRelated?: boolean;
  showComments?: boolean;
  showUser?: boolean;
  showReposts?: boolean;
  width?: string | number;
  height?: string | number;
  color?: string;
}

export default function SoundCloudPlayer({
  url,
  visual = true,
  autoPlay = false,
  hideRelated = false,
  showComments = false,
  showUser = true,
  showReposts = false,
  width = "100%",
  height = 166,
  color = "#ff5500"
}: SoundCloudPlayerProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=${encodeURIComponent(color)}&auto_play=${autoPlay}&hide_related=${hideRelated}&show_comments=${showComments}&show_user=${showUser}&show_reposts=${showReposts}&visual=${visual}`;
  
  return (
    <iframe
      width={width}
      height={height}
      allow="autoplay"
      src={embedUrl}
      className="rounded-lg shadow-md"
    ></iframe>
  );
}