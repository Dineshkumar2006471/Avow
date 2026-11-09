import React, { useState } from 'react';
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
  onRecordReply,
  isResolving = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSpeech = () => {
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
          <Button
            size="compact"
            variant="primary"
            onClick={onRecordReply}
            disabled={isResolving}
            icon={isResolving ? <CheckCircle2 size={14} /> : <Mic size={14} />}
            style={{
              backgroundColor: '#D97706',
              boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)',
            }}
          >
            {isResolving ? 'ADJUDICATING RESPONSE...' : 'SIMULATE CALLER: "HAAN, SAHI HAI"'}
          </Button>
        )}
      </div>
    </div>
  );
};
