import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidator {

  /**
   * If we want to use the validator function with parameters, it needs to be wrapped within a factory function which
   * returns it.
   *
   *  (Copied from apm-forms project)
   */
  static range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const input = control.value;
      if (input !== undefined && (isNaN(input) || input < min || input > max)) {
        // the returned rule name matches the one defined in the HTML (range)
        return { 'range': true };
      } else {
        return null;
      }
    };
  }
}
