import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
<<<<<<< HEAD
=======
import { SafeResourceUrl } from '@angular/platform-browser';
// import { App, NavController } from 'ionic-angular';


import {ViewEncapsulation, ElementRef, PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(Body) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(Body);
  }
}

>>>>>>> 5b80010f6123fcbe1fa4825bb4a75d5784faa077

@Component({
  selector: 'app-content-viewcontent',
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
  <div style="float:right;"> <Button *ngIf="adminStatus" (click)="DeleteContent(ID)" class="btn btn-danger btn-sm"> Delete </Button></div>
  </div>
  </div>
<<<<<<< HEAD
=======

  <span  *ngIf="Link"> <iframe width="1100" height="315" [src]="Body | safe" ></iframe> </span>
 

  </div>
>>>>>>> 5b80010f6123fcbe1fa4825bb4a75d5784faa077
  
  `

})


export class ViewContentComponent {
<<<<<<< HEAD
  
ID:string=localStorage.getItem("contentID");
=======


 isCopied1: boolean = false;
ID:string
>>>>>>> 5b80010f6123fcbe1fa4825bb4a75d5784faa077
Content : any;
Title:any
PostTitle :any
Body:any
ImagePath:string
adminStatus :boolean = false;
<<<<<<< HEAD

  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }

  
   
=======
Url:string;
Link:boolean=false;
IframeBody:SafeResourceUrl;

  constructor(private httpClient: HttpClient,private router: Router,private activatedRoute: ActivatedRoute,private domSanitizer: DomSanitizer) { 
    this.Url=window.location.href
    this.ID = this.Url.substr(this.Url.lastIndexOf('/') + 1);
    console.log(this.ID);
  }

  @ViewChild('mass_timings') mass_timings: ElementRef;


>>>>>>> 5b80010f6123fcbe1fa4825bb4a75d5784faa077
  ngOnInit() { 
 
    if(localStorage.getItem("userProps")!=null){
      this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
    }
    this.GetContent(this.ID) ;
<<<<<<< HEAD
   
=======
    
>>>>>>> 5b80010f6123fcbe1fa4825bb4a75d5784faa077
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
      this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
        res=>{  

          this.Title=res['data'].title
          this.PostTitle = res['data'].title;

          this.Body = res['data'].body;
          console.log(this.Body);
          this.Link=true;
                    
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
      this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
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
   this.httpClient.delete('http://localhost:3000/api/Content/deleteContent/'+ident,config).
   subscribe(res=>{
    this.router.navigateByUrl('/content/viewallcontents');
   });

  
 }

    




}
