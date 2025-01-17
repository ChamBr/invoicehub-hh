import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/modules/common.json';
import navigationEn from './locales/modules/navigation.json';
import companyEn from './locales/modules/company.json';
import customersEn from './locales/modules/customers.json';
import productsEn from './locales/modules/products.json';
import adminEn from './locales/modules/admin.json';

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