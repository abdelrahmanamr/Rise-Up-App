import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-items',
  template: `<div class="container">
  <div *ngFor="let content of contents">
    <div class="card" style="padding:10px 15px; padding-bottom:70px; margin-bottom:20px;display: block; ">
    <div style="float:left;">
    <h4>{{content.title}}</h4>
    Tags: {{content.tags}}</div>
    <div style="float:right;"><Button *ngIf="adminStatus" style="background:orange;border-raduis:100px" (click)="EditContent(content._id)" class="btn btn-sm"><i class="fa fa-edit" style="font-size:19px"></i></Button>  <Button (click)="ViewContent(content._id)" class="btn btn-danger btn-sm"><i class="fa fa-eye" style="font-size:20px;color:white"></i></Button><br />
    Views: {{content.views}}</div>

    </div>
  </div>
  </div>

  <br>

  

  `
})
export class ViewAllContentsComponent {
  public contents:any[]=[];
  adminStatus:boolean = false;
  
  constructor(private http: HttpClient,private httpClient: HttpClient,private router: Router) { }

ngOnInit() {

  
    if(localStorage.getItem("UserDoc")!=null){
       this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
    }

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

  EditContent(ID: string){ 
    localStorage.setItem("contentID",ID);
    this.router.navigate(['/content/editcontent']);
  }


}
