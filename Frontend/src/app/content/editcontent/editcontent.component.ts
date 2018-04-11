import { Component, OnInit , ViewChild ,ElementRef } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-content-viewcontent',
    templateUrl:'editcontent.component.html' 
    
  })

    export class EditcontentComponent {

        form: FormGroup;
        data = {};
        modules = {};
        types: string[] ;
        typeToSet: string = '';
        user = null;
        post : Number;
        url = "";
        errorHandle = "";
        text="";
        ID:string=localStorage.getItem("contentID");
        Content : any;
        Title:any
        PostTitle :any
        Body:any
        Tag:any
        ImagePath:string
        adminStatus :boolean = false;
        public contents:any[]=[];

        constructor(private httpClient: HttpClient,private http: HttpClient,private router:Router,fb: FormBuilder,private elem : ElementRef)
         {
          this.form = fb.group({
            editor: ['']
          });
         } 

         titleValue = "";
         LinkValue = "" ;
         PostValue = "";
         TagValue = "";
         errValue="";

         titleErr = 0 ;
         postErr = 0 ;
         linkErr = 0  ;
         tagErr = 0 ;
         imageErr = 0 ; 
         
         getTilteValue(value: string) { this.titleValue = value; }
         getPostValue(value: string) { this.PostValue = value; }
         getLinkValue(value: string) { this.LinkValue = value; }
         getTagValue(value: string) { this.TagValue = value; }

         ngOnInit(){
          var config ={
            headers : 
                     {
                      'Content-Type':'application/json'
                     }
            }
          this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+this.ID,config).subscribe(
            res=>{
          if((res['data'].type == "Link")){
            this.types = [ "Link", "Post", "Image"];
            this.post = 1 ;
          }else if((res['data'].type == "Post")){
            this.types = [ "Post", "Link", "Image"];
            this.post = 0 ;
          }else {
            this.types = [ "Image" , "Post", "Link"];
            this.post = 2 ;
          }
          })

          if(localStorage.getItem("userProps")!=null){
            this.user = JSON.parse(localStorage.getItem("userProps"))["username"];
            this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
          }else{
              this.router.navigate(["/user"]);
            
          }
          
          this.GetContent(this.ID) ;
          
        }

        Delete(ident:string)
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


        Submit(ident:String){

          var data:any;

          this.text = "";
          this.titleErr = 0 ;
          this.postErr = 0 ;
          this.linkErr = 0  ;
          this.tagErr = 0 ;
          this.imageErr = 0 ; 
      
          if(this.post==2 && this.url==""){
            this.text = "Please add a photo";
            this.imageErr = 1 ;
          }
          else if(this.titleValue == ""||
          (this.LinkValue == "" &&
          this.PostValue == "")||
          this.TagValue == ""){

            if(this.titleValue == "") {
              this.titleErr = 1 ;
              this.text = this.text + "you did not edit the Title , \n ";
            }
            if((this.LinkValue == "")&&(this.post == 1) ){
              this.postErr = 0 ;
              this.linkErr = 1 ;
              this.text = this.text + "you did not edit the Link , \n";
            }
            if((this.PostValue == "" )&&(this.post == 0)  ){
              this.tagErr = 0 ;
              this.postErr = 1 ;
              this.text = this.text + "you did not edit the Post , \n";
            }
            if(this.TagValue == ""  ){
              this.tagErr = 1 ;
              this.text = this.text + "you did not edit the Tag , \n"; 
            }
            this.text = this.text + " if you do not want to editcilck the Cancel Button" 
          }
          else{

          if(this.post == 0){
             data = JSON.stringify({title:this.titleValue,type:"Post",body:this.PostValue,tags:this.TagValue})
            console.log("passing the post data to thae backend")
            }else if(this.post==1){
            data = JSON.stringify({title:this.titleValue,type:"Link",body:this.LinkValue,tags:this.TagValue})
          }else if(this.post==2){
            data = JSON.stringify({title:this.titleValue,type:"Image",body:this.url,tags:this.TagValue})
          }

          console.log("calling the backend ........");
 
          var config = {
              headers : { 
                  'Content-Type': 'application/json'
              }
          }
          console.log("post id : " + ident );
          this.http.patch(environment.apiUrl+'/content/editContent/'+ident, data, config).subscribe(res=>{
          console.log("reRouting ............");

            this.router.navigate(["/content/viewallcontents"]);
          },err=>{
         
            this.errorHandle = err['error']['msg'];
          });
      
          }
          
          console.log("Done with the edit");
        }


        hide(ID){
          var el = document.getElementById(ID);
          el.style.display="none";

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
        this.Tag = res['data'].Tag;
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
        this.PostTitle = res['data'].title;
        this.Tag = res['data'].tags;
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
       this.ImagePath= res['data'].body;  
       this.PostTitle = res['data'].title;
       this.Tag = res['data'].Tag;
      }
    );
}



 Cancel(){
  this.router.navigate(['/content/viewallcontents']);
 }

 changeType(event:any){

  var postvalue = event.target.value;
  
  if((postvalue == "Link")){
    this.post = 1 ;
  }else if((postvalue == "Post")){
    this.post = 0 ;
  }else {
    this.post = 2 ;
  }
}
         
onSelectFile(event) { // called each time file input changes

  var reader:any,
  target:EventTarget;
  if (event.target.files && event.target.files[0]) {
    reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
      this.ImagePath = this.url ;
      console.log("image url : " + this.url);
    }
  }
}
        
         
    


  

    }