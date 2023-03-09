import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FollowService } from 'src/app/services/follow.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

import { Message } from 'src/app/models/message';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-msg-received',
  templateUrl: './msg-received.component.html',
  styleUrls: ['./msg-received.component.css']
})
export class MsgReceivedComponent implements OnInit {

  public title: string;
  public messages: Message[];
  public identity: any;
  public token: any;
  public url: any;
  public status: any;
  public follows: any;
  public page: any;
  public limit: any;
  public prevPage: any;
  public nextPage: any;
  public pagesTotal: any;

  constructor
  (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService,
    private _followService: FollowService
  )
  {
    this.title = "Mensajes Recibidos";
    this.identity = _userService.getLocalIdentity();
    this.token = _userService.getLocalToken();
    this.url = environment.GlobalServerDirection;
    this.messages = [];
    this.page = 1;
    
  }

  ngOnInit(): void {
    this.updatePageAndLimit();
  }

  getMessages(token: any, page: any, limit: any){
    this._messageService.getReceivedMessages(token, page, limit).subscribe((res: any)=>{

      console.log(res);

      try {
        
        if(res){
          this.status = "success";
          this.messages = res.docs;
          this.pagesTotal = res.totalPages;
        }

      } catch (error) {
        console.log(error);
      }

    });
  }

  updatePageAndLimit(){

    this._route.queryParamMap.subscribe((queryData) =>{
      this.page = queryData.get('page') || 1;
      this.limit = queryData.get('limit') || 4;

      this.prevPage = +this.page-1; //Si le agregamos + a any le indicamos que es entero
      this.nextPage = +this.page+1;

      if(this.prevPage <= 0) this.prevPage = 1;
      if(this.nextPage > this.pagesTotal) this.nextPage = this.pagesTotal;

      this.getMessages(this.token, this.page, this.limit);
    });
  }

}
