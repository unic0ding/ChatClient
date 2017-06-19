import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(name: string, args?: any): any {
    if (name === '') {
      return '?';
    }
    const splittedName: Array<string> = name.split(' ');
    if (splittedName.length === 1) {
      return splittedName[0].charAt(0).toUpperCase();
    }
    if (splittedName.length === 2) {
      return splittedName[0].charAt(0).toUpperCase() + splittedName[1].charAt(0).toUpperCase();
    } else {
      return splittedName[0].charAt(0).toUpperCase() + splittedName[splittedName.length - 1].charAt(0).toUpperCase();
    }
  }

}
