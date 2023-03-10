import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

import { UserGuard } from './user.guard';
import { MsgMainComponent } from './messages/msg-main/msg-main.component';

const routes: Routes = [
  {path: "", redirectTo: 'home', pathMatch: 'full'},
  {path: "home", component: HomeComponent, canActivate: [UserGuard]},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "mis-datos", component: UserEditComponent, canActivate: [UserGuard]},
  {path: "gente", component: UsersComponent, canActivate: [UserGuard]},
  {path: "timeline", component: TimelineComponent, canActivate: [UserGuard]},
  {path: "perfil/:id", component: ProfileComponent, canActivate: [UserGuard]},
  {path: "siguiendo/:id", component: FollowingComponent, canActivate: [UserGuard]},
  {path: "seguidores/:id", component: FollowedComponent, canActivate: [UserGuard]},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
