import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Publication } from 'src/app/models/publication';
import { UserService } from 'src/app/services/user.service';
import { PublicationService } from 'src/app/services/publication.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  public identity: any;
  public token: any;
  public title: string;
  public url: string;
  public status: string;
  public page: any;
  public totalDocs: any
  public publications: Publication[];
  public noMore: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private publicationService: PublicationService,
    private titulo: Title
  )
  {
    this.identity = userService.getLocalIdentity();
    this.token = userService.getLocalToken();
    this.title = "TimeLine";
    this.url = environment.GlobalServerDirection;
    this.status = "";
    this.publications = [];
    this.noMore = false;
    this.idShowImage = 0;
    titulo.setTitle("TimeLine");
  }

  ngOnInit(): void {
    this.getPublications(false);
  }

  getPublications(adding: boolean){

    this.publicationService.getPublications(this.token, this.page).subscribe(res=>{

      var jsonRes = JSON.parse(res);

      try {
        
        if(!res){
          this.status = "error";
        }
        else
        {
          this.status = "success";
          this.totalDocs = jsonRes.publications.totalDocs;
          this.route.queryParamMap.subscribe(queryData=>{
            this.page = queryData.get('page') || 1;
          });
          
          if(!adding){
            this.publications = jsonRes.publications.docs;
          }
          else
          {
            var ArrayActual = this.publications;//Array actual con data de 2 pags (ejemplo)
            var ArrayRes = jsonRes.publications.docs;//Array con data de pagina final 3 (ejemplo)
            this.publications = ArrayActual.concat(ArrayRes);//concat permite concatenar arrays
          }

          if(this.page > jsonRes.publications.totalPages){
            this.router.navigate(['/timeline'], {queryParams: {page: 1, limit: 4}});
          }

          if(this.publications.length == this.totalDocs){
            this.noMore = true;
          }
          
          console.log(jsonRes);
        }

      } catch (error) {
        console.log(error);
      }

    });
  }

  viewMore(){

    this.page++;

    if(this.publications.length == this.totalDocs){
      this.noMore = true;
    }

    this.getPublications(true);

  }

  refreshPublications(event: any){
    this.getPublications(false);
  }

  public idShowImage: any;
  showImage(id: any){
    this.idShowImage = id;
  }

  hideImage(){
    this.idShowImage = 0;
  }
  
  deletePublication(id: any){

    this.publicationService.deletePublication(id, this.token).subscribe(res=>{
      if(res){
        this.refreshPublications(null);
      }
    });

  }
}
