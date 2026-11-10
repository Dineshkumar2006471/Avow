import React, { useState, useRef } from 'react';
import { Volume2, Play, Pause, Mic, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

interface ReadbackBubbleProps {
  text: string;
  language: string; // e.g. "hi-IN" or "en-IN"
  audioUrl?: string;
  onRecordReply?: () => void;
  isResolving?: boolean;
}

export const ReadbackBubble: React.FC<ReadbackBubbleProps> = ({
  text,
  language,
  audioUrl,
  onRecordReply,
  isResolving = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSpeech = () => {
    if (audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
      }
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      return;
    }

    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        if (language.startsWith('hi')) {
          utterance.lang = 'hi-IN';
        }
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFBEB',
        border: '1.5px solid #FDE68A',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #FEF3C7',
          paddingBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Volume2 size={16} color="#D97706" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#92400E',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            GNANI TIMBRE READ-BACK SYNTHESIS (CLOSED-LOOP)
          </span>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 600,
            color: '#92400E',
            backgroundColor: '#FEF3C7',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
          }}
        >
          TARGET: {language}
        </span>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '17px',
          lineHeight: '26px',
          color: '#78350F',
          fontWeight: 500,
        }}
      >
        "{text}"
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          borderTop: '1px solid #FEF3C7',
          paddingTop: '12px',
        }}
      >
        <Button
          size="compact"
          variant="secondary"
          onClick={toggleSpeech}
          icon={isPlaying ? <Pause size={14} /> : <Play size={14} />}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #FDE68A',
            color: '#92400E',
          }}
        >
          {isPlaying ? 'PAUSE SPEECH' : 'LISTEN TO TIMBRE SYNTHESIS'}
        </Button>

        {onRecordReply && (
          <button
            onClick={onRecordReply}
            disabled={isResolving}
            style={{
              height: '38px',
              padding: '0 20px',
              borderRadius: '9999px',
              backgroundColor: '#0A0A0A',
              color: '#FFFFFF',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: isResolving ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              transition: 'all 120ms ease',
            }}
            onMouseEnter={(e) => { if (!isResolving) e.currentTarget.style.backgroundColor = '#1E293B'; }}
            onMouseLeave={(e) => { if (!isResolving) e.currentTarget.style.backgroundColor = '#0A0A0A'; }}
          >
            {isResolving ? <CheckCircle2 size={14} /> : <Mic size={14} />}
            <span>{isResolving ? 'ADJUDICATING RESPONSE...' : 'SIMULATE CALLER: "HAAN, SAHI HAI"'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
