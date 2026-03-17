import { ui, defaultLang } from './ui';

function parseAcceptLanguage(header: string | null): string[] {
  if (!header) return [];

  return header
    .split(',')
    .map(part => part.split(';')[0].trim().toLowerCase())
    .map(lang => lang.split('-')[0]); // "en-US" → "en"
}

export function getLangFromCookie(Astro: any) {
  // 1. Cookie
  const cookieLang = Astro.cookies.get('lang')?.value;
  if (cookieLang && cookieLang in ui) {
    return cookieLang as keyof typeof ui;
  }

  // 2. Accept-Language (highest priority)
  const acceptLangHeader = Astro.request.headers.get('accept-language');
  const acceptedLangs = parseAcceptLanguage(acceptLangHeader);

  for (const lang of acceptedLangs) {
    if (lang in ui) {
      return lang as keyof typeof ui;
    }
  }

  // 3. Default
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}