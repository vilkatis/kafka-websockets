import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({providedIn: 'root'})
export class WebsocketService {
  private _socket: Socket;
  constructor() {
    const socket = io();
    socket.on('connect', () => {
      console.log('socket connected');
    });
    this._socket = socket;
  }

  subscribeToSocket(userId: string): Observable<unknown> {
    console.log(`Subscribe to socket with userId: ${userId}`);
    const userSubject = new Subject();
    this._socket.on('message', (data: any) => console.log('Got data', data));
    this._socket.on(userId, data => {
      console.log('Got message', data);
      userSubject.next(data);
    });
    return userSubject.asObservable();
  }
}
