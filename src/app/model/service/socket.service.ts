import {Socket} from 'ngx-socket-io';
import {Injectable} from '@angular/core';
import {ModelConfiguration} from '../modelConfiguration';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {
  }

  setConfiguration(config: ModelConfiguration): void {
    // this.socket.emit('cat_configuration', 'go');
  }
}
