import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
import commonEn from './locales/modules/common.json';
import navigationEn from './locales/modules/navigation.json';
import companyEn from './locales/modules/company.json';
import customersEn from './locales/modules/customers.json';
import productsEn from './locales/modules/products.json';
import adminEn from './locales/modules/admin.json';

// Portuguese translations
import commonPt from './locales/modules/common.pt.json';
import navigationPt from './locales/modules/navigation.pt.json';
import companyPt from './locales/modules/company.pt.json';
import customersPt from './locales/modules/customers.pt.json';
import productsPt from './locales/modules/products.pt.json';
import adminPt from './locales/modules/admin.pt.json';

// Spanish translations
import commonEs from './locales/modules/common.es.json';
import navigationEs from './locales/modules/navigation.es.json';
import companyEs from './locales/modules/company.es.json';
import customersEs from './locales/modules/customers.es.json';
import productsEs from './locales/modules/products.es.json';
import adminEs from './locales/modules/admin.es.json';

const resources = {
  en: {
    translation: {
      common: commonEn,
      navigation: navigationEn,
      company: companyEn,
      customers: customersEn,
      products: productsEn,
      admin: adminEn,
    },
  },
  pt: {
    translation: {
      common: commonPt,
      navigation: navigationPt,
      company: companyPt,
      customers: customersPt,
      products: productsPt,
      admin: adminPt,
    },
  },
  es: {
    translation: {
      common: commonEs,
      navigation: navigationEs,
      company: companyEs,
      customers: customersEs,
      products: productsEs,
      admin: adminEs,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: {
    'pt-BR': ['pt', 'en'],
    'es-ES': ['es', 'en'],
    'default': ['en'],
  },
  interpolation: {
    escapeValue: false,
  },
  returnNull: false, // retorna a chave em vez de null quando a tradução não existe
  returnEmptyString: false, // retorna a chave em vez de string vazia
  parseMissingKeyHandler: (key) => {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  },
});

export default i18n;