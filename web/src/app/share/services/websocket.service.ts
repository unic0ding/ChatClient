import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WebsocketService {
  socket: WebSocket;
  connected: boolean;

  constructor() {
  }

  connect(url: string): Observable<MessageEvent> {
    this.socket = new WebSocket(url);
    const openListener$ = Observable.fromEvent(this.socket, 'open')
      .do(() => this.connected = true);

    return openListener$;
  }

  getListener() {
    const listener$ = Observable.fromEvent(this.socket, 'message')
      .map((event) => <MessageEvent> event)
      .map((event) => JSON.parse(event.data))
      .filter((event) => event.type === 'event' || event.type === 'error');
    return listener$;
  }

  getClosedListener(): Observable<MessageEvent> {
    const closedListener$ = Observable.fromEvent(this.socket, 'close')
      .map((event) => <MessageEvent> event);

    return closedListener$;
  }

  emit(command) {
    this.socket.send(JSON.stringify(command));
  }

}
