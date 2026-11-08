import React, { useState } from 'react';
import { Volume2, Play, Pause, Mic, ArrowRight } from 'lucide-react';
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
    // If Web Speech API is available or real audio is linked
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
        backgroundColor: 'var(--navy-900)',
        border: '1px solid var(--confirm)',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Volume2 size={16} color="var(--confirm)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--confirm)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            GNANI TIMBRE READ-BACK SYNTHESIS
          </span>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-3)',
            backgroundColor: 'var(--navy-800)',
            padding: '2px 8px',
            border: '1px solid var(--navy-300)',
          }}
        >
          TARGET: {language}
        </span>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '18px',
          lineHeight: '26px',
          color: 'var(--text-1)',
          fontStyle: 'italic',
        }}
      >
        "{text}"
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--navy-800)',
          paddingTop: '10px',
        }}
      >
        <Button
          size="compact"
          variant="secondary"
          onClick={toggleSpeech}
          icon={isPlaying ? <Pause size={14} /> : <Play size={14} />}
        >
          {isPlaying ? 'PAUSE SPEECH' : 'LISTEN TO TIMBRE'}
        </Button>

        {onRecordReply && (
          <Button
            size="compact"
            variant="primary"
            onClick={onRecordReply}
            disabled={isResolving}
            icon={isResolving ? <ArrowRight size={14} /> : <Mic size={14} />}
          >
            {isResolving ? 'RESOLVING REPEAT...' : 'REPLY: YES / CORRECT VALUE'}
          </Button>
        )}
      </div>
    </div>
  );
};
