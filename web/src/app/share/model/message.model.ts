/**
 * Created by basti on 07.05.17.
 */
import {Contact} from './contact.model';

export class Message {
  static fromJson(json) {
    // json = JSON.parse(json);
    return new Message(json.id, new Date(json.sendAt), Contact.fromJson(json.author), json.text);
  }

  constructor(public id: number, public sendAt: Date, public author: Contact, public text: string) {
  }

  toJson() {
    return JSON.stringify({id: this.id, sendAt: this.sendAt, author: this.author, text: this.text});
  }
}
