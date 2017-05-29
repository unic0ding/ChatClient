import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'urlString'
})
export class UrlStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const expr = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/;
    if (expr.exec(value)) {
      return value.replace(expr, function (a) {
        if (a.startsWith('www.')) {
          a = 'http://' + a;
        }
        if (a.endsWith('.jpg') || a.endsWith('.png')) {
          return '<a target="_blank" class="msg-sent-link" href="' + a + '">' + a + '</a><br><img src="' + a + '">';
        }
        if (a.endsWith('.mp4')) {
          return '<a target="_blank" class="msg-sent-link" href="' + a + '">'
            + a + '</a><br><video src="' + a + '" controls loop width="600px">';
        }
        return '<a target="_blank" class="msg-sent-link" href="' + a + '">' + a + '</a>';
      });
    } else {
      return value;
    }
  }

}
