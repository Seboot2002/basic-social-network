import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from "../../models/user";

import { UserService } from "../../services/user.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  
  public title: string;
  public user: User;
  public status: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { 
    this.title = "Registrate";
    this.status = "";
    this.user = {
      name: "",
      surname: "",
      nick: "",
      email: "",
      password: "",
      role: ""
    }
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){

    this.userService.register(form.value).subscribe(res =>{
      
      try {

          var jsonRes = JSON.parse(res) || JSON.stringify(res);
 
          if(jsonRes._id){

            this.status = "success";
            form.reset();
            console.log(res);
          
          }else if(!jsonRes._id){
            this.status = "error";
          }

        } catch (error) {
          console.log(error);
        }

  
      });

  }

}
