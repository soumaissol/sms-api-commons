import * as jf from 'joiful';

import { EmptyInput, InvalidInput } from '../errors';

function convertAndValidateInput<TData>(data: any, input: TData | null): TData {
  if (data === null || input === null) {
    throw new EmptyInput();
  }
  const { error }: { error: any } = jf.validate(input);
  if (error?.message) {
    if (error instanceof InvalidInput) {
      throw error;
    }
    throw new InvalidInput(error.message, 'validation_error');
  }

  return input;
}

function safelyParseData(data: any): any {
  if (data === null) {
    return {};
  }
  try {
    return JSON.parse(data || '{}');
  } catch (err) {
    return {};
  }
}

export { convertAndValidateInput, safelyParseData };
