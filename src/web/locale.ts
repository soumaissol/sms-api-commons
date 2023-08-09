import type { APIGatewayProxyEvent } from 'aws-lambda';

import type { LocaleProvider } from '../locale';
import { Locale } from '../locale';

const buildLocaleFromEvent = (localeProvider: LocaleProvider, event: APIGatewayProxyEvent | null): Locale => {
  const locale = new Locale(localeProvider);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (event != null && event.headers && event.headers['Accept-Language']) {
    const acceptLanguages = event.headers['Accept-Language'].split(',');
    locale.setLocale(acceptLanguages[0]);
  }

  return locale;
};

export { buildLocaleFromEvent };
