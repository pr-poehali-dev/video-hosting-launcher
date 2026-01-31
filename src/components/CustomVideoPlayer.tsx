import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface CustomVideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  qualities: string[];
  selectedQuality: string;
  onQualityChange: (quality: string) => void;
}

export default function CustomVideoPlayer({ 
  videoUrl, 
  thumbnailUrl, 
  title,
  qualities,
  selectedQuality,
  onQualityChange
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume || 0.5;
      setVolume(volume || 0.5);
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="relative aspect-video bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={thumbnailUrl}
        onClick={togglePlay}
      >
        <source src={videoUrl} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
          onClick={togglePlay}
        >
          <Button size="lg" className="rounded-full w-20 h-20 gradient-primary hover:scale-110 transition-transform">
            <Icon name="Play" size={32} />
          </Button>
        </div>
      )}

      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="mb-3 cursor-pointer"
        />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
            </Button>

            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => skipTime(-10)}
              className="text-white hover:bg-white/20"
            >
              <Icon name="RotateCcw" size={18} />
            </Button>

            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => skipTime(10)}
              className="text-white hover:bg-white/20"
            >
              <Icon name="RotateCw" size={18} />
            </Button>

            <div className="flex items-center gap-2 group/volume">
              <Button 
                size="icon" 
                variant="ghost"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                <Icon 
                  name={isMuted ? 'VolumeX' : volume > 0.5 ? 'Volume2' : 'Volume1'} 
                  size={20} 
                />
              </Button>
              
              <div className="w-0 group-hover/volume:w-20 overflow-hidden transition-all duration-300">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <span className="text-white text-sm font-medium ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="text-white hover:bg-white/20 gap-1"
              >
                <Icon name="Settings" size={18} />
                {selectedQuality}
              </Button>

              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg shadow-lg p-2 min-w-[120px]">
                  {qualities.map((quality) => (
                    <Button
                      key={quality}
                      variant={selectedQuality === quality ? 'default' : 'ghost'}
                      size="sm"
                      className="w-full justify-start mb-1 last:mb-0"
                      onClick={() => {
                        onQualityChange(quality);
                        setShowQualityMenu(false);
                      }}
                    >
                      {quality}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <Button 
              size="icon" 
              variant="ghost"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
