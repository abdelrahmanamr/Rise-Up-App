import { Component, OnInit , ViewChild } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
import { SafeResourceUrl } from '@angular/platform-browser';
// import { App, NavController } from 'ionic-angular';


import {ViewEncapsulation, ElementRef, PipeTransform, Pipe } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(Body) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(Body);
  }
}


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
  <br />
<br />




<form class="container" #userForm="ngForm" (ngSubmit) = "createComment(ID,userForm.value)">
<input type = "text" class="form-control" name = "comment" placeholder = "Enter your Comment" ngModel>
<input class="btn btn-success" type = "submit" id="btnid" value = "Comment" style="background-color:#D00018"> 
</form>




<br />
<br />
<div><b> comments: </b> 
<br />
<span> <p> {{ array.toString() }} </p> </span>
</div>
  <br>
  <div   style="float:right; margin-top: -28px"> 
   <button class="btn btn-danger btn-sm" [class.btn-success]= "isCopied1" type="button" ngxClipboard [cbContent]=Url (cbOnSuccess)="isCopied1 = true">copy Link</button>
  <br>
  
  <Button style="margin-bottom: -34px;" *ngIf="adminStatus" (click)="DeleteContent(ID)" class="btn btn-danger btn-sm"> Delete </Button>
  
  </div>
  </div>

  <span  *ngIf="Link"> <iframe width="1100" height="600" [src]="Body | safe" ></iframe> </span>
 

  </div>
  
  `

})


export class ViewContentComponent {


 isCopied1: boolean = false;
ID:string
Content : any;
Title:any
PostTitle :any
array = [];
userID :any
Body:any
ImagePath:string
adminStatus :boolean = false;
Url:string;
Link:boolean=false;
IframeBody:SafeResourceUrl;
comment:any;
  constructor(private httpClient: HttpClient,private router: Router,private activatedRoute: ActivatedRoute) { 
    this.Url=window.location.href
    this.ID = this.Url.substr(this.Url.lastIndexOf('/') + 1);
    console.log(this.ID);
  }

  @ViewChild('mass_timings') mass_timings: ElementRef;


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
            this.array.push("comment1");
            this.array.push("comment2");

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

createComment(ID:String, comment:string)
 {

  this.userID = JSON.parse(localStorage.getItem("userProps"))["_id"];
  var data = {"body":comment ,
             "userid":this.userID};

console.log(comment)
  console.log(data);




//  const com = this.comment.get('comment').value();
   var config = {
                 headers : 
                 {
                     'Content-Type':'application/json'
                 }
             }

  this.httpClient.post(environment.apiUrl +'Content/createComment/'+ID , data/*hena*/ ,config).subscribe(
    res=>{
    this.comment=(res['data'].body);  
     // this.array.push( comment);
      //this.array.push( "kaka");
    }
  );

 }






}
