import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string): string {
    const num1 = value.substring(0, 2);
    const num2 = value.substring(2, 5);
    const num3 = value.substring(5, 8);
    const num4 = value.substring(8, 12);
    return `+${num1} (${num2}) ${num3}-${num4}`;
  }

}
