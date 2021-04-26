import { ValidatorFn, Validators } from '@angular/forms';

export interface FieldValidation {
  required?: boolean;
  maxLength?: number;
  regExp?: RegExp;
}

export function createValidatorsFrom(fieldValidation: FieldValidation): ValidatorFn[] {
  const validators: ValidatorFn[] = [];
  if (fieldValidation?.required) {
    validators.push(Validators.required);
  }
  if (fieldValidation.maxLength != null) {
    validators.push(Validators.maxLength(fieldValidation.maxLength));
  }
  if (fieldValidation.regExp != null) {
    validators.push(Validators.pattern(fieldValidation.regExp));
  }

  return validators;
}
