import { Pipe, PipeTransform } from '@angular/core';
import { PostulationModel } from 'src/app/shared/models/postulations.models';

@Pipe({
  name: 'dates'
})
export class DatesPipe implements PipeTransform {

  transform(value: PostulationModel[], dateStart?: Date, dateEnd?: Date): PostulationModel[] {
    if (value.length === 0) {
      return value;
    }
    if (dateStart && dateEnd) {
      const arr: PostulationModel[] = [];
      const start = Date.parse(dateStart.toISOString());
      const end = Date.parse(dateEnd.toISOString());
      for (const post of value) {
        const datePost = Date.parse(post.createdAt);
        if ((datePost >= start) && (datePost <= end)) {
          arr.push(post);
        }
      }
      return arr;
    } else {
      return value;
    }
  }

}
