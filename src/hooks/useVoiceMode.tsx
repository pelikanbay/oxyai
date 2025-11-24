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
  const { toast } = useToast();

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
