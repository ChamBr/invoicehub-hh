import { flatten } from '@/lib/utils';
import { Translations } from '../types/translations';
import enTranslations from '../locales/modules/profile.json';
import esTranslations from '../locales/modules/profile.es.json';
import ptTranslations from '../locales/modules/profile.pt.json';

describe('Translation files', () => {
  const validateTranslationKeys = (translations: any, referenceKeys: string[]) => {
    const flattenedTranslations = flatten(translations);
    const translationKeys = Object.keys(flattenedTranslations);
    
    // Verifica se todas as chaves necessárias existem
    const missingKeys = referenceKeys.filter(
      key => !translationKeys.includes(key)
    );
    
    // Verifica se não há chaves extras
    const extraKeys = translationKeys.filter(
      key => !referenceKeys.includes(key)
    );
    
    return { missingKeys, extraKeys };
  };

  const referenceKeys = Object.keys(flatten(enTranslations));

  test('all required translation keys exist in English', () => {
    const { missingKeys } = validateTranslationKeys(enTranslations, referenceKeys);
    expect(missingKeys).toEqual([]);
  });

  test('all required translation keys exist in Spanish', () => {
    const { missingKeys } = validateTranslationKeys(esTranslations, referenceKeys);
    expect(missingKeys).toEqual([]);
  });

  test('all required translation keys exist in Portuguese', () => {
    const { missingKeys } = validateTranslationKeys(ptTranslations, referenceKeys);
    expect(missingKeys).toEqual([]);
  });

  test('no extra keys exist in Spanish translations', () => {
    const { extraKeys } = validateTranslationKeys(esTranslations, referenceKeys);
    expect(extraKeys).toEqual([]);
  });

  test('no extra keys exist in Portuguese translations', () => {
    const { extraKeys } = validateTranslationKeys(ptTranslations, referenceKeys);
    expect(extraKeys).toEqual([]);
  });

  test('translation values are not empty', () => {
    const checkEmptyValues = (obj: any, path: string[] = []): string[] => {
      const emptyKeys: string[] = [];
      
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = [...path, key];
        
        if (typeof value === 'object' && value !== null) {
          emptyKeys.push(...checkEmptyValues(value, currentPath));
        } else if (!value && value !== false) {
          emptyKeys.push(currentPath.join('.'));
        }
      });
      
      return emptyKeys;
    };

    const emptyEnglishKeys = checkEmptyValues(enTranslations);
    const emptySpanishKeys = checkEmptyValues(esTranslations);
    const emptyPortugueseKeys = checkEmptyValues(ptTranslations);

    expect(emptyEnglishKeys).toEqual([]);
    expect(emptySpanishKeys).toEqual([]);
    expect(emptyPortugueseKeys).toEqual([]);
  });
});