import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addYear'
})
export class AddYearPipe implements PipeTransform {

  transform(value: string): string {
    // tslint:disable-next-line: radix
    const num = parseInt(value);
    return (num > 1 ? `${num} años` : `${num} año`);
  }

}
