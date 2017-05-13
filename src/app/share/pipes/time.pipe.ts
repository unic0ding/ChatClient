import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(date: any, args?: any): any {
    if (date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      let back;
      if (minutes <= 9) {
        back = hours + ':0' + minutes;
      } else {
        back = hours + ':' + minutes;
      }
      return back;

    }
  }

}
