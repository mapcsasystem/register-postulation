import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addYear'
})
export class AddYearPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
