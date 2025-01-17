import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as translations from './locales/modules';

const resources = {
  en: {
    translation: translations.en,
  },
  pt: {
    translation: translations.pt,
  },
  es: {
    translation: translations.es,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: {
    'pt-BR': ['pt', 'en'],
    'es-ES': ['es', 'en'],
    'default': ['en'],
  },
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  returnEmptyString: false,
  parseMissingKeyHandler: (key) => {
    console.warn(`Translation missing for key: ${key}`);
    // Retorna a chave formatada para ser mais legível
    return key.split('.').pop()?.replace(/_/g, ' ') || key;
  },
  missingKeyHandler: (lng, ns, key, fallbackValue) => {
    console.warn(`Missing translation - Language: ${lng}, Namespace: ${ns}, Key: ${key}`);
  },
});

// Adiciona validação em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  const validateTranslations = () => {
    const enKeys = Object.keys(flatten(resources.en.translation));
    const ptKeys = Object.keys(flatten(resources.pt.translation));
    const esKeys = Object.keys(flatten(resources.es.translation));

    const missingPt = enKeys.filter(key => !ptKeys.includes(key));
    const missingEs = enKeys.filter(key => !esKeys.includes(key));

    if (missingPt.length > 0) {
      console.warn('Missing Portuguese translations:', missingPt);
    }

    if (missingEs.length > 0) {
      console.warn('Missing Spanish translations:', missingEs);
    }
  };

  validateTranslations();
}

export default i18n;

// Função auxiliar para achatar objetos
function flatten(obj: any, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce((acc: Record<string, string>, k: string) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flatten(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}