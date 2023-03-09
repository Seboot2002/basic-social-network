import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Title } from '@angular/platform-browser';

import { User } from "../../models/user"
import { Follow } from 'src/app/models/follow';

import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public title: string;
  public status: string;
  public identity: any;
  public token: any;

  public page: any;
  public limit: any;
  public prevPage: any;
  public nextPage: any;
  public totalDocs: any;
  public users: User[];
  public follows: any;
  public pagesTotal: any;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private followService: FollowService,
    private titulo: Title
  )
  {
    this.title = "Gente";
    this.identity = this.userService.getLocalIdentity();
    this.token = this.userService.getLocalToken();
    this.page = 1;
    this.limit = 4;
    this.status = "";
    this.users = [];
    this.follows = [];
    titulo.setTitle("Gente");
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

      this.getUsers(this.limit, this.page);

    });
  }

  getUsers(limit:any, page: any){

    this.userService.getUsers(limit, page).subscribe(res=>{

      var jsonData: any;
      jsonData = JSON.parse(res);

      this.follows = jsonData.following;
      console.log(this.follows);

      try {
        
        if(!res){
          this.status = "error";
        }
        else
        {
          this.status = "success";
          this.totalDocs = jsonData.users.totalDocs--;
          this.users = jsonData.users.docs;
          this.pagesTotal = jsonData.users.totalPages;

          if(page > this.pagesTotal){
            this.router.navigate(['/gente'], {queryParams: {limit: 4, page: 1}});
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

}
