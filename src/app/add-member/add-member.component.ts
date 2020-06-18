import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from '../room.service';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  @Input('roomdata') roomData;
  constructor(private roomservice : RoomService, private userservice: UserService) { }

  ngOnInit(): void {
  }

  addMember(membername) {

    this.userservice.getUserByUsername(membername).subscribe(data => {
      console.log(data);
      if(data){
        if(!this.memberExists(data) && !(data['_id'] == this.roomData.admin._id)){
          let member = data;
          this.roomData.members.push(data);
          console.log(this.roomData);
          this.roomservice.updateRoom(this.roomData._id, {members : this.roomData.members}).subscribe(data => {
            console.log(data);
          });
        }else{
          Swal.fire({
            icon : 'info',
            title: 'Already Exists!',
            text : 'Username already exists'
          })
        }
      }else{
        Swal.fire({
          icon : 'error',
          title: 'Not Found!',
          text : 'Username not found'
        })
      }
    });
  }


  memberExists(sel_member){
    for(let member of this.roomData.members){
      console.log(member);
      if(member._id == sel_member._id){
        console.log(sel_member);
        return true;
      }
    }
    return false;
  }

}
