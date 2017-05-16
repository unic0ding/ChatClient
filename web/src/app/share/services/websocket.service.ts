import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  private subject: Subject<MessageEvent>;

  connect(url) {
    if (!this.subject) {
      this.subject = this.createWebsocket(url);
    }
    return this.subject;
  }

  createWebsocket(url): Subject<MessageEvent> {
    const socket = new WebSocket(url);

    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      socket.onmessage = obs.next.bind(obs);
      socket.onerror = obs.error.bind(obs);
      socket.onclose = obs.complete.bind(obs);

      return socket.close.bind(socket);
    });

    const observer = {
      next: (data: Object) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(data);
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
