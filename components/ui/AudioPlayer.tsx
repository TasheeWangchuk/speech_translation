import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  audioUrl: string | null;
  panelType: 'input' | 'output';
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, panelType }) => {
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Add autoplay effect for output panel when audioUrl changes
  useEffect(() => {
    // Only autoplay for the output panel when a new audio URL is available
    if (panelType === 'output' && audioUrl && audioRef.current) {
      // Small timeout to ensure audio is loaded
      const playPromise = audioRef.current.play();
      
      // Handle potential play() promise rejection (common in browsers that restrict autoplay)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Autoplay was prevented:', error);
          // You could show a UI element here to inform the user they need to manually play
        });
      }
    }
  }, [audioUrl, panelType]);

  const gradientColor = panelType === 'input' ? 
    'from-green-100 via-green-400 to-green-100' : 
    'from-blue-100 via-blue-400 to-blue-100';

  if (!audioUrl) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        {panelType === 'input' ? 
          "No audio input" : 
          "No translation yet"}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        {/* Audio visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-full h-16 bg-gradient-to-r ${gradientColor} rounded-md opacity-70`}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <audio 
            ref={audioRef}
            src={audioUrl} 
            controls 
            className="w-full" 
            style={{ maxHeight: '40px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;