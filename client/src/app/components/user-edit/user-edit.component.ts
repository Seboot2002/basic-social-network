import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from "@angular/router";
import { Form, NgForm } from "@angular/forms";

import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public title: string;
  public user: User;
  public identity: any;
  public token: any;
  public status: string;
  public fileImg: any;
  public url: string;

  constructor(
    private userService: UserService,
    private router: Router
  )
  {
    this.title = "Actualizar mis datos"
    this.user = userService.getLocalIdentity();
    this.identity = this.user;
    this.token = userService.getLocalToken();
    this.status = "";
    this.url = environment.GlobalServerDirection;
  }

  ngOnInit(): void {

    //console.log(this.identity);
    console.log("user-edit se ha cargado");

  }

  selectedImage(event: any){

    if(event.target.files && event.target.files[0]){

      this.fileImg = <File>event.target.files[0];
    }

  }

  onSubmit(form: NgForm){

    this.userService.updateUser(this.user, this.fileImg).subscribe(res=>{
      
      if(!res){
        this.status = "error";
      }
      else
      {
        console.log(res);
        this.status = "success";
        localStorage.setItem('identity', JSON.stringify(this.user));
        this.identity = this.user;
      }

    });
  }

}