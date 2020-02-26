import { AbstractControl, ValidationErrors } from '@angular/forms';


export class BirthDateValidators {

    static notValidBirthDate(control : AbstractControl) : ValidationErrors | null {
        let birthDate : number = +(control.value as string).slice(0, 2);
        let birthMonth : number = +(control.value as string).slice(3,5);
        let birthYear : number = +(control.value as string).slice(6, 10);

        let isLeapYear : boolean = false;

        // console.log(birthDate);
        // console.log(birthMonth);
        // console.log(birthYear);

        if(birthYear > 1900 && birthYear <= new Date().getFullYear()) {

            if(birthYear % 400 == 0) {
                isLeapYear = true;
            } 
            if(birthYear % 100 == 0) {
                isLeapYear = false;
            }
            if(birthYear % 4 == 0) {
                isLeapYear = true;
            }

        } else {
            return { notValidBirthDate : true };
        }

        if(birthMonth >= 1 && birthMonth <= 12) {

            if(birthMonth == 1 || birthMonth == 3 || birthMonth == 5 || birthMonth == 7 || birthMonth == 8 || birthMonth == 10 || birthMonth == 12) {
                if(birthDate > 31 || birthDate < 0) {
                    return { notValidBirthDate : true };
                }
            }

            if(birthMonth == 4 || birthMonth == 6 || birthMonth == 9 || birthMonth == 11) {
                if(birthDate > 30 || birthDate < 0) {
                    return { notValidBirthDate : true };
                }
            }

            if(birthMonth == 2 && isLeapYear) {
                if(birthDate > 29 || birthDate < 0) {
                    return { notValidBirthDate : true };
                }
            }

            if(birthMonth == 2 && !isLeapYear) {
                if(birthDate > 28 || birthDate < 0) {
                    return { notValidBirthDate : true };
                }
            }

        } else {
            return { notValidBirthDate : true };
        }

        return null;
    }

}