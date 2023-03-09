import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';

import { Follow } from 'src/app/models/follow';
import { User } from 'src/app/models/user';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  public title: string;
  public status: string;
  public identity: any;
  public token: any;

  public page: any;
  public limit: any;
  public prevPage: any;
  public nextPage: any;
  public totalDocs: any;
  public following: Follow[];
  public follows: any;
  public pagesTotal: any;
  public user: any;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private followService: FollowService
  )
  {
    this.title = "Gente Siguiendo";
    this.identity = this.userService.getLocalIdentity();
    this.token = this.userService.getLocalToken();
    this.page = 1;
    this.limit = 4;
    this.status = "";
    this.following = [];
    this.follows = [];
    this.user = {
      name: "",
      surname: "",
      nick: "",
      email: "",
      password: "",
      role: ""
    }
    this.url = environment.GlobalServerDirection;
  }

  ngOnInit(): void {
    console.log("users.component ha cargado");
    this.updatePageAndLimit();
  }

  updatePageAndLimit(){

    this.route.queryParamMap.subscribe((queryData) =>{
      this.page = queryData.get('page') || 1;
      this.limit = queryData.get('limit') || 4;

      this.prevPage = +this.page-1; //Si le agregamos + a any le indicamos que es entero
      this.nextPage = +this.page+1;

      if(this.prevPage <= 0) this.prevPage = 1;
      if(this.nextPage > this.pagesTotal) this.nextPage = this.pagesTotal;

      this.route.paramMap.subscribe((paramData)=>{
        var userId = paramData.get('id');

        this.getFollows(userId, this.limit, this.page);
        this.getUser(userId);
      })

    });
  }

  getFollows(userId:any, limit:any, page: any){

    this.followService.getFollowing(userId, page, this.token).subscribe(res=>{

      var jsonData: any;
      jsonData = JSON.parse(res);

      try {
        
        if(!res){
          this.status = "error";
        }
        else
        {
          this.status = "success";
          this.totalDocs = jsonData.totalDocs--;
          this.following = jsonData.docs;
          this.pagesTotal = jsonData.totalPages;

          if(page > this.pagesTotal){
            this.router.navigate(['/siguiendo', userId], {queryParams: {limit: 4, page: 1}});
          }

          console.log(jsonData);
        }

      } catch (error) {
        console.log(error);
      }

    });
  }

  public idMouseOver: any;

  mouseEnter(userId: any){
    this.idMouseOver = userId;
  }

  mouseLeave(){
    this.idMouseOver = 0;
  }

  followUser(followedId: any){
    var follow = new Follow('', this.identity._id, followedId);

    this.followService.addFollow(follow, this.token).subscribe(res=>{

      try {
        
        if(!res){
          console.log("Error al agregar el follow");
          this.status = "error";
        }else{
          this.status = "success";
          this.follows.push(followedId);
        }

      } catch (error) {
        console.log(error);
      }

    });

  }

  unfollowUser(followedId: any){

    this.followService.deleteFollow(followedId, this.token).subscribe(res=>{

      try {
        
        if(res)
        {
          var search = this.follows.indexOf(followedId);
  
          if(search != -1){
            this.follows.splice(search, 1); //Eliminamos del arrray follows
          }
        }

      } catch (error) {
        console.log(error);
      }

    });

  }

  getUser(user_id: any){

    this.userService.getProfile(user_id).subscribe(res=>{

      var jsonRes = JSON.parse(res);

      if(res){
        this.user = jsonRes.user;
        console.log(this.user);
      }
      else{
        this.router.navigate(['/home']);
      }

    });

  }

}
