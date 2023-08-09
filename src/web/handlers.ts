import type { APIGatewayProxyResult } from 'aws-lambda';
import HttpStatus from 'http-status-codes';

import type { Locale } from '../locale';
import { Logger } from '../logger';

const defaultHeaders = (): any => {
  return {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };
};

const sendHttpOkResponse = (data: any): APIGatewayProxyResult => {
  return {
    statusCode: HttpStatus.OK,
    body: JSON.stringify(data),
    headers: defaultHeaders(),
  };
};

const sendHtttpError = (locale: Locale, err: any): APIGatewayProxyResult => {
  const logger = Logger.get();
  logger.error(`catch error ${JSON.stringify(err)}`);

  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let body = JSON.stringify({ message: err?.message || 'Unknow error' });

  if (err.code && err.message) {
    body = JSON.stringify({
      code: err.code,
      message: err.needsTranslation === false ? err.message : locale.translate(err.message),
    });
    statusCode = HttpStatus.BAD_REQUEST;
  }

  return { statusCode, body, headers: defaultHeaders() };
};

export { sendHttpOkResponse, sendHtttpError };
