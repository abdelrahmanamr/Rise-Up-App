import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-content-viewsuggestedcontent',
  template: ` 
  <div class="container">
  <div class="card" style="padding:10px 15px; padding-bottom:70px; margin-bottom:20px;display: block; ">
  <span> <b> {{ PostTitle }} </b> </span>
  <br>
  <br>
  <span> <div [innerHTML]="Content"></div></span>
  <span><a href="{{ Body }}"> {{ Title }} </a></span> 
  <span><img src="{{ImagePath}}">  </span>  
  <br>
  <div style="float:left;"> <Button *ngIf="adminStatus" (click)="AddContent(ID)" class="btn btn-danger btn-sm"> Approve </Button></div>
  <div style="float:right;"> <Button *ngIf="adminStatus" (click)="DeleteContent(ID)" class="btn btn-danger btn-sm"> Delete </Button></div>
  </div>
  </div>
  
  `

})
export class ViewSuggestedContentComponent {
  
ID:string=localStorage.getItem("contentID");
Content : any;
Title:any
PostTitle :any
Body:any
ImagePath:string
adminStatus :boolean = false;
public contents:any[]=[];
user = null;



  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }


  ngOnInit() { 
    if(localStorage.getItem("userProps")!=null){
      this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
    }
    this.GetContent(this.ID) ;
      }


  GetContent(ID:string){
        var config ={
      headers : 
    {
  'Content-Type':'application/json'
    }
  }
    this.httpClient.get(environment.apiUrl +'/suggestedcontent/viewSuggestedContent/'+ID,config).subscribe(
      res=>{  
      if(res['data'].type== "Post"){
        this.ViewText(this.ID)
      }   
      
      if(res['data'].type== "Image"){
        this.ViewImage(this.ID)
      }  
      if(res['data'].type== "Link"){
        this.ViewLink(this.ID)
      }  
          
      }
    );
 }

     ViewText(ID:String){
      var config ={
        headers : 
      {
    'Content-Type':'application/json'
      }
    }
      this.httpClient.get(environment.apiUrl +'/suggestedcontent/viewSuggestedContent/'+ID,config).subscribe(
        res=>{  
          this.Content = res['data'].body;  
          this.PostTitle = res['data'].title;
            
        }
      );
     }
     
     ViewLink(ID:string){
      var config ={
        headers : 
      {
    'Content-Type':'application/json'
      }
    }
      this.httpClient.get(environment.apiUrl +'/suggestedcontent/viewSuggestedContent/'+ID,config).subscribe(
        res=>{  
          this.Title=res['data'].title
          this.Body = res['data'].body;  
          this.PostTitle = res['data'].title;

        }
      );
     }

     ViewImage(ID:string){
      var config ={
        headers : 
      {
    'Content-Type':'application/json'
      }
    }
      this.httpClient.get(environment.apiUrl +'/suggestedcontent/viewSuggestedContent/'+ID,config).subscribe(
        res=>{  
         this.ImagePath=(res['data'].body);  
         this.PostTitle = res['data'].title;
    
        }
      );
 }

 DeleteContent(ident:string)
 {
   var config = {
                 headers : 
                 {
                     'Content-Type':'application/json'
                 }
             }
   this.httpClient.delete('http://localhost:3000/api/suggestedcontent/deleteSuggestedContent/'+ident,config).
   subscribe(res=>{
    this.router.navigateByUrl('/content/suggestedcontent');
   });

  
 }
 AddContent(ident:string)
 {
   var config = {
                 headers : 
                 {
                     'Content-Type':'application/json'
                 }
             }
   this.httpClient.get(environment.apiUrl+'/suggestedcontent/viewSuggestedContent/'+ident,config).
    subscribe(res=>{
    this.contents = res['data'];
    this.user = JSON.parse(localStorage.getItem("userProps"));
    this.contents['userid'] = this.user['_id'];
    this.httpClient.post(environment.apiUrl+'content/addContent',this.contents,config).subscribe(res=>{
      this.DeleteContent(ident);
    });
   });

  
 }

    




}