
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
import { ToastrService } from 'ngx-toastr';


//a pipe to implement secure embeding of any external link
@Pipe({ name: 'safe' })                                   
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(Body) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(Body);
  }
}


@Component({
  selector: 'app-content-viewcontent',
  templateUrl: `viewcontent.html`

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
viewlink:boolean=false;
checkLink:boolean=false;
IframeBody:SafeResourceUrl;
rating: number;
contentid: string;
commentsflag:boolean=false;


comment:any;
  constructor(private httpClient: HttpClient,private router: Router,private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { 
    this.Url=window.location.href  //getting the url of the current page
    this.ID = this.Url.substr(this.Url.lastIndexOf('/') + 1);  // abstracting the id of the content from the url
  }


ShowPopUp(){
  console.log("asdas");
  this.toastr.success("","Link copied to clipbaord");
}
  ngOnInit() { 
    if(localStorage.getItem("userProps")!=null){
      this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
    }
    this.GetContent(this.ID) ;
    this.ViewComments();
      }

      rate(rate:number){
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
          }, err=>{
            this.toastr.error("",err.error["msg"]);
            console.log(err);
          });

          window.location.reload();
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
      
      if(res['data'].type == "Image"){
        this.ViewImage(this.ID)
      }  
      if(res['data'].type == "Link"){
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
          this.checkLink=true;
                    
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
   this.httpClient.delete('http://localhost:3000/api/Content/deleteContent/'+ident+".."+JSON.parse(localStorage.getItem("userProps"))["_id"],config).
   subscribe(res=>{
    this.router.navigateByUrl('/content/viewallcontents');
   });

  
 }

createComment(ID:String, comment:string) //this method is called on clicking on button "Comment" once the user finished his comment, and the method calls post httprequest createComment method in the backend
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

  this.httpClient.post(environment.apiUrl +'Content/createComment/'+this.ID , data,config).subscribe(
    res=>{
    console.log(res["data"]);
    }
  );

  window.location.reload();
 }






 ViewComments() //this method calls a http get request calling getComments from the backend which retrieves all the comments related to that post from the database
 {
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

toggle() //this method is responsible for showing/hiding comments, the function toggles every time it is clicked
{
  this.commentsflag=!this.commentsflag  //a method to show and hide comments
 }



}
