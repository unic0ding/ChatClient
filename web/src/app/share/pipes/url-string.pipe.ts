import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'urlString'
})
export class UrlStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const expr = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/;
    if (expr.exec(value)) {
      return value.replace(expr, function (a) {
        if (!a.startsWith('http')) {
          a = 'http://' + a;
        }
        // TODO: picture dialog onclick
        const imgExpr = /\.(?:jpg|gif|png)$/;
        if (imgExpr.exec(a)) {
          return '<a target="_blank" class="msg-sent-link" href="' + a + '">'
            + a + '</a><br><img width="600px" src="' + a + '">';
        }
        const vidExpr = /\.(?:mp4|webm|ogg)$/;
        if (vidExpr.exec(a)) {
          return '<a target="_blank" class="msg-sent-link" href="' + a + '">'
            + a + '</a><br><video src="' + a + '" controls muted loop width="600px">';
        }
        return '<a target="_blank" class="msg-sent-link" href="' + a + '">' + a + '</a>';
      });
    } else {
      return value;
    }
  }
}
