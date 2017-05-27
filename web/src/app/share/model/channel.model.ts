/**
 * Created by basti on 13.05.17.
 */
import {Contact} from './contact.model';
import {Message} from './message.model';

export class Channel {
  notification: number;
  showNotification = true;
  messages: Array<Message>;

  static fromJson(json) {
    return new Channel(json.name, json.members.map(Contact.fromJson));
  }

  static fromJsonArray(json): Channel[] {
    return json.map(Channel.fromJson);
  }

  constructor(public name: string, public members: Array<Contact>) {
    this.messages = [];
  }

  public updateNotification(): void {
    if (this.showNotification) {
      if (this.notification) {
        this.notification++;
      } else {
        this.notification = 1;
      }
    }
  }

  public resetNotification(): void {
    this.notification = null;
  }

  public setNotification(value: boolean): void {
    this.showNotification = value;
    this.resetNotification();
  }
}
