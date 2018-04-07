import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-content-suggestedcontent',
  template: `<div class="container">
  <div *ngFor="let content of contents">
    <div class="card" style="padding:10px 15px; padding-bottom:70px; margin-bottom:20px;display: block; ">
    <div style="float:left;">
    <h4>{{content.title}}</h4>
    Tags: {{content.tags}}</div>
    <div style="float:right;"><Button (click)="ViewContent(content._id)" class="btn btn-danger btn-sm"> Read </Button><br />
    Views: {{content.views}}</div>

    </div>
  </div>
  </div>

  <br>

  

  `
})
export class SuggestedContentComponent {
  public contents:any[]=[];
  
  constructor(private httpClient: HttpClient,private router: Router) { }

ngOnInit() {
  this.ViewContents();
  }
  ViewContents(){
    
    this.httpClient.get(environment.apiUrl +'suggestedcontent/viewSuggestedContents').subscribe(
      res=>{ 
        for(var i = 0 ; i <res['data'].length;i++){
          if(res['data'][i].status == 0){
            this.contents.push(res['data'][i]);
          }
        }
        
      }
    );
  }
  ViewContent(ID: string){

    localStorage.setItem("contentID",ID);
    this.router.navigate(['/content/viewsuggestedcontent']);


  }
}
