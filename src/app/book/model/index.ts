import { FieldValidation } from '../../shared/forms/validation';

export const Validation: { [field: string]: FieldValidation } = {
  author: {
    required: true,
    maxLength: 20,
  },

  title: {
    required: true,
    maxLength: 30,
  },

  isbn: {
    required: false,
    regExp: /(^[0-9]{10}$)|(^[0-9]{13}$)/,
  },
};

export interface Book {
  id: string;
  author: string;
  title: string;
  isbn?: string;
}

export type BookProperties = Omit<Book, 'id'>;
