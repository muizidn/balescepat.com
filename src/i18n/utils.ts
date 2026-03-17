import { ui, defaultLang } from './ui';

export function getLangFromCookie(Astro: any) {
  const cookieLang = Astro.cookies.get('lang')?.value;
  if (cookieLang && cookieLang in ui) {
    return cookieLang as keyof typeof ui;
  }
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
