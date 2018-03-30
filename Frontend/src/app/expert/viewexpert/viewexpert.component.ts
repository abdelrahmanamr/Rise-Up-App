import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
<<<<<<< HEAD
@Component({
  selector: 'app-expert-viewexpert',
  template: `
  <div class="container">
  <span> <div [innerHTML]="Expert"></div></span>
  </div>`
})
export class ViewExpertComponent {
  ID:string=localStorage.getItem("expertID");
Expert:any
  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }

  ngOnInit() { 
    this.ViewExpert(this.ID) ;
      }

ViewExpert(ID:String){
  var config ={
    headers : 
  {
'Content-Type':'application/json'
  }
}
  this.httpClient.get(environment.apiUrl +'/User/viewUser/'+ID,config).subscribe(
    res=>{  
      this.Expert = res['data'].firstname;  
        
    }
  );
 }

=======

@Component({
  selector: 'app-expert-viewexpert',
  template: ` 
  <div class="container">
  <span> <p> {{ Expert }} </p> </span>
  <span><a href="{{ Title }}">{{ Title1 }}</a></span> 
  <span><img src="{{ImagePath}}">  </span>  
  </div>
  `
})
export class ViewExpertComponent {
  
ID:string=localStorage.getItem("expertID");
Expert : any;
Title:any
Title1:any
ImagePath:string

  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }


  ngOnInit() { 
    this.GetExpert(this.ID) ;
      }


  GetExpert(ID:string){
        var config ={
      headers : 
    {
  'Expert-Type':'application/json'
    }
  }
    this.httpClient.get(environment.apiUrl +'/Expert/viewExpert/'+ID,config).subscribe(
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
    'Expertt-Type':'application/json'
      }
    }
      this.httpClient.get(environment.apiUrl +'/Expert/viewExpert/'+ID,config).subscribe(
        res=>{  
          this.Expert = res['data'].body;  
            
        }
      );
     }

     

     ViewLink(ID:string){
      var config ={
        headers : 
      {
    'Expert-Type':'application/json'
      }
    }
      this.httpClient.get(environment.apiUrl +'/Expert/viewExpert/'+ID,config).subscribe(
        res=>{  
          this.Title1=res['data'].title
          this.Title = res['data'].body;  
            
        }
      );
     }

     ViewImage(ID:string){
      var config ={
        headers : 
      {
    'Expert-Type':'application/json'
      }
    }
      this.httpClient.get(environment.apiUrl +'/Expert/viewExpert/'+ID,config).subscribe(
        res=>{  
         this.ImagePath=(res['data'].body);      
        }
      );
     }

    




>>>>>>> ReadingContent
}
