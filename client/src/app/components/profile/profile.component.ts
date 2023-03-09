import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { Follow } from 'src/app/models/follow';
import { Publication } from 'src/app/models/publication';

import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { PublicationService } from 'src/app/services/publication.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public identity: any;
  public stats: any;
  public token: any;
  public follow: any;
  public url: string;
  
  public followed: boolean;
  public following: boolean;

  public page: any;
  public totalDocs: any
  public publications: Publication[];
  public noMore: boolean;

  constructor
  (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService,
    private _publicationService: PublicationService
  ) 
  {
    this.title = "Mi perfil";
    this.status = "";
    this.identity = _userService.getLocalIdentity();
    this.token = _userService.getLocalToken();
    this.url = environment.GlobalServerDirection;
    this.user = {
      name: "",
      surname: "",
      nick: "",
      email: "",
      password: "",
      role: ""
    }
    this.followed = false;
    this.following = false;
    this.publications = [];
    this.noMore = false;
    this.page = 1;
  }

  ngOnInit(): void {

    this._route.paramMap.subscribe(params=>{
      var id = params.get('id');

      this.getUser(id);
      this.getCounters();
      this.getPublicationsUser(id, false);
    });


  }

  getUser(id: any){

    this._userService.getProfile(id).subscribe(res=>{

      var jsonRes = JSON.parse(res);
      console.log(jsonRes);

      if(!res){
        this.status = "error";
      }
      else
      {
        this.status = "success";
        this.user = jsonRes.user;

        if(jsonRes.following){
          this.following = true;
        }else{
          this.following = false;
        }

        if(jsonRes.followed){
          this.followed = true;
        }else{
          this.followed = false;
        }

        console.log(this.user);
      }

    });
  }

  getCounters(){
    this._userService.getCounters(null).subscribe(res=>{

      if(!res){
        this.status = "error";
      }
      else
      {
        this.status = "success";
        this.stats = res;
        console.log(this.stats);
      }
    });
  }

  followUser(userId: any){
    var follow = new Follow("", this.identity._id, userId);

    this._followService.addFollow(follow, this.token).subscribe(res=>{

      if(res){
        this.following = true;
      }else{
        this.status = "error";
      }
    });
  }

  unFollowUser(userId: any){

    this._followService.deleteFollow(userId, this.token).subscribe(res=>{

      if(res){
        this.following = false;
      }else{
        this.status = "error";
      }
    });
  }

  public idUserOver: any;
  mouseEnter(userId: any){
    this.idUserOver = userId;
  }

  mouseLeave(){
    this.idUserOver = 0;
  }

  //Publications
  getPublicationsUser(id: any, adding: boolean){

    this._publicationService.getPublicationsUser(id, this.token, this.page).subscribe(res=>{

      var jsonRes = JSON.parse(res);

      try {
        
        if(!res){
          this.status = "error";
        }
        else
        {
          this.status = "success";
          this.totalDocs = jsonRes.publications.totalDocs;
          this._route.queryParamMap.subscribe(queryData=>{
            this.page = queryData.get('page') || 1;
          });
          
          if(!adding){
            this.publications = jsonRes.publications.docs;
          }
          else
          {
            var ArrayActual = this.publications;//Array actual con data de 2 pags (ejemplo)
            var ArrayRes = jsonRes.publications.docs;//Array con data de pagina final 3 (ejemplo)
            this.publications = ArrayActual.concat(ArrayRes);//concat permite concatenar arrays
          }

          if(this.page > jsonRes.publications.totalPages){
            this._router.navigate(['/timeline'], {queryParams: {page: 1, limit: 4}});
          }

          if(this.publications.length == this.totalDocs){
            this.noMore = true;
          }
          
          console.log(jsonRes);
        }

      } catch (error) {
        console.log(error);
      }

    });
  }

  viewMore(){

    this.page++;

    if(this.publications.length == this.totalDocs){
      this.noMore = true;
    }

    this.getPublicationsUser(this.user._id ,true);

  }

}