export interface LocaleProvider {
  getDefaultLocale(): string;
  getLocales(): string[];
  setLocale(newLocale: string): void;
  getTranslation(text: string): string;
}
