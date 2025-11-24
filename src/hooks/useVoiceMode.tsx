import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseVoiceModeProps {
  onTranscript: (text: string) => void;
  autoSend?: boolean;
}

export const useVoiceMode = ({ onTranscript, autoSend = true }: UseVoiceModeProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceModeEnabled, setIsVoiceModeEnabled] = useState(false);
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  // Initialize Speech Recognition - INSTANT ALWAYS-ON MODE
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Always-on continuous listening
    recognition.interimResults = false; // Only final results for better accuracy
    recognition.lang = 'ro-RO';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('🎤 Voice recognition ACTIVE');
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log('🎤 Voice recognition paused');
      setIsListening(false);
      
      // INSTANT AUTO-RESTART - no delay when voice mode is enabled
      if (isVoiceModeEnabled && !isSpeaking) {
        // Clear any pending restart
        if (restartTimeoutRef.current) {
          clearTimeout(restartTimeoutRef.current);
        }
        
        // Immediate restart for always-on behavior
        restartTimeoutRef.current = setTimeout(() => {
          if (isVoiceModeEnabled && !isSpeaking) {
            try {
              recognition.start();
              console.log('🔄 Auto-restarted recognition (instant)');
            } catch (error: any) {
              if (error.name !== 'InvalidStateError') {
                console.error('Restart error:', error);
              }
            }
          }
        }, 100); // Minimal 100ms delay for stability
      }
    };

    recognition.onerror = (event: any) => {
      console.error('🚨 Speech recognition error:', event.error);
      
      // Ignore harmless errors that don't affect functionality
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        console.log('⚠️ Non-critical error, continuing...');
        return;
      }
      
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        toast({
          title: "🎤 Permisiune necesară",
          description: "Te rugăm să permiți accesul la microfon din setările browser-ului.",
          variant: "destructive",
        });
        setIsVoiceModeEnabled(false);
      } else if (event.error === 'network') {
        // Network errors - retry instantly
        if (isVoiceModeEnabled) {
          setTimeout(() => {
            try {
              recognition.start();
              console.log('🔄 Retrying after network error');
            } catch (e) {
              console.log('Already restarted');
            }
          }, 500);
        }
      }
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      const confidence = event.results[event.results.length - 1][0].confidence;
      
      console.log('📝 Recognized:', transcript, `(${(confidence * 100).toFixed(1)}% confidence)`);
      
      if (transcript.trim() && confidence > 0.5) {
        onTranscript(transcript.trim());
        
        if (autoSend) {
          // Briefly pause for processing, then instant restart
          recognition.stop();
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isVoiceModeEnabled, isSpeaking, onTranscript, autoSend, toast]);

  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      toast({
        title: "❌ Nu este suportat",
        description: "Speech Recognition nu este suportat de browser-ul tău. Încearcă Chrome sau Edge.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Request microphone permissions first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start recognition immediately
      recognitionRef.current.start();
      setIsVoiceModeEnabled(true);
      
      toast({
        title: "🎤 Voice Mode ACTIV",
        description: "Microfonul este mereu pornit. Vorbește oricând dorești!",
      });
    } catch (error: any) {
      if (error.name === 'InvalidStateError') {
        // Already started, just enable the mode
        setIsVoiceModeEnabled(true);
      } else if (error.name === 'NotAllowedError') {
        toast({
          title: "🚫 Permisiune refuzată",
          description: "Activează microfonul din setările browser-ului.",
          variant: "destructive",
        });
      } else {
        console.error('Error starting recognition:', error);
        toast({
          title: "⚠️ Eroare",
          description: "Nu s-a putut porni recunoașterea vocală. Încearcă din nou.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const stopListening = useCallback(() => {
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsVoiceModeEnabled(false);
      setIsListening(false);
    }
    
    toast({
      title: "🔇 Voice Mode OPRIT",
      description: "Microfonul a fost dezactivat.",
    });
  }, [toast]);

  const speak = useCallback((text: string) => {
    if (!isVoiceModeEnabled) return;

    // Stop listening while speaking to avoid echo
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ro-RO';
    utterance.rate = 1.1; // Slightly faster for better UX
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      console.log('🔊 Speaking...');
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      console.log('✅ Speech finished');
      setIsSpeaking(false);
      
      // INSTANT RESUME - restart recognition immediately after speaking
      if (isVoiceModeEnabled && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            console.log('🔄 Resumed listening (instant after speak)');
          } catch (error: any) {
            if (error.name !== 'InvalidStateError') {
              console.error('Resume error:', error);
            }
          }
        }, 200); // Minimal delay to avoid overlap
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      
      // Resume even on error
      if (isVoiceModeEnabled && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.log('Already started');
          }
        }, 200);
      }
    };

    // Cancel any ongoing speech and speak new text
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [isVoiceModeEnabled]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleVoiceMode = useCallback(() => {
    if (isVoiceModeEnabled) {
      stopListening();
      stopSpeaking();
    } else {
      startListening();
    }
  }, [isVoiceModeEnabled, startListening, stopListening, stopSpeaking]);

  return {
    isListening,
    isSpeaking,
    isVoiceModeEnabled,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    toggleVoiceMode,
  };
};

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'ro-RO';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Voice recognition started');
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log('Voice recognition ended');
      setIsListening(false);
      
      // Auto-restart if voice mode is still enabled
      if (isVoiceModeEnabled && !isSpeaking) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition already started');
          }
        }, 500);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'no-speech') {
        // Ignore no-speech errors, they're normal
        return;
      }
      
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        toast({
          title: "Permisiune necesară",
          description: "Te rugăm să permiți accesul la microfon.",
          variant: "destructive",
        });
        setIsVoiceModeEnabled(false);
      }
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log('Recognized text:', transcript);
      
      if (transcript.trim()) {
        onTranscript(transcript.trim());
        
        if (autoSend) {
          // Stop listening while processing
          recognition.stop();
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isVoiceModeEnabled, isSpeaking, onTranscript, autoSend, toast]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      toast({
        title: "Nu este suportat",
        description: "Speech Recognition nu este suportat de browser-ul tău.",
        variant: "destructive",
      });
      return;
    }

    try {
      recognitionRef.current.start();
      setIsVoiceModeEnabled(true);
    } catch (error: any) {
      if (error.name === 'InvalidStateError') {
        console.log('Recognition already started');
      } else {
        console.error('Error starting recognition:', error);
        toast({
          title: "Eroare",
          description: "Nu s-a putut porni recunoașterea vocală.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsVoiceModeEnabled(false);
      setIsListening(false);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!isVoiceModeEnabled) return;

    // Stop listening while speaking
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ro-RO';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      
      // Resume listening after speaking
      if (isVoiceModeEnabled && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.log('Recognition already started');
          }
        }, 500);
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      
      // Resume listening even on error
      if (isVoiceModeEnabled && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.log('Recognition already started');
          }
        }, 500);
      }
    };

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [isVoiceModeEnabled]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleVoiceMode = useCallback(() => {
    if (isVoiceModeEnabled) {
      stopListening();
      stopSpeaking();
    } else {
      startListening();
    }
  }, [isVoiceModeEnabled, startListening, stopListening, stopSpeaking]);

  return {
    isListening,
    isSpeaking,
    isVoiceModeEnabled,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    toggleVoiceMode,
  };
};
