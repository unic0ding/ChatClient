import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class WebsocketService {
  socket: WebSocket;
  connected: boolean;
  openListener$: Observable<MessageEvent>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  // private url = 'ws://localhost:8080/room';
  private url = 'ws://localhost:5001';

  constructor() {
  }

  connect(): Observable<MessageEvent> {
    this.socket = new WebSocket(this.url);
    this.openListener$ = Observable.fromEvent(this.socket, 'open')
      .do(() => this.connected = true);

    return this.openListener$;
  }

  getListener(): Observable<any> {
    return Observable.fromEvent(this.socket, 'message')
      .map((event) => <MessageEvent> event)
      .map((event) => JSON.parse(event.data))
      .do(console.log)
      .filter((event) => event.type === 'event' || event.type === 'error');
  }

  getClosedListener(): Observable<CloseEvent> {
    return Observable.fromEvent(this.socket, 'close')
      .map((event) => <CloseEvent> event);
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
