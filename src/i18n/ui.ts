import en from './locales/en.json';
import id from './locales/id.json';

export const languages = {
  en: 'English',
  id: 'Bahasa Indonesia',
};

export const defaultLang = 'en';

export const ui = {
  en,
  id,
} as const;
