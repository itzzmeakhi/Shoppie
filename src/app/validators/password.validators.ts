import { AbstractControl,ValidationErrors } from '@angular/forms';

export class PasswordValidators {

    static passwordHasNoNumber(control : AbstractControl) : ValidationErrors | null {

        // Has Number Validator returns true if there is no digit in password

        let hasNumber = /\d/.test(control.value);

        if(!hasNumber) {
            return { passwordHasNoNumber : true };
        }

        return null;
    }

    static passwordHasNoUppercase(control : AbstractControl) : ValidationErrors | null {

        // Has Uppercase Validator returns true if no uppercase letter is present

        let hasUppercase = /[A-Z]/.test(control.value);

        if(!hasUppercase) {
            return { passwordHasNoUppercase : true};
        }

        return null;
    }

    static passwordHasNoLowercase(control : AbstractControl) : ValidationErrors | null {

        // Has Lowercase Validator returns true if no lowercase letter is present

        let hasLowercase = /[a-z]/.test(control.value);

        if(!hasLowercase) {
            return { passwordHasNoLowercase : true };
        }

        return null;
    }

    static passwordHasNoSpecialCharacters(control : AbstractControl) : ValidationErrors | null {
        
        // Has Special characters Validator returns true if no special character is present

        let hasSpecialCharacters = /[.!@#$]/.test(control.value);

        if(!hasSpecialCharacters) {
            return { passwordHasSpecialCharacters : true };
        }

        return null;
    }

    static passwordHasNoMinimumLength(control : AbstractControl) : ValidationErrors | null {

        // Has Minimum length Validator returns true if password doesn't has minimum length

        let hasMinimumLength = (control.value as string).length > 7 ? true : false;

        if(!hasMinimumLength) {
            return { passwordHasNoMinimumLength : true };
        }

        return null;
    }

}