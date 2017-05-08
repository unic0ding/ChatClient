/**
 * Created by basti on 07.05.17.
 */
import {Contact} from './contact.model';

export class Message {
  constructor(public id: number, public sendAt: Date, public author: Contact, public text: string) {
  }
}
