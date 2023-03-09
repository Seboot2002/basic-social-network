import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Follow } from '../models/follow';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  public url: string;

  constructor(
    private http: HttpClient
  )
  {
    this.url = environment.GlobalServerDirection;
  }

  addFollow(follow: any, token: any){
    var headers = new HttpHeaders().set('Authorization', token);
    
    return this.http.post(this.url+"follow", follow, {headers: headers});

  }

  deleteFollow(id: any, token: any){
    var headers = new HttpHeaders().set('Authorization', token);
    
    return this.http.delete(this.url+"follow/"+id, {headers: headers});

  }

  getFollowing(id: any, page: any, token: any){
    var headers = new HttpHeaders().set('Authorization', token);
    
    return this.http.get(this.url+"following/"+id, {headers: headers, params: {page: page, limit: 4}, responseType: 'text'});
  }

  getFollowed(id: any, page: any, token: any){
    var headers = new HttpHeaders().set('Authorization', token);
    
    return this.http.get(this.url+"followed/"+id, {headers: headers, params: {page: page, limit: 4}, responseType: 'text'});
  }

  getMyFollows(token: any){
    var headers = new HttpHeaders().set('Authorization', token);
    
    return this.http.get(this.url+"get-my-follows", {headers: headers, params: {followed: "true"}, responseType: 'text'});
  }

}
