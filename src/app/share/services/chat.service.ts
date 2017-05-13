import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ChatService {
  public messages: Subject<any>;
  private url = 'ws://echo.websocket.org';


  constructor(private wsService: WebsocketService) {
    // this.messages = <Subject<any>>wsService
    //   .connect(this.url)
    //   .map((response: MessageEvent) => {
    //     return response.data;
    //   });
  }

  getMessages(url): Subject<any>{
    const messages = <Subject<any>> this.wsService
      .connect(url)
      .map((response: MessageEvent) => {
        return response.data;
      });
    return messages;
  }

}


// private url = 'ws://localhost:8080/echo/';
// private socket: WebSocket;
// private listener: EventEmitter<any> = new EventEmitter();

// constructor() {
// this.socket = new WebSocket(this.url);
// this.socket.onopen = event => {
//   this.listener.emit({'type': 'open', 'data': event});
// };
// this.socket.onclose = event => {
//   this.listener.emit({'type': 'close', 'data': event});
// };
// this.socket.onmessage = event => {
//   this.listener.emit({'type': 'message', 'data': event.data});
//   this.listener.emit({'type': 'message', 'data': JSON.parse(event.data)});
// };
// }

// public sendMessage(data: string) {
//   this.socket.send(data);
// }

// public close() {
//   this.socket.close();
// }

// public getEventListener() {
//   return this.listener;
// }

// public getSocket() {
//   const socket = new WebSocket(this.url);
//   const listener: EventEmitter<any> = new EventEmitter();
//   socket.onopen = event => {
//     listener.emit({'type': 'open', 'data': event});
//   };
//   socket.onclose = event => {
//     listener.emit({'type': 'close', 'data': event});
//   };
//   socket.onmessage = event => {
//     listener.emit({'type': 'message', 'data': event.data});
//       this.listener.emit({'type': 'message', 'data': JSON.parse(event.data)});
// };
// return {socket: socket, listener: listener};
// }
