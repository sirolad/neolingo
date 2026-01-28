import {
  AudioLinesIcon,
  Mic,
  Pause,
  PauseCircleIcon,
  Play,
  Trash,
} from 'lucide-react';
import React from 'react';

export default function AudioPlayer({ audioUrl }: { audioUrl: string }) {
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
    <div className="flex items-center space-x-4">
      <button
        onClick={togglePlay}
        // className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        {isPlaying ? <PauseCircleIcon /> : <Play />}
      </button>
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
}
