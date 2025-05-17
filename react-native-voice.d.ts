// react-native-voice.d.ts
declare module '@react-native-voice/voice' {
    import { EmitterSubscription } from 'react-native';
  
    interface VoiceStartOptions {
      RECOGNIZER_ENGINE?: 'GOOGLE' | 'DEFAULT';
      EXTRA_PARTIAL_RESULTS?: boolean;
      EXTRA_MAX_RESULTS?: number;
      EXTRA_LANGUAGE_MODEL?: 'free_form' | 'web_search';
      EXTRA_PROMPT?: string;
      EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS?: number;
      EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS?: number;
      EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS?: number;
      EXTRA_LANGUAGE_PREFERENCE?: string;
      EXTRA_CALLING_PACKAGE?: string;
      EXTRA_RESULTS_PENDINGINTENT?: any;
      EXTRA_RESULTS_PENDINGINTENT_BUNDLE?: any;
      EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS_INT?: number;
      EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS_INT?: number;
      EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS_INT?: number;
      EXTRA_LANGUAGE?: string;
    }
  
    type VoiceEvent =
      | 'onSpeechStart'
      | 'onSpeechRecognized'
      | 'onSpeechEnd'
      | 'onSpeechError'
      | 'onSpeechResults'
      | 'onSpeechPartialResults'
      | 'onSpeechVolumeChanged';
  
    class Voice {
      onSpeechStart: (e: any) => void;
      onSpeechRecognized: (e: any) => void;
      onSpeechEnd: (e: any) => void;
      onSpeechError: (e: any) => void;
      onSpeechResults: (e: any) => void;
      onSpeechPartialResults: (e: any) => void;
      onSpeechVolumeChanged: (e: any) => void;
  
      start(locale: string, options?: VoiceStartOptions): Promise<void>;
      stop(): Promise<void>;
      destroy(): Promise<void>;
      removeAllListeners(): void;
      isAvailable(): Promise<boolean>;
      isRecognizing(): Promise<boolean>;
      on(event: VoiceEvent, handler: (e: any) => void): EmitterSubscription;
      removeListener(event: VoiceEvent, handler: (e: any) => void): void;
    }
  
    const VoiceInstance: Voice;
  
    export default VoiceInstance;
  }
  