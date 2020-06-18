import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  reg_form;
  login_form;
  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
    this.reg_form = this.fb.group({
      name : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required],
      email : ['', Validators.required],
      created : new Date(),
    })

    this.login_form = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
    })
  }

  register(formdata){
    if(this.reg_form.invalid){
      alert('invalid form')
      return;
    }
    this.userservice.addUser(formdata).subscribe(data => {
      console.log(data);
    })

  }

  login(formdata){
    this.userservice.getUserByUsername(formdata.username).subscribe(data => {
      if(data){
        console.log(data);
        if(data['password'] == formdata['password']){
          sessionStorage.setItem('user', JSON.stringify(data));
          this.userservice.loggedin = true;
          this.router.navigate(['/room']);
        }else{
          console.log('password wrong!');
        }
      }else{
        console.log('user not found');
      }
    })
  }

}
