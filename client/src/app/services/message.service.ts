import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from './user.service';
import { Message } from '../models/message';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public url: string;
  
  constructor
  (
    private _http: HttpClient,
    private _userService: UserService
  ) 
  {
    this.url = environment.GlobalServerDirection;
  }

  addMessage(token: any, message: any){
    let headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(this.url+'message', message, { headers: headers });
  }

  getEmitMessages(token: any, page = 1, items: any){
    let headers = new HttpHeaders().set('Authorization', token);

    return this._http.get(this.url+'my-messages', {headers: headers, params: {page: page, items: items}});
  }

  getReceivedMessages(token: any, page = 1, items: any){
    let headers = new HttpHeaders().set('Authorization', token);

    return this._http.get(this.url+'received-messages', {headers: headers, params: {page: page, items: items}});
  }

}
