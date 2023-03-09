import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MsgMainComponent } from './msg-main/msg-main.component';
import { MsgAddComponent } from './msg-add/msg-add.component';
import { MsgReceivedComponent } from './msg-received/msg-received.component';
import { MsgSendedComponent } from './msg-sended/msg-sended.component';

import { UserGuard } from '../user.guard';

const messagesRoutes: Routes = [
  {path: "mensajes", component: MsgMainComponent, children: [
    {path: "", redirectTo: "recibidos", pathMatch: 'full'},
    {path: "enviar", component: MsgAddComponent, canActivate: [UserGuard]},
    {path: "recibidos", component: MsgReceivedComponent, canActivate: [UserGuard]},
    {path: "enviados", component: MsgSendedComponent, canActivate: [UserGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(messagesRoutes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
