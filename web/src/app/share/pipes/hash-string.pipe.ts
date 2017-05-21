import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hashString'
})
export class HashStringPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const expr = /(^|\s)(#[a-z\d-]+)/ig;
    if (expr.exec(value)) {
      return value.replace(expr, function (a) {
        return '<a class="msg-sent-link" target="_blank" href="https://www.twitter.com/hashtag/' + a.slice(2) + '">' + a + '</a>';
      });
    } else {
      return value;
    }
  }

}
