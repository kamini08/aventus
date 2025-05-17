import React, { useState, useEffect } from 'react';
import { View, Button, Text, Platform, StyleSheet, TextInput } from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { askLLM } from '../utils/api';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';

const supportedLanguages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' }
];

export default function VoiceChat() {
  const [result, setResult] = useState('');
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    Voice.onSpeechResults = (e: { value: string[] }) => {
      if (e.value?.[0]) setResult(e.value[0]);
    };
    Voice.onSpeechError = (e) => console.error('Speech error:', e);
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      setIsListening(true);
      await Voice.start(getVoiceLang(i18n.language));
    } catch (e) {
      console.error('Start error:', e);
    }
  };

  const stopAndSend = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      const reply = await askLLM(result);
      setResponse(reply);
      Tts.setDefaultLanguage(getVoiceLang(i18n.language));
      Tts.speak(reply);
    } catch (e) {
      console.error('Send error:', e);
    }
  };

  const getVoiceLang = (langCode: string) => {
    switch (langCode) {
      case 'hi': return 'hi-IN';
      case 'ta': return 'ta-IN';
      case 'bn': return 'bn-IN';
      default: return 'en-US';
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={i18n.language}
        onValueChange={(lang) => i18n.changeLanguage(lang)}
        style={{ marginBottom: 10 }}
      >
        {supportedLanguages.map((lang) => (
          <Picker.Item key={lang.code} label={lang.label} value={lang.code} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder={t('Type your message')}
        value={result}
        onChangeText={setResult}
      />

      <Button title={isListening ? t('Listening...') : t('Start Talking')} onPress={startRecording} />
      <Button title={t('Send')} onPress={stopAndSend} />

      <Text>{t('Heard')}: {result}</Text>
      <Text>{t('Response')}: {response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});
