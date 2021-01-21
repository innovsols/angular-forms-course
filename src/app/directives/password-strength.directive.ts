import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { createPasswordStrengthValidatorFn } from '../validators/password-strength-validator';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[passwordStrength]',
  // The below is the syntax to inject the dependency to make the directive form field directive
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordStrengthDirective, multi: true}]
})
export class PasswordStrengthDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
   return createPasswordStrengthValidatorFn()(control);
  }

}
