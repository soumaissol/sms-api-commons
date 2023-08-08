import { InvalidInput } from './invalid-input';

export class EmptyInput extends InvalidInput {
  constructor() {
    super('data is not defined', 'data_not_defined');
  }
}
