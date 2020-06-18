import { Injectable } from '@angular/core';
import { configs } from './config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedin = false;
  url = configs.api_url+'/user';
  constructor(private http: HttpClient) {
    if(sessionStorage.getItem('user')){
      this.loggedin  = true;
    }
  }

  addUser(data){
    return this.http.post(this.url+'/add', data);
  }

  getUserByUsername(username){
    return this.http.get(this.url+'/getbyusername/'+username);
  }

  getUserById(id){
    return this.http.get(this.url+'/getbyid/'+id);
  }

  getAllUsers(){
    return this.http.get(this.url+'/getall');
  }

}
