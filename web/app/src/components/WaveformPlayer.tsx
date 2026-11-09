import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, AudioLines } from 'lucide-react';
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
  const [duration] = useState(4.2); // seconds simulated or real
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) {
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
  const BAR_COUNT = 56;
  const bars = useRef(
    Array.from({ length: BAR_COUNT }).map((_, i) => {
      const norm = i / BAR_COUNT;
      const envelope = Math.sin(norm * Math.PI);
      const randomNoise = 0.2 + 0.8 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.9));
      return Math.max(0.12, envelope * randomNoise);
    })
  ).current;

  return (
    <div
      style={{
        backgroundColor: 'var(--surface-primary)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
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
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AudioLines size={16} color="var(--sapphire-600)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            AUDIO REPLAY &amp; SPECTRAL INSPECTION
          </span>
        </div>

        {hasDegradedVersion && (
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--sky-100)',
              padding: '2px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveMode('clean')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: activeMode === 'clean' ? 'var(--surface-primary)' : 'transparent',
                color: activeMode === 'clean' ? 'var(--sapphire-700)' : 'var(--text-secondary)',
                border: 'none',
                boxShadow: activeMode === 'clean' ? 'var(--shadow-xs)' : 'none',
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease)',
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
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: activeMode === 'degraded' ? 'var(--surface-primary)' : 'transparent',
                color: activeMode === 'degraded' ? 'var(--sapphire-700)' : 'var(--text-secondary)',
                border: 'none',
                boxShadow: activeMode === 'degraded' ? 'var(--shadow-xs)' : 'none',
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease)',
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
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          backgroundColor: 'var(--sky-50)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
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
          const height = Math.round(heightFactor * 50);

          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${height}px`,
                backgroundColor: isPlayed ? 'var(--sapphire-500)' : 'var(--sky-300)',
                borderRadius: 'var(--radius-full)',
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
            icon={isPlaying ? <Pause size={15} /> : <Play size={15} />}
          >
            {isPlaying ? 'PAUSE' : 'PLAY AUDIO'}
          </Button>

          <Button
            size="compact"
            variant="secondary"
            onClick={restart}
            icon={<RotateCcw size={14} />}
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
            fontSize: '12px',
            color: 'var(--text-secondary)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <Volume2 size={16} color="var(--sapphire-600)" />
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
        />
      )}
    </div>
  );
};
