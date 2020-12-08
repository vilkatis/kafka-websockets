import { Service } from 'typedi';
import { io, Socket } from 'socket.io-client';

@Service()
export class SocketService {
  private _socket: Socket;
  constructor() {
    console.log('Socker service constructor');
    const socket = io('http://reverse_proxy');
    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.on('connect_error', (error: any) => {
      console.log('Connect error', error);
    });
    this._socket = socket;
  }

  public sendMessage<T>(message: T): void {
    console.log('sending message', message);
    this._socket.emit('message', message);
  }
}
