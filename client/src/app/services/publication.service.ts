import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  public url: string;

  constructor(
    private http: HttpClient
  )
  {
    this.url= environment.GlobalServerDirection;
  }

  addPublication(publication: any, fileImg: any, token: any){

    var headers = new HttpHeaders().set('Authorization', token);

    var newPublication = new FormData();
    newPublication.append("text", publication.text);
    newPublication.append("image", fileImg);
    //Lo demás se agrega por backend

    return this.http.post(this.url+"publication", newPublication, {headers: headers});

  }

  getPublications(token: any, page: any){
    var headers = new HttpHeaders().set('Authorization', token);

    return this.http.get(this.url+"getPublications", {headers: headers, responseType: 'text', params: {page: page, items: 4}});
  }

  getPublicationsUser(id: any, token: any, page: any){
    var headers = new HttpHeaders().set('Authorization', token);

    return this.http.get(this.url+"getPublicationsUser/"+id, {headers: headers, responseType: 'text', params: {page: page, items: 4}});
  }

  deletePublication(id: any, token: any){
    var headers = new HttpHeaders().set('Authorization', token);

    return this.http.delete(this.url+"deletePublication/"+id, {headers: headers});
  }

}
