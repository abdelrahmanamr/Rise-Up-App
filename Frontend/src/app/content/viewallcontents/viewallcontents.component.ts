import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-items',
  template: `<div class="container">
  <table class="table table-responsive">
  <thead>
   <tr>
     <th>Contents Table</th>
   </tr>
 </thead>
 <tbody>

 <tr>
 <td>Title</td>
 <td>Rating</td>
 
 </tr>

   <tr *ngFor="let content of contents">
     <td>{{content.title}}</td>
     <td>{{content.rating}}</td>
    
   <td><Button (click)="ViewContent(content._id)"> ShowContent </Button></td>  
   </tr>          

 </tbody>
  </table>
  </div>

  <br>

  

  `
})
export class ViewAllContentsComponent {
  public contents:any[]=[];
  
  constructor(private httpClient: HttpClient,private router: Router) { }

ngOnInit() {
  this.ViewContents();
  }

  ViewContents(){
    this.httpClient.get(environment.apiUrl +'Content/viewContents').subscribe(
      res=>{  
        this.contents = res['data'];       
      }
    );
  }
 

  ViewContent(ID: string){

    localStorage.setItem("contentID",ID);
    this.router.navigate(['/content/viewcontent']);


  }


}
