import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {ModelConfiguration} from '../modelConfiguration';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  constructor(private socket: Socket) { }

  sendConfiguarion(configuration: ModelConfiguration): void {
    this.socket.emit('cat_configuration', configuration);
  }

  getConfiguration(): Observable<ModelConfiguration> {
    return this.socket.fromEvent('cat_configuration');
  }
}
