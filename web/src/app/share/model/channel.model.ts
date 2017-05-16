/**
 * Created by basti on 13.05.17.
 */
import {Contact} from './contact.model';

export class Channel {
  static fromJson(json) {
    return new Channel(json.name, json.members.map(c => new Contact(c.id, c.name, c.email)));
  }

  constructor(public name: string, public members: Array<Contact>) {
  }
}
