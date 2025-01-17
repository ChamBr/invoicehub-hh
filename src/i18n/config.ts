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
import adminPt from './locales/modules/admin.pt.json';

// Spanish translations
import commonEs from './locales/modules/common.es.json';
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
      admin: adminPt,
    },
  },
  es: {
    translation: {
      common: commonEs,
      admin: adminEs,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;