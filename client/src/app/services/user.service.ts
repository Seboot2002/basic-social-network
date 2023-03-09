import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity: any;
  public token: any;
  public stats: any;

  constructor(public http: HttpClient) {
    this.url = environment.GlobalServerDirection;
  }

  register(user: User): Observable<any>{

    return this.http.post(this.url+"register", user, {responseType: "text"});

  }

  login(user: User, getToken: string | null | undefined){

    if (getToken != null) {
      user.getToken = getToken;
    }

    return this.http.post(this.url+"login", user, {responseType: "text"});

  }

  getLocalIdentity(){
    var identity = JSON.parse(localStorage.getItem("identity") || "[]");
    
    if (identity == "") {
      this.identity = null;
    }
    else
    {
      this.identity = identity;
    }

    return this.identity;

  }

  getLocalToken(){
    var token = JSON.parse(localStorage.getItem("token") || "[]");

    if (token == "") {
      this.token = null;
    }
    else
    {
      this.token = token;
    }

    return this.token.token;

  }

  getLocalStats(){
    var stats = JSON.parse(localStorage.getItem("stats") || "[]");

    if(stats != null){
      this.stats = stats;
    }
    else
    {
      this.stats = null;
    }

    return this.stats;

  }

  getCounters(userId: any | null){

    var headers = new HttpHeaders().set("Authorization", this.getLocalToken());

    if(userId != null)
    {
      return this.http.get(this.url+"counters/"+userId, {headers: headers});
    }
    else
    {
      return this.http.get(this.url+"counters", {headers: headers});
    }
  }

  updateUser(user: User, file: File){

    var headers = new HttpHeaders().set("Authorization", this.getLocalToken());
    
    var newDataUser = new FormData();
    newDataUser.append("name", user.name);
    newDataUser.append("surname", user.surname);
    newDataUser.append("nick", user.nick);
    newDataUser.append("email", user.email);
    newDataUser.append("avatar", file);

    return this.http.put(this.url+'update-user', newDataUser, {headers: headers});
    
  }

  getUsers(limitNum: number, pageNum: number){
    var headers = new HttpHeaders().set('Authorization', this.getLocalToken());

    return this.http.get(this.url+"getUsers", {headers: headers, params: { limit: limitNum, page: pageNum }, responseType: 'text'});
  }

  getProfile(id: any){
    var headers = new HttpHeaders().set('Authorization', this.getLocalToken());

    return this.http.get(this.url+"getUser/"+id, {headers: headers, responseType: 'text'});
  }

} 
