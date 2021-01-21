import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function createPasswordStrengthValidatorFn(): ValidatorFn {
    return(control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value){
            return null;
        }
        const hasUppercase = /[A-Z]+/.test(value);
        const hasLowercase = /[a=z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const passwordValid = hasUppercase && hasLowercase && hasNumeric;

        return !passwordValid ? {passwordStrength : true} : null;
    }
}
