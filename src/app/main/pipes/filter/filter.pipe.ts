import { Pipe, PipeTransform } from '@angular/core';
import { PostulationModel } from 'src/app/shared/models/postulations.models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: PostulationModel[], arg: string, dateStart?: Date, dateEnd?: Date): PostulationModel[] {
    const arr: PostulationModel[] = [];
    for (const post of value) {
      if (post.country.toLowerCase().indexOf(arg) > -1 || post.name.toLowerCase().indexOf(arg) > -1) {
        arr.push(post);
      }
    }
    return arr;
  }

}
