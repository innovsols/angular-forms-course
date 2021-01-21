import { FormGroup, ValidatorFn, Validators } from '@angular/forms';


export function createPromoPeriodValidator(): ValidatorFn {

    return (form: FormGroup): Validators | null => {
        const start: Date = form.get('promoStartDate').value;

        const end: Date = form.get('promoEndDate').value;

        if (start && end) {
            const isPeriodValid = (end?.getTime() - start?.getTime() > 0);

            return isPeriodValid ? null : { promoPeriod: true };
        }
        return null;
    }
}