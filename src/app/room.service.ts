import { Injectable } from '@angular/core';
import { configs } from './config';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  url = configs.api_url+'/room';
  currentroom;
  constructor(private http: HttpClient) { }

  addRoom(data){
    return this.http.post(this.url+'/add', data);
  }

  updateRoom(id, data){
    return this.http.put(this.url+'/update/'+id, data);
  }

  getRoomsbyUser(id){
    return this.http.get(this.url+'/getbyadmin/'+id);
  }

  getRoombyMember(id){
    return this.http.get(this.url+'/getbymember/'+id);
  }
}
