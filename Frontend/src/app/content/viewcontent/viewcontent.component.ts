import { Component, OnInit , ViewChild } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
import { SafeResourceUrl } from '@angular/platform-browser';
// import { App, NavController } from 'ionic-angular';


import {ViewEncapsulation, ElementRef, PipeTransform, Pipe } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

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
  <td><button type="button" *ngIf="link" class="btn btn-primary" (click)="this.Link=true" >show link</button></td>
  <span><img src="{{ImagePath}}">  </span>  
  <br />
<br />




<form class="container" #userForm="ngForm" (ngSubmit) = "createComment(ID,userForm.value)">
<input type = "text" class="form-control" name = "comment" placeholder = "Enter your Comment" ngModel>
<input class="btn btn-success" type = "submit" id="btnid" value = "Comment" style="background-color:#D00018"> 
</form>







<div class="container">


  <br>

  <style>
  .checked {
      color: yellow;
      
  }
  span:hover { 
    color: yellow;
  }
  </style>

  <h2>Rating</h2>
  <a (click)="rate(1)"><span class="fa fa-star" [class.checked]="rating >= 1"></span></a>
  <a (click)="rate(2)"><span class="fa fa-star" [class.checked]="rating >= 2"></span></a>
  <a (click)="rate(3)"><span class="fa fa-star" [class.checked]="rating >= 3"></span></a>
  <a (click)="rate(4)"><span class="fa fa-star" [class.checked]="rating >= 4"></span></a>
  <a (click)="rate(5)"><span class="fa fa-star" [class.checked]="rating >= 5"></span></a>

  <div   style="float:right; margin-top: -28px"> 
   <button class="btn btn-danger btn-sm" [class.btn-success]= "isCopied1" type="button" ngxClipboard [cbContent]=Url (cbOnSuccess)="isCopied1 = true">copy Link</button>
  <br>
  
  <Button style="margin-bottom: -34px;" *ngIf="adminStatus" (click)="DeleteContent(ID)" class="btn btn-danger btn-sm"> Delete </Button>
  
  </div>
  </div>

  <span  *ngIf="Link"> <iframe width="1450" height="600" [src]="Body | safe" ></iframe> </span>
 

  </div>

  <br />
<br />
<div><h3> comments: </h3> 
<br />
</div>

  <div *ngFor="let comment of comments">
  <div class="card"> <h4>{{comment.username}} :</h4></div>
  <div class="card" style="padding:10px 15px; padding-bottom:70px; margin-bottom:20px;display: block; ">
  <div style="float:left;">
  <h4>{{comment.body}}</h4>


  </div>
</div>
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
public comments:any[]=[];
adminStatus :boolean = false;
Url:string;
Link:boolean=false;
link:boolean=false;
IframeBody:SafeResourceUrl;
rating: number;
contentid: string;

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
    this.ViewComments();
      }

      rate(rate:number){
        // let body = {
        //   userid: JSON.parse(localStorage.getItem("userProps"))["_id"],
        //   _id: this.ID,
        //   rating: rate
        // }
        var config ={
          headers : 
        {
      'Content-Type':'application/json'
        }
      }
  
        var data = JSON.stringify({rating: rate,userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});

        this.httpClient.patch(environment.apiUrl +'/Content/updateContent/'+this.ID,data,config).subscribe(
          res=>{  
            console.log(res);
           // this.rating = res['data'].rating;
                  
          }, err=>{
            console.log(err);
          });
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
        if(res['data']){
          this.contentid = res['data']._id;
          this.rating = res['data'].rating;
        }
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
          this.link=true;
                    
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
  var data = {"body":comment["comment"] ,
             "userid":this.userID,
              "contentid":this.ID,
            "username":JSON.parse(localStorage.getItem("userProps"))["username"]};

   var config = {
                 headers : 
                 {
                     'Content-Type':'application/json'
                 }
             }

  this.httpClient.post(environment.apiUrl +'Content/createComment/'+this.ID , data/*hena*/ ,config).subscribe(
    res=>{
    // this.comment=(res['data'].body);  
    console.log(res["data"]);
     // this.array.push( comment["comment"] );
    }
  );

  window.location.reload();
 }






 ViewComments(){
  var config = {
    headers : 
    {
        'Content-Type':'application/json'
    }
}
  this.httpClient.get(environment.apiUrl +'Content/getComments/'+this.ID,config).subscribe(
    res=>{  
    this.comments=(res['data']);  
    console.log(res['data']);
    }
  );

}





}
