import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name : 'MaxLength'
})
export class MaxLengthPipe implements PipeTransform {
    transform(value : string, length : number) : string {
        let newStr = "";

        if(value.length > length) {
            newStr = value.slice(0, length)+"...";
            return newStr;
        }

        return value;
    }
}