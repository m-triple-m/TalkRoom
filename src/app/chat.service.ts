import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { configs } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket;
  url = configs.api_url;
  constructor() {
    this.joinUser();
  }

  joinUser(){
    this.socket = io(this.url);
  }

  joinRoom(data){
    this.socket.emit('joinroom', data);
  }

  sendRoomMessage(data){
    this.socket.emit('send-room-msg', data);
  }

  recieveRoomMessage(){
    return Observable.create( observer => {
      this.socket.on('rec-room-msg', data => {
        observer.next(data);
      })
    })
  }


}
