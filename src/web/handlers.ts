import type { APIGatewayProxyResult } from 'aws-lambda';
import HttpStatus from 'http-status-codes';

import type { Locale } from '../locale';
import { Logger } from '../logger';

function defaultHeaders(): any {
  return {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };
}

function sendHttpOkResponse(data: any): APIGatewayProxyResult {
  return {
    statusCode: HttpStatus.OK,
    body: JSON.stringify(data),
    headers: defaultHeaders(),
  };
}

function sendHtttpError(locale: Locale, err: any): APIGatewayProxyResult {
  const logger = Logger.get();
  logger.error(`catch error ${JSON.stringify(err)}`);

  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let body = JSON.stringify({ message: err?.message || 'Unknow error' });

  if (err.code && err.message) {
    body = JSON.stringify({
      code: err.code,
      message: err.needsTranslation === false ? err.message : locale.translate(err.message),
    });
    statusCode = buildHttpStatusFromErrorCode(err.code);
  }

  return { statusCode, body, headers: defaultHeaders() };
}

function buildHttpStatusFromErrorCode(code: string): number {
  switch (code) {
    case 'unauthorized':
      return HttpStatus.UNAUTHORIZED;
    case 'forbidden':
      return HttpStatus.FORBIDDEN;
    case 'not_found':
      return HttpStatus.NOT_FOUND;
  }
  return HttpStatus.BAD_REQUEST;
}

export { sendHttpOkResponse, sendHtttpError };
