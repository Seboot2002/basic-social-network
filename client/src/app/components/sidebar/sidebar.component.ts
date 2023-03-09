import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { PublicationService } from 'src/app/services/publication.service';

import { Publication } from 'src/app/models/publication';
import { Form, NgForm } from '@angular/forms';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public identity: any;
  public token: any;
  public stats: any;
  public url: any;
  public status: string;
  public publication: Publication;
  public fileImg: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private publicationService: PublicationService
  )
  {
    this.status = "";
    this.identity = userService.getLocalIdentity();
    this.token = userService.getLocalToken();
    this.stats = userService.getLocalStats();
    this.url = environment.GlobalServerDirection;
    this.publication = new Publication("","","","", this.identity._id);
  }

  ngOnInit(): void {
    
  }

  selectedImage(event: any){

    if(event.target.files && event.target.files[0]){

      this.fileImg = <File>event.target.files[0];
    }

  }

  onSubmit(publiForm: NgForm){
    this.publicationService.addPublication(this.publication, this.fileImg, this.token).subscribe(res=>{

      try {

        if(!res){
          this.status = "error";
        }
        else
        {
          this.stats = "success";
          publiForm.reset();
          this.router.navigate(['/timeline']);
        }

      } catch (error) {
        console.log(error);
      }

    });
  }

  @Output() PubliEvent = new EventEmitter();
  sendPublication(event: any){
    this.PubliEvent.emit({Updated: "true"});
  }

}
