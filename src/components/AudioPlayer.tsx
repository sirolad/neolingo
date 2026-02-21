import { PauseCircleIcon, Play } from 'lucide-react';
import React from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  className?: string;
}
export default function AudioPlayer({ audioUrl, className }: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  React.useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audioEl.addEventListener('play', handlePlay);
    audioEl.addEventListener('pause', handlePause);
    audioEl.addEventListener('ended', handleEnded);

    return () => {
      audioEl.removeEventListener('play', handlePlay);
      audioEl.removeEventListener('pause', handlePause);
      audioEl.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {audioUrl !== '' && audioUrl !== undefined && audioUrl !== null ? (
        <audio ref={audioRef} src={audioUrl} />
      ) : (
        <audio ref={audioRef} src={undefined} />
      )}
      <button
        disabled={
          audioUrl === '' || audioUrl === undefined || audioUrl === null
        }
        onClick={togglePlay}
        className="self-end"
        // className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        {isPlaying ? (
          <PauseCircleIcon />
        ) : (
          <Play
            className={`${audioUrl === '' || audioUrl === undefined || audioUrl === null ? 'dark:text-neutral-400 text-neutral-400' : 'dark:text-neutral-50 text-neutral-950'}`}
          />
        )}
      </button>
    </div>
  );
}
