import { flatten } from '@/lib/utils';
import { Translations } from '../types/translations';
import * as translations from '../locales/modules';

describe('Translation files', () => {
  const validateTranslationKeys = (translationObj: any, referenceKeys: string[]) => {
    const flattenedTranslations = flatten(translationObj);
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

  const referenceKeys = Object.keys(flatten(translations.en));

  test('all required translation keys exist in English', () => {
    const { missingKeys } = validateTranslationKeys(translations.en, referenceKeys);
    expect(missingKeys).toEqual([]);
  });

  test('all required translation keys exist in Spanish', () => {
    const { missingKeys } = validateTranslationKeys(translations.es, referenceKeys);
    expect(missingKeys).toEqual([]);
  });

  test('all required translation keys exist in Portuguese', () => {
    const { missingKeys } = validateTranslationKeys(translations.pt, referenceKeys);
    expect(missingKeys).toEqual([]);
  });

  test('no extra keys exist in Spanish translations', () => {
    const { extraKeys } = validateTranslationKeys(translations.es, referenceKeys);
    expect(extraKeys).toEqual([]);
  });

  test('no extra keys exist in Portuguese translations', () => {
    const { extraKeys } = validateTranslationKeys(translations.pt, referenceKeys);
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

    const emptyEnglishKeys = checkEmptyValues(translations.en);
    const emptySpanishKeys = checkEmptyValues(translations.es);
    const emptyPortugueseKeys = checkEmptyValues(translations.pt);

    expect(emptyEnglishKeys).toEqual([]);
    expect(emptySpanishKeys).toEqual([]);
    expect(emptyPortugueseKeys).toEqual([]);
  });
});