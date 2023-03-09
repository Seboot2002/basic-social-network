import { Component, OnInit, DoCheck } from '@angular/core';
import { Route, Router, ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment';

import { UserService } from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity: any;
  public url: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  )
  {
    this.title = "Red social";
    this.url = environment.GlobalServerDirection;
  }

  ngOnInit(): void{
    console.log(this.identity);
  }

  ngDoCheck(): void{
    this.identity = this.userService.getLocalIdentity() || null;
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this.router.navigate(['/login']);
  }

}
