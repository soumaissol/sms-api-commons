import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import { GenericError } from '../errors';

export class UserSession {
  readonly authToken: string;
  readonly id: string;
  readonly email: string;
  readonly roles: string[];

  constructor(bearerToken: string) {
    this.authToken = bearerToken.trim().replace(/Bearer\s+/g, '');
    let decodedToken: null | JwtPayload = null;
    try {
      decodedToken = jwt.decode(this.authToken, { json: true });
    } catch (err) {
      throw new GenericError('invalid token', 'invalid_token', true);
    }

    if (decodedToken === null) {
      throw new GenericError('token decoded is null', 'token_decoded_is_null', true);
    }

    if (!decodedToken.sub) {
      throw new GenericError('invalid token', 'invalid_token', true);
    }
    this.id = decodedToken.sub;
    this.email = decodedToken.email;
    this.roles = decodedToken['custom:role'].split(',');
  }
}
