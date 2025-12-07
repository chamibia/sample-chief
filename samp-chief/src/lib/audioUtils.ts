// Shared utility for audio fade operations
interface AudioFadeOptions {
  targetVolume: number;
  duration?: number;
  onComplete?: () => void;
}

export function createAudioFadeController() {
  let isTransitioning = false;

  const fadeAudio = (
    videoElement: HTMLVideoElement, 
    { targetVolume, duration = 800, onComplete }: AudioFadeOptions
  ): Promise<void> => {
    return new Promise((resolve) => {
      if (!videoElement || isTransitioning) {
        resolve();
        return;
      }
      
      isTransitioning = true;
      const startVolume = videoElement.volume;
      const volumeStep = (targetVolume - startVolume) / (duration / 16);
      
      const fade = () => {
        if (!videoElement) {
          isTransitioning = false;
          resolve();
          return;
        }
        
        const newVolume = videoElement.volume + volumeStep;
        
        if (
          (volumeStep > 0 && newVolume >= targetVolume) || 
          (volumeStep < 0 && newVolume <= targetVolume)
        ) {
          videoElement.volume = targetVolume;
          isTransitioning = false;
          onComplete?.();
          resolve();
          return;
        }
        
        videoElement.volume = newVolume;
        requestAnimationFrame(fade);
      };
      
      requestAnimationFrame(fade);
    });
  };

  const fadeAudioOnNavigate = async (videoElement: HTMLVideoElement) => {
    if (!videoElement) return;
    
    await fadeAudio(videoElement, { targetVolume: 0, duration: 400 });
    
    setTimeout(() => {
      if (videoElement) {
        videoElement.muted = true;
      }
    }, 450);
  };

  const toggleMute = async (
    videoElement: HTMLVideoElement, 
    isMuted: boolean, 
    setIsMuted: (muted: boolean) => void
  ) => {
    if (!videoElement || isTransitioning) return;
    
    if (isMuted) {
      videoElement.muted = false;
      videoElement.volume = 0;
      await fadeAudio(videoElement, { targetVolume: 0.7, duration: 800 });
      setIsMuted(false);
    } else {
      await fadeAudio(videoElement, { 
        targetVolume: 0, 
        duration: 600,
        onComplete: () => {
          videoElement.muted = true;
          setIsMuted(true);
        }
      });
    }
  };

  return {
    fadeAudio,
    fadeAudioOnNavigate,
    toggleMute,
    get isTransitioning() {
      return isTransitioning;
    }
  };
}