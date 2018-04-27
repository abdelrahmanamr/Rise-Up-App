
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
  templateUrl: `viewcontent.html`,
  styleUrls:['./style.css']

})


export class ViewContentComponent {


 isCopied1: boolean = false;
ID:string
data:any;
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
Contenttype:boolean=false;
owner:string;

comment:any;
  constructor(private httpClient: HttpClient,private router: Router,private activatedRoute: ActivatedRoute,
    private toastr: ToastrService, private sanitizer: DomSanitizer) { 
    this.Url=window.location.href  //getting the url of the current page
    this.ID = this.Url.substr(this.Url.lastIndexOf('/') + 1);  // abstracting the id of the content from the url
  }


ShowPopUp(){
  this.toastr.success("","Link copied to clipbaord");
}
  ngOnInit() { 
    if(localStorage.getItem("userProps")!=null){
      this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
      this.userID =JSON.parse(localStorage.getItem('userProps'))['_id'];

    }
    this.GetContent(this.ID) ;
    this.ViewComments();
      }

      rate(rate:number){
        var config = {
          headers : {
              'Content-Type': 'application/json',
             'authorization':localStorage.getItem('UserDoc')
          }
      }
  
        var data = JSON.stringify({rating: rate,userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});

        this.httpClient.patch(environment.apiUrl +'/Content/updateContent/'+this.ID,data,config).subscribe(
          res=>{  
            console.log(res);  
            window.location.reload();
         
          },err=>{
            this.toastr.error("",err['error']["msg"]);
            if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
              localStorage.clear();
              this.router.navigateByUrl("/search/searchresults")
            }     
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
this.Contenttype
        if(res['data']){
          this.contentid = res['data']._id;
          this.rating = res['data'].rating;
          this.owner = res['data'].userid;
        }
      if(res['data'].type== "Post"){
        this.ViewText(this.ID)
        this.Contenttype=true;

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

  viewAdder()
  {
    var config = {
      headers:
      {

        "Content-Type":'application/json',
        "id":JSON.parse(localStorage.getItem("userProps"))["_id"]

      }
    }
    this.httpClient.get(environment.apiUrl+'/admin/getUserById/'+this.owner,config).subscribe(
      res=>{
        this.router.navigate(["/user/profile/"+res['data'].username]);
      }
    )
    
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
          this.Content = this.sanitizer.bypassSecurityTrustHtml(res['data'].body); 
          this.data = res['data'];
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

          this.Title= res['data'].title;
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
         this.ImagePath =(res['data'].body);  
         this.PostTitle = res['data'].title;
    
        }
      );
 }

 DeleteContent(ident:string)
 {
  var config = {
    headers : {
        'Content-Type': 'application/json',
       'authorization':localStorage.getItem('UserDoc')
    }
}
this.httpClient.delete(environment.apiUrl+'Content/deleteContent/'+ident+".."+JSON.parse(localStorage.getItem("userProps"))["_id"],config).

   subscribe(res=>{
    this.router.navigateByUrl('/content/viewallcontents');
   },err=>{
    this.toastr.error("",err['error']["msg"]);
    if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
      localStorage.clear();
      this.router.navigateByUrl("/search/searchresults")
    }     
  }
  );

  
 }

createComment(ID:String, comment:string) //this method is called on clicking on button "Comment" once the user finished his comment, and the method calls post httprequest createComment method in the backend
 {

  this.userID = JSON.parse(localStorage.getItem("userProps"))["_id"];
  var data = {"body":comment["comment"] ,
             "userid":this.userID,
              "contentid":this.ID,
            "username":JSON.parse(localStorage.getItem("userProps"))["username"]};

            var config = {
              headers : {
                  'Content-Type': 'application/json',
                 'authorization':localStorage.getItem('UserDoc')
              }
          }

  this.httpClient.post(environment.apiUrl +'Content/createComment/'+this.ID , data,config).subscribe(
    res=>{
    console.log(res["data"]);
        window.location.reload();
    },err=>{
      this.toastr.error("",err.error["msg"]);
      if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
        localStorage.clear();
        this.router.navigateByUrl("/search/searchresults")
      }
    }
  );


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
deleteComment(id: string){
  var config = {
    headers : {
        'Content-Type': 'application/json',
       'authorization':localStorage.getItem('UserDoc')
    }
}
  this.httpClient.delete(environment.apiUrl +'Content/deleteComment/'+id+".."+JSON.parse(localStorage.getItem("userProps"))["_id"],config).
   subscribe(res=>{

    window.location.reload();
   },err=>{
    this.toastr.error("",err['error']["msg"]);
    if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
      localStorage.clear();
      this.router.navigateByUrl("/search/searchresults")
    }     
  });
}
reportComment(id: string){
  var config = {
    headers : {
        'Content-Type': 'application/json',
       'authorization':localStorage.getItem('UserDoc')
    }
}
var body = {
  userid:this.userID,
  name:JSON.parse(localStorage.getItem('userProps'))['username']
}
  this.httpClient.post(environment.apiUrl +'Content/makeReport/'+id,body,config).
   subscribe(res=>{
    this.toastr.success("","Reported");
  },err=>{
    this.toastr.error("",err['error']["msg"]);
    if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
      localStorage.clear();
      this.router.navigateByUrl("/search/searchresults")
    }     
  });
}


toggle() //this method is responsible for showing/hiding comments, the function toggles every time it is clicked
{
  this.commentsflag=!this.commentsflag  //a method to show and hide comments
 }

 EditContent(ID:string){
  var editContent = {
    "id":ID,
    "type":"content"
  }
  console.log(ID);
  localStorage.setItem("editContent",JSON.stringify(editContent));
  this.router.navigateByUrl('/content/edit');

}



}
