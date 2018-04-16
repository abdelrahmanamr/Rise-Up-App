
import { Component,OnInit ,ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);



@Component({
  selector: 'app-content-create',
  templateUrl: 'create.html'
})
export class CreateComponent implements OnInit{

  form: FormGroup;
  modules = {};
  types: string[] = ["Post", "Link"];
  typeToSet: string = "Post";
  user = null;
  post : Number;
  url = "";
  errorHandle = "";
  editor : any;
  editor_text = "";
  quill: any;
  tags:any=[];


  

  constructor(private http: HttpClient,private router:Router,fb: FormBuilder,private elem : ElementRef,
    private toastr: ToastrService) {

    this.form = fb.group({
      editor: ['']
    });

     


  }
  onTagsChanged($event){

    console.log(this.tags);
       console.log( (JSON.stringify(this.tags)));

    }
  changeType(select){
    if(this.typeToSet=="Link"){
      this.post =1;
    }else{
      this.post =0;
    }
  }

  ngOnInit(){



    this.post = 0;
    this.quill = new Quill("#editor", {
      theme: "snow",
     
      modules: {
        toolbar: '#toolbar-container',
        blotFormatter: {}
      },
      
    });
    this.user = JSON.parse(localStorage.getItem("userProps"));
    console.log(this.user);
    if(this.user==null ){
      this.router.navigate(["/user"]);
    }


  }



  setFocus($event) {
    $event.focus();
  }

  onSubmit = function(content){
    console.log(this.user);
    console.log(this.user['_id']);
    console.log();
    var data:any;
    var result = this.tags.map(function(val) {
      return val.displayValue;
  }).join(',');
  console.log(result);

    if(this.post==2 && this.url==""){
      this.text = "Please add a photo";
    }else{

    if(this.post == 0){
      data = JSON.stringify({title:content.title,type:"Post",body:this.quill.root.innerHTML,tags:result,userid:this.user['_id']})
    }else if(this.post==1){
      data = JSON.stringify({title:content.title,type:"Link",body:content.link,tags:result,userid:this.user['_id']})
    }
    var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    if(this.user['admin']){
    this.http.post(environment.apiUrl+'/content/addContent', data, config)
    .subscribe(res=>{
    console.log(res);
    var tags =   res["data"]["tags"];
         var object = res["data"];
         var JSONtoIndex = {
             "name":tags,
             "object":res["data"],
             "type":"Content"
         }
         console.log(JSONtoIndex);
         this.http.post(environment.apiUrl+'search/addToIndex',JSONtoIndex,config)
         .subscribe(res =>{console.log(res);
                 var JSONtoContentIndex = {
                     "name": content.title,
                     "object":object,
                     "type": "Content"
                 }
                 this.http.post(environment.apiUrl+'search/addToContentIndex',JSONtoContentIndex,config).subscribe(
                     res => {
                         console.log(res);
                         this.router.navigate(["/content/viewallcontents"])
                     }
            )
        },
        
        err=>
        console.log("error adding to index"));
    },err=>{
      this.toastr.error("",err['error']["msg"]);
      this.errorHandle = err['error']['msg'];
    });
  }
  else{
    this.http.post(environment.apiUrl+'/suggestedcontent/addSuggestedContent',data,config)
    .subscribe(res=>{
      console.log(res);
      this.router.navigate(["/suggestedcontent/viewSuggestedContents/"])
    },err=>{
      this.toastr.error("",err['error']["msg"]);
      this.errorHandle = err['error']['msg'];
    });
  }

    }
  }

  
}
