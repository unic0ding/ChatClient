import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs";

@Injectable()
export class WebsocketService {
  socket: WebSocket;
  connected: boolean;
  openListener$: Observable<MessageEvent>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
  }

  connect(url: string): Observable<MessageEvent> {
    this.socket = new WebSocket(url);
    this.openListener$ = Observable.fromEvent(this.socket, 'open')
      .do(() => this.connected = true);

    return this.openListener$;
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
    if (this.connected) {
      this.socket.send(JSON.stringify(command));
    } else {
      this.openListener$.takeUntil(this.ngUnsubscribe)
        .subscribe(() => {
          this.emit(command);
        });
    }
  }

}
