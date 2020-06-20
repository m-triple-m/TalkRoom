import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrls: ['./createroom.component.css']
})
export class CreateroomComponent implements OnInit {

  roomform;
  currentuser;
  protect = false;

  constructor(private fb: FormBuilder, private roomservice: RoomService) { }

  ngOnInit(): void {
    this.currentuser = JSON.parse(sessionStorage.getItem('user'));

    this.roomform = this.fb.group({
      name : ['', Validators.required],
      admin : this.currentuser._id,
      password : ['', Validators.required],
      created : new Date()
    })
  }

  createRoom(formdata){
    console.log(formdata);
    formdata.private = this.protect;
    this.roomservice.addRoom(formdata).subscribe(data => {
      console.log(data);
      // this.roomservice.currentroom = data;
    });
  }

}
