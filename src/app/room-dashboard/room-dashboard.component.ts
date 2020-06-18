import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.css']
})
export class RoomDashboardComponent implements OnInit {

  messages = [];
  showCreateRoom = false;
  showChatRoom = false;
  showAddMem = false;

  currentuser;
  allrooms;
  roomMembers;

  constructor(private chatservice: ChatService, public roomservice: RoomService) { }

  ngOnInit(): void {
    this.currentuser = JSON.parse(sessionStorage.getItem('user'));

    this.getUserRooms();
  }

  hideall(){
    this.showCreateRoom = false;
    this.showChatRoom = false;
    this.showAddMem = false;
  }

  toggleCreateRoom(){
    this.hideall();
    this.showCreateRoom = true;
  }

  toggleChatRoom(){
    this.hideall();
    this.showChatRoom = true;
  }
  
  toggleAddMem(){
    this.hideall();
    this.showAddMem = true;
  }

  getUserRooms(){
    this.roomservice.getRoomsbyUser(this.currentuser._id).subscribe(data => {
      console.log(data);
      this.allrooms = data;
      // this.roomservice.currentroom = data[0];
      this.roomservice.getRoombyMember(this.currentuser._id).subscribe(data => {
        console.log(data);
        this.allrooms = this.allrooms.concat(data);
        console.log(this.allrooms);
        this.selectRoom(this.allrooms[0]);
      })
    })

    
  }

  selectRoom(room){
    this.roomservice.currentroom = room;
    this.roomMembers = room.members;
  }

}
