import util from 'util';

import type { LocaleProvider } from './locale-provider';

export class Locale {
  private currentLocale: string;
  private provider: LocaleProvider;

  constructor(provider: LocaleProvider) {
    this.provider = provider;
    this.currentLocale = this.provider.getDefaultLocale();
  }

  getCurrentLocale(): string {
    return this.currentLocale;
  }

  getLocales(): string[] {
    return this.provider.getLocales();
  }

  setLocale(newLocale: string): void {
    const newLocaleNormalized = newLocale.toLowerCase().trim();
    if (this.getLocales().indexOf(newLocaleNormalized) !== -1) {
      this.currentLocale = newLocaleNormalized;
      this.provider.setLocale(newLocaleNormalized);
    }
  }

  translate(text: string, args: any = undefined): string {
    if (args) {
      return util.format(this.provider.getTranslation(text), args);
    }
    return util.format(this.provider.getTranslation(text));
  }
}
