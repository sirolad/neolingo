import { AudioLinesIcon, Mic, Pause, Play, Trash } from 'lucide-react';
import React from 'react';

export default function AudioRecorder({
  onRecord,
}: {
  onRecord: (url: string) => void;
}) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const [recording, setRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const startRecording = async () => {
    try {
      // cleanup old audio
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus', // safest
      });

      mediaRecorderRef.current = recorder;

      const chunks: Blob[] = [];

      recorder.ondataavailable = e => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecord(url);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      setRecording(true);
    } catch {
      alert('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!audioRef.current.paused);
    audioRef.current.onended = () => setIsPlaying(false);
  };

  const deleteAudio = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    onRecord('');
  };

  return (
    <div className="border border-neutral-200 rounded-2xl md:rounded-2xl bg-white text-neutral-950 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base md:text-lg transition-all h-12 md:h-14 lg:h-16 flex items-center px-4 md:px-5 lg:px-6 w-full justify-between">
      {audioUrl === null ? (
        <>
          {!recording ? (
            <>
              <p className="text-[10px] font-normal text-neutral-700">
                Record voice
              </p>
              <button
                type="button"
                aria-label="Start recording"
                onClick={startRecording}
                className="rounded-2xl text-neutral-950 hover:bg-neutral-100 transition-all h-12 w-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <Mic className="w-5 h-5 text-neutral-500" />
              </button>
            </>
          ) : (
            <>
              <p className="text-[10px] font-normal text-red-700">
                Recording...
              </p>
              <button
                type="button"
                aria-label="Stop recording"
                onClick={stopRecording}
                className="border border-red-300 bg-red-100 text-red-700 rounded-2xl h-12 w-12 flex items-center justify-center animate-pulse focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <rect width="12" height="12" x="4" y="4" rx="2" />
                </svg>
              </button>
            </>
          )}
        </>
      ) : null}
      {audioUrl && !recording && (
        <>
          {isPlaying ? (
            <Pause onClick={togglePlay} className="w-5 h-5" />
          ) : (
            <Play onClick={togglePlay} className="w-5 h-5" />
          )}
          <AudioLinesIcon className="w-10 h-5 text-neutral-500" />
          <Trash onClick={deleteAudio} className="w-5 h-5" />
        </>
      )}
      {audioUrl && !recording && (
        <audio
          ref={audioRef}
          controls
          src={audioUrl}
          className="ml-2 h-8"
          style={{ display: 'none' }}
          preload="metadata"
        />
      )}
    </div>
  );
}
