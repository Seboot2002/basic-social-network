import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FollowService } from 'src/app/services/follow.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

import { Message } from 'src/app/models/message';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-msg-add',
  templateUrl: './msg-add.component.html',
  styleUrls: ['./msg-add.component.css']
})
export class MsgAddComponent implements OnInit {

  public title: string;
  public message: Message;
  public identity: any;
  public token: any;
  public url: any;
  public status: any;
  public follows: any;

  constructor
  (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService,
    private _followService: FollowService
  )
  {
    this.title = "Enviar Mensaje";
    this.identity = _userService.getLocalIdentity();
    this.token = _userService.getLocalToken();
    this.url = environment.GlobalServerDirection;
    this.message = new Message("", "", "", "", this.identity._id, "");
  }

  ngOnInit(): void {
    this.getMyFollows();
  }

  onSubmit(form: any){
    this._messageService.addMessage(this.token, this.message).subscribe(res=>{
      try {
        
        if(res){
          this.status = "success";
          form.reset();
        }

      } catch (error) {
        console.log(error);
      }
    });
  }

  getMyFollows(){
    this._followService.getMyFollows(this.token).subscribe(res=>{

      var jsonRes = JSON.parse(res);

      try {
        
        this.follows = jsonRes;

      } catch (error) {
        console.log(error);
      }
      
    });
  }

}
