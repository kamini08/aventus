import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import hi from './hi.json';
// import bn from './bn.json';
// import ta from './ta.json';
// import te from './te.json';
// import kn from './kn.json';
// import ml from './ml.json';
// import gu from './gu.json';
// import mr from './mr.json';
// import pa from './pa.json';

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const lang = await AsyncStorage.getItem('appLanguage');
      if (lang) {
        callback(lang);
      } else {
        callback('en'); // default fallback
      }
    } catch {
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem('appLanguage', lng);
    } catch (e) {
      console.log('Failed to cache language', e);
    }
  },
};

i18n['use'](LANGUAGE_DETECTOR as any)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4', 
    fallbackLng: 'en',        
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    //   bn: { translation: bn },
    //   ta: { translation: ta },
    //   te: { translation: te },
    //   kn: { translation: kn },
    //   ml: { translation: ml },
    //   gu: { translation: gu },
    //   mr: { translation: mr },
    //   pa: { translation: pa },
    },
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
