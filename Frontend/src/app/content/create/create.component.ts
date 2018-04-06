
import { Component,OnInit ,ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";



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

        <quill-editor [style]="{height: '500px'}" 
      (onEditorCreated)="setFocus($event)" *ngIf="post==0"  name = "editor" ngModel><div quill-editor-toolbar></div>
    </quill-editor>

    <input *ngIf="post==2" type='file' (change)="onSelectFile($event)"><br /><br />



    <input type = "text" class="form-control" name = "tags" placeholder = "Tags to be properly implemented later" ngModel><br />

    <input class="btn btn-danger" type = "submit" value = "submit"> {{errorHandle}}

    <br />
    <img [src]="url" height="200"> <br/>

    </form>
    {{text}}


  </div>`
})
export class CreateComponent implements OnInit{

  form: FormGroup;
  modules = {};
  types: string[] = ["Post", "Link","Image"];
  typeToSet: string = "Post";
  user = null;
  post : Number;
  url = "";
  errorHandle = "";
  

  constructor(private http: HttpClient,private router:Router,fb: FormBuilder,private elem : ElementRef) {

    this.form = fb.group({
      editor: ['']
    });

    this.modules = {
      formula: true,
      toolbar: [['formula'], ['image']],
      imageResize: {}
    }
  }

  changeType(select){
    if(this.typeToSet=="Link"){
      this.post =1;
    }else if (this.typeToSet=="Post"){
      this.post =0;
    }else{
      this.post = 2;
    }
  }

  ngOnInit(){
    this.post = 0;
    this.user = JSON.parse(localStorage.getItem("userProps"));
    console.log(this.user);
    if(this.user==null || !this.user['admin'] ){
      this.router.navigate(["/user"]);
    }
  }



  setFocus($event) {
    $event.focus();
  }

  onSubmit = function(content){
    console.log(this.user);
    console.log(this.user['_id']);
    var data:any;

    if(this.post==2 && this.url==""){
      this.text = "Please add a photo";
    }else{

    if(this.post == 0){
      data = JSON.stringify({title:content.title,type:"Post",body:content.editor,tags:content.tags,userid:this.user['_id']})
    }else if(this.post==1){
      data = JSON.stringify({title:content.title,type:"Link",body:content.link,tags:content.tags,userid:this.user['_id']})
    }else if(this.post==2){
      data = JSON.stringify({title:content.title,type:"Image",body:this.url,tags:content.tags,userid:this.user['_id']})
    }
    var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    this.http.post(environment.apiUrl+'/content/addContent', data, config)
    .subscribe(res=>{
    console.log(res);
    var tags =   res["data"]["tags"];
         var JSONtoIndex = {
             "name":tags,
             "id":res["data"]["_id"],
             "type":"Content"
         }
         console.log(JSONtoIndex);
         this.http.post(environment.apiUrl+'search/addToIndex',JSONtoIndex,config)
         .subscribe(res =>{console.log(res)
            this.router.navigate(["/content/viewallcontents"])
        },
        err=>console.log("error adding to index"));
    },err=>{
   
      this.errorHandle = err['error']['msg'];
    });

    }
  }

  uploadImage()
  {
    let images = this.elem.nativeElement.querySelector('#selectImage').images; 
    let formdata = new FormData();
    let image = images[0];
    formdata.append('selectImage',image,image.name);
    var config = {headers :{
      'Content-Type' : 'application/json'
    }}
    this.http.post(environment.apiUrl+'content/uploadImage/'+formdata,config).subscribe(res=> 
      this.dataLoaded(res));
  }

  private dataLoaded(data:any):void{
    this.elem.nativeElement.querySelector('#spinner').sytle.visibility='hidden';
  }

  onSelectFile(event) { // called each time file input changes

    var reader:any,
    target:EventTarget;
    if (event.target.files && event.target.files[0]) {
      reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log(this.url);
      }
    }
}
}
