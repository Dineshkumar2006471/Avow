import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from './ui/Button';

interface WaveformPlayerProps {
  audioUrl?: string;
  degradedAudioUrl?: string;
  hasDegradedVersion?: boolean;
}

export const WaveformPlayer: React.FC<WaveformPlayerProps> = ({
  audioUrl,
  degradedAudioUrl,
  hasDegradedVersion = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMode, setActiveMode] = useState<'clean' | 'degraded'>('degraded');
  const [progress, setProgress] = useState(0); // 0.0 to 1.0
  const [duration, setDuration] = useState(4.2); // seconds simulated or real
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) {
      // Simulate playback if no audio file yet
      setIsPlaying((prev) => !prev);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Simulation timer if running without real file
  useEffect(() => {
    if (!audioUrl && isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, audioUrl, duration]);

  useEffect(() => {
    setProgress(currentTime / duration);
  }, [currentTime, duration]);

  const restart = () => {
    setCurrentTime(0);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Procedural waveform bars generator
  const BAR_COUNT = 64;
  const bars = useRef(
    Array.from({ length: BAR_COUNT }).map((_, i) => {
      // Create natural speech-like envelope
      const norm = i / BAR_COUNT;
      const envelope = Math.sin(norm * Math.PI);
      const randomNoise = 0.2 + 0.8 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.9));
      return Math.max(0.1, envelope * randomNoise);
    })
  ).current;

  return (
    <div
      style={{
        backgroundColor: 'var(--navy-850)',
        border: '1px solid var(--navy-300)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Header with Clean/Degraded Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--navy-300)',
          paddingBottom: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          AUDIO REPLAY &amp; SPECTRAL INSPECTION
        </span>

        {hasDegradedVersion && (
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              onClick={() => setActiveMode('clean')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '3px 8px',
                backgroundColor: activeMode === 'clean' ? 'var(--navy-600)' : 'var(--navy-800)',
                color: activeMode === 'clean' ? '#FFF' : 'var(--text-2)',
                border: '1px solid var(--navy-300)',
                cursor: 'pointer',
              }}
            >
              CLEAN
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('degraded')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '3px 8px',
                backgroundColor: activeMode === 'degraded' ? 'var(--navy-600)' : 'var(--navy-800)',
                color: activeMode === 'degraded' ? '#FFF' : 'var(--text-2)',
                border: '1px solid var(--navy-300)',
                cursor: 'pointer',
              }}
            >
              DEGRADED (GAUNTLET)
            </button>
          </div>
        )}
      </div>

      {/* Waveform Visualization */}
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          backgroundColor: 'var(--navy-900)',
          padding: '8px 12px',
          border: '1px solid var(--navy-300)',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          setCurrentTime(ratio * duration);
        }}
      >
        {bars.map((heightFactor, i) => {
          const isPlayed = i / BAR_COUNT <= progress;
          const height = Math.round(heightFactor * 48);

          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${height}px`,
                backgroundColor: isPlayed ? 'var(--navy-500)' : 'var(--navy-250)',
                transition: 'background-color 50ms linear',
              }}
            />
          );
        })}
      </div>

      {/* Transport Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button
            size="compact"
            variant="primary"
            onClick={togglePlay}
            icon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </Button>

          <Button
            size="compact"
            variant="ghost"
            onClick={restart}
            icon={<RotateCcw size={16} />}
          >
            RESTART
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-2)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <Volume2 size={16} color="var(--navy-500)" />
          <span>
            {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
          </span>
        </div>
      </div>

      {/* Hidden native audio tag if real audio is provided */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={activeMode === 'degraded' && degradedAudioUrl ? degradedAudioUrl : audioUrl}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  );
};
