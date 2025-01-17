import { flatten } from '@/lib/utils';
import commonEn from '@/i18n/locales/modules/common.json';
import navigationEn from '@/i18n/locales/modules/navigation.json';
import companyEn from '@/i18n/locales/modules/company.json';
import customersEn from '@/i18n/locales/modules/customers.json';
import productsEn from '@/i18n/locales/modules/products.json';
import adminEn from '@/i18n/locales/modules/admin.json';

import commonEs from '@/i18n/locales/es.json';
import commonPt from '@/i18n/locales/pt.json';

describe('Translation files', () => {
  const enTranslations = {
    common: commonEn,
    navigation: navigationEn,
    company: companyEn,
    customers: customersEn,
    products: productsEn,
    admin: adminEn,
  };

  const flattenedEn = flatten(enTranslations);
  const flattenedEs = flatten(commonEs);
  const flattenedPt = flatten(commonPt);

  test('all English translation keys exist in Spanish', () => {
    const missingKeys = Object.keys(flattenedEn).filter(
      key => !Object.prototype.hasOwnProperty.call(flattenedEs, key)
    );
    
    expect(missingKeys).toEqual([]);
  });

  test('all English translation keys exist in Portuguese', () => {
    const missingKeys = Object.keys(flattenedEn).filter(
      key => !Object.prototype.hasOwnProperty.call(flattenedPt, key)
    );
    
    expect(missingKeys).toEqual([]);
  });

  test('no extra keys exist in Spanish translations', () => {
    const extraKeys = Object.keys(flattenedEs).filter(
      key => !Object.prototype.hasOwnProperty.call(flattenedEn, key)
    );
    
    expect(extraKeys).toEqual([]);
  });

  test('no extra keys exist in Portuguese translations', () => {
    const extraKeys = Object.keys(flattenedPt).filter(
      key => !Object.prototype.hasOwnProperty.call(flattenedEn, key)
    );
    
    expect(extraKeys).toEqual([]);
  });
});