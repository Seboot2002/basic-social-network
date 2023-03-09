import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesRoutingModule } from './messages-routing.module';

import { MsgMainComponent } from './msg-main/msg-main.component';
import { MsgAddComponent } from './msg-add/msg-add.component';
import { MsgReceivedComponent } from './msg-received/msg-received.component';
import { MsgSendedComponent } from './msg-sended/msg-sended.component';

@NgModule({
  declarations: [
    MsgMainComponent,
    MsgAddComponent,
    MsgReceivedComponent,
    MsgSendedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
