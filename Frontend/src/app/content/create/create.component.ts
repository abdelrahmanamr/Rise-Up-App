
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
  template: `
  <link href="https://cdn.quilljs.com/1.2.2/quill.snow.css" rel="stylesheet">
  <link href="https://cdn.quilljs.com/1.2.2/quill.bubble.css" rel="stylesheet">

  <div class="container">
  <form #contentForm="ngForm" (ngSubmit) = "onSubmit(contentForm.value)"> 
  <input type = "text" class="form-control" name = "title" placeholder = "Title Here" ngModel><br />

  <select class="form-control" name="type" #type="ngModel" [(ngModel)]="typeToSet" (ngModelChange)="changeType(this)" required>     <br />
  <option [value]="'Post'">Choose type (Default: Post)</option>
  <option *ngFor="let type of types" [value]="type">{{type}}
  </option>
  </select>
  <br />

  <input type = "text" class="form-control" name = "link" placeholder = "Enter your Link" *ngIf="post==1" ngModel>

  <div [hidden]="post==1">

  <div id="toolbar-container">
<span class="ql-formats">
<select class="ql-font"></select>
<select class="ql-size"></select>
</span>
<span class="ql-formats">
<button class="ql-bold"></button>
<button class="ql-italic"></button>
<button class="ql-underline"></button>
<button class="ql-strike"></button>
</span>
<span class="ql-formats">
<select class="ql-color"></select>
<select class="ql-background"></select>
</span>
<span class="ql-formats">
<button class="ql-script" value="sub"></button>
<button class="ql-script" value="super"></button>
</span>
<span class="ql-formats">
<button class="ql-header" value="1"></button>
<button class="ql-header" value="2"></button>
<button class="ql-blockquote"></button>
<button class="ql-code-block"></button>
</span>
<span class="ql-formats">
<button class="ql-list" value="ordered"></button>
<button class="ql-list" value="bullet"></button>
<button class="ql-indent" value="-1"></button>
<button class="ql-indent" value="+1"></button>
</span>
<span class="ql-formats">
<button class="ql-direction" value="rtl"></button>
<select class="ql-align"></select>
</span>
<span class="ql-formats">
<button class="ql-link"></button>
<button class="ql-image"></button>
<button class="ql-video"></button>
<button class="ql-formula"></button>
</span>
<span class="ql-formats">
<button class="ql-clean"></button>
</span>
</div>

  <div id="editor" style="height: 500px" >
  </div>
  </div>
    <br />

    <input type = "text" class="form-control" name = "tags" placeholder = "Tags to be properly implemented later" ngModel><br />

    <input class="btn btn-danger" type = "submit" value = "submit"> {{errorHandle}}

    <br />

    </form>
    {{text}}


  </div>`
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


  

  constructor(private http: HttpClient,private router:Router,fb: FormBuilder,private elem : ElementRef,
    private toastr: ToastrService) {

    this.form = fb.group({
      editor: ['']
    });

     


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

    if(this.post==2 && this.url==""){
      this.text = "Please add a photo";
    }else{

    if(this.post == 0){
      data = JSON.stringify({title:content.title,type:"Post",body:this.quill.root.innerHTML,tags:content.tags,userid:this.user['_id']})
    }else if(this.post==1){
      data = JSON.stringify({title:content.title,type:"Link",body:content.link,tags:content.tags,userid:this.user['_id']})
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
