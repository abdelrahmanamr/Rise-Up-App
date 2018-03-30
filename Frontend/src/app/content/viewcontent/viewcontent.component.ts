import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-content-viewcontent',
  template: ` 
  <div class="container">
  <span> <div [innerHTML]="Content"></div></span>
  <span><a href="{{ Body }}">{{ Title }}</a></span> 
  <span><img src="{{ImagePath}}">  </span>  
  </div>
  `
})
export class ViewContentComponent {
  
ID:string=localStorage.getItem("contentID");
Content : any;
Title:any
Body:any
ImagePath:string

  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }


  ngOnInit() { 
    this.GetContent(this.ID) ;
      }


  GetContent(ID:string){
        var config ={
      headers : 
    {
  'Content-Type':'application/json'
    }
  }
    this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
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
      this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
        res=>{  
          this.Content = res['data'].body;  
            
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
      this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
        res=>{  
          this.Title=res['data'].title
          this.Body = res['data'].body;  
            
        }
      );
     }

     ViewImage(ID:string){}

    




}
