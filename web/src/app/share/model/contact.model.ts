/**
 * Created by basti on 06.05.17.
 */
export class Contact {
  static fromJson(json) {
    if (json.avatarUrl) {
      return new Contact(json.id, json.name, json.email, json.avatarUrl);
    }else {
      return new Contact(json.id, json.name, json.email);
    }
  }

  static fromJsonArray(json) {
    return json.map(Contact.fromJson);
  }

  constructor(public id: number, public name: string, public email: string, public avatarUrl?: string) {
  }
}
