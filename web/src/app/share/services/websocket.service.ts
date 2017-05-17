import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WebsocketService {
  socket: WebSocket;

  constructor() {
  }

  connect(url: string): Observable<MessageEvent> {
    this.socket = new WebSocket(url);
    const openListener$ = Observable.fromEvent(this.socket, 'open');

    return openListener$;
  }

  getListener() {
    const listener$ = Observable.fromEvent(this.socket, 'message')
      .map((event) => <MessageEvent> event)
      .map((event) => event.data);

    return listener$;
  }

  emit(command) {
    this.socket.send(JSON.stringify(command));
  }

}
