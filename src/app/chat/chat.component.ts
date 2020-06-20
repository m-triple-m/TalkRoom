import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  @Input('roomdata') roomData;
  messages = [];
  currentuser;

  constructor(private chatservice: ChatService, private roomservice: RoomService) { }

  ngOnInit(): void {
    this.currentuser = JSON.parse(sessionStorage.getItem('user'));
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

    this.roomData.messages.push({message : msg, user : this.currentuser._id, created : new Date()});
    this.roomservice.updateRoom(this.roomData._id, {messages : this.roomData.messages}).subscribe(data => {
      console.log(data);
    })
  }

  joinRoom(){
    this.chatservice.joinRoom(this.roomData);
    console.log("Joined "+this.roomData.name+' room');
  }

}
