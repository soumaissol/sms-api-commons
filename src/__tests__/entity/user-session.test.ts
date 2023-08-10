import jwt from 'jsonwebtoken';

import { UserSession } from '../../entity';
import { GenericError } from '../../errors';

describe('Test UserSession', () => {
  it('should throw error when token is empty', () => {
    try {
      new UserSession('');
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toEqual(new GenericError('token decoded is null', 'token_decoded_is_null', true));
    }
  });

  // it('should throw error when token is invalid', () => {
  //   try {
  //     new UserSession('$!#!@');
  //     expect(true).toBe(false);
  //   } catch (err) {
  //     expect(err).toEqual(new GenericError('invalid token', 'invalid_token', true));
  //   }
  // });

  it('should throw error when token payload is invalid', () => {
    try {
      new UserSession(jwt.sign({ test: true }, 'teste'));
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toEqual(new GenericError('invalid token', 'invalid_token', true));
    }
  });

  it('should return object when token is valid', () => {
    const authToken = jwt.sign(
      {
        sub: 'my-id',
        'custom:role': 'user',
        email: 'email@email.com',
      },
      'teste',
    );
    const userSession = new UserSession(authToken);
    expect(userSession.authToken).toBe(authToken);
    expect(userSession.id).toBe('my-id');
    expect(userSession.email).toBe('email@email.com');
    expect(userSession.roles).toEqual(['user']);
  });

  it('should return object when bearer token is valid', () => {
    const authToken = jwt.sign(
      {
        sub: 'my-id',
        'custom:role': 'user',
        email: 'email@email.com',
      },
      'teste',
    );
    const userSession = new UserSession(`Bearer ${authToken}`);
    expect(userSession.authToken).toBe(authToken);
    expect(userSession.id).toBe('my-id');
    expect(userSession.email).toBe('email@email.com');
    expect(userSession.roles).toEqual(['user']);
  });
});
