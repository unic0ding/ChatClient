import {AfterViewInit, Directive} from '@angular/core';
declare const componentHandler: any;

@Directive({
  selector: '[app-mdl]'
})
export class MDL implements AfterViewInit {

  ngAfterViewInit(): void {
    componentHandler.upgradeAllRegistered();
  }

}
