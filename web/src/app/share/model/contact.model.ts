/**
 * Created by basti on 06.05.17.
 */
export class Contact {
  static fromJson(json) {
    return new Contact(json.id, json.name, json.email);
  }

  static fromJsonArray(json) {
    return json.map(Contact.fromJson);
  }

  constructor(public id: number, public name: string, public email: string) {
  }
}
