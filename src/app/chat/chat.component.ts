import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  @Input('roomdata') roomData;
  messages = [];

  constructor(private chatservice: ChatService) { }

  ngOnInit(): void {
    this.joinRoom();
    this.chatservice.recieveRoomMessage().subscribe(data => {
      this.messages.push(data);
    })
  }

  ngOnChanges(){
    console.log('room changed!!');
    this.joinRoom();
  }

  sendMessage(msg){
    let obj = {message : msg, roomname : this.roomData.name, sent : true};
    this.chatservice.sendRoomMessage(obj);
    this.messages.push(obj);
  }

  joinRoom(){
    this.chatservice.joinRoom(this.roomData);
    console.log("Joined "+this.roomData.name+' room');
  }

}
