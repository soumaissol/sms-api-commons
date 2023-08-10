import type { APIGatewayProxyEvent } from 'aws-lambda';

import { UserSession } from '../entity';

const getUserSessionFromEvent = (event: APIGatewayProxyEvent): UserSession | null => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (event != null && event.headers && event.headers.Authorization) {
    return new UserSession(event.headers.Authorization);
  }
  return null;
};

export { getUserSessionFromEvent };
