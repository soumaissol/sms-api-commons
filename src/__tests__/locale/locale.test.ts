import type { LocaleProvider } from '../../locale';
import { Locale } from '../../locale';

class MyLocaleProvider implements LocaleProvider {
  constructor(private currentLocale: string) {}
  getDefaultLocale(): string {
    return 'en';
  }
  getLocales(): string[] {
    return ['en', 'pt-br'];
  }
  setLocale(newLocale: string): void {
    this.currentLocale = newLocale;
  }
  getTranslation(text: string): string {
    return `${text}-${this.currentLocale}`;
  }
}

describe('Test Locale', () => {
  it('should return default current locale', () => {
    const locale = new Locale(new MyLocaleProvider('en'));

    expect(locale.getCurrentLocale()).toBe('en');
  });

  it('should return available locales', () => {
    const locale = new Locale(new MyLocaleProvider('en'));

    expect(locale.getLocales()).toEqual(['en', 'pt-br']);
  });

  it('should return new locale', () => {
    const locale = new Locale(new MyLocaleProvider('en'));
    locale.setLocale('pt-br');
    expect(locale.getCurrentLocale()).toBe('pt-br');
  });

  it('should return new locale ignoring case', () => {
    const locale = new Locale(new MyLocaleProvider('en'));
    locale.setLocale('en');
    locale.setLocale('PT-Br');
    expect(locale.getCurrentLocale()).toBe('pt-br');
  });

  it('should return transalation', () => {
    const locale = new Locale(new MyLocaleProvider('en'));
    locale.setLocale('en');
    locale.setLocale('PT-Br');
    expect(locale.translate('invalid email')).toBe('invalid email-pt-br');
  });
});
