import {animate, keyframes, style, transition, trigger} from '@angular/animations';
/**
 * Created by basti on 19.05.17.
 */
export const fallIn = trigger('fallInAnimation', [
  transition('void => *', [animate(400, keyframes([
    style({opacity: 0.5, transform: 'translateX(-100%)', offset: 0}),
    style({opacity: 0.5, transform: 'translateX(-75%)', offset: 0.25}),
    style({opacity: 0.5, transform: 'translateX(-50%)', offset: .5}),
    style({opacity: 1, transform: 'translateX(-25%)', offset: .75}),
    style({opacity: 1, transform: 'translateX(0%)', offset: 1}),
  ]))
  ]),
]);

