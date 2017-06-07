/**
 * Created by basti on 07.05.17.
 */
import {Contact} from './contact.model';

export class Message {
  static fromJson(json) {
    if (json.data) {
      return new Message(json.id, new Date(json.sendAt), Contact.fromJson(json.author), json.text, json.data);
    } else {
      return new Message(json.id, new Date(json.sendAt), Contact.fromJson(json.author), json.text);
    }
  }

  constructor(public id: string, public sendAt: Date, public author: Contact, public text: string, public data?) {
  }

  toJson() {
    return JSON.stringify({id: this.id, sendAt: this.sendAt, author: this.author, text: this.text});
  }
}
