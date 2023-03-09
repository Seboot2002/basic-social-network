import { JsonPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public identity: any; //Activa las opciones de usuario
  public token: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  )
  { 
    this.title = "Identificate";
    this.status = "";
    this.user = {
      name: "",
      surname: "",
      nick: "",
      email: "",
      password: "",
      role: ""
    }
    this.identity;
    this.token;
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){

    this.userService.login(form.value, null).subscribe( res =>{

      try {

        this.identity = JSON.parse(res);

        if (this.identity || this.identity._id) {
          
          this.status = "success";

          this.getToken(form);
          localStorage.setItem("identity", res);
          this.router.navigate(['/']);
          
          console.log(this.identity);

        }else{

          this.status = "error";

        }

      } catch (error) {
        this.status = "error";
        console.log(error);
      }

    });

  }

  getToken(form: NgForm){

    this.userService.login(form.value, "true").subscribe( res =>{

      try {

        this.token = JSON.parse(res).token;

        localStorage.setItem("token", res);

        console.log(this.token);

        this.setLocalCounters(null);

      } catch (error) {
        this.status = "error";
        console.log(error);
      }

    });

  }

  setLocalCounters(userId: any | null){

    this.userService.getCounters(userId).subscribe(res => {

      try {
        localStorage.setItem("stats", JSON.stringify(res));
        
        this.status = "success";

      } catch (error) {
        console.log(error);
      }

    });

  }

}
