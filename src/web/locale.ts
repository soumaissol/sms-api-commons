import type { APIGatewayProxyEvent } from 'aws-lambda';

import type { LocaleProvider } from '../locale';
import { Locale } from '../locale';

const buildLocaleFromEvent = (localeProvider: LocaleProvider, event: APIGatewayProxyEvent): Locale => {
  const locale = new Locale(localeProvider);
  if (event.headers['Accept-Language']) {
    const acceptLanguages = event.headers['Accept-Language'].split(',');
    locale.setLocale(acceptLanguages[0]);
  }

  return locale;
};

export { buildLocaleFromEvent };
