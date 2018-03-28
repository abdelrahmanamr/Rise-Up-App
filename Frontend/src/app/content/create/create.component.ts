
import { Component,OnInit } from '@angular/core';
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
        <quill-editor [style]="{height: '500px'}" 
      (onEditorCreated)="setFocus($event)" name = "editor" ngModel><div quill-editor-toolbar></div>
    </quill-editor><br />


    <select class="form-control" name="type" #type="ngModel" [(ngModel)]="typeToSet" required>
    <option [value]="'Post'">Choose type (Default: Post)</option>
    <option *ngFor="let type of types" [value]="type">{{type}}
    </option>
    </select>

    <br />

    <input type = "text" class="form-control" name = "tags" placeholder = "Tags to be properly implemented later" ngModel><br />

    <input class="btn btn-danger" type = "submit" value = "submit">
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

  constructor(private http: HttpClient,private router:Router,fb: FormBuilder) {

    this.form = fb.group({
      editor: ['']
    });

    this.modules = {
      formula: true,
      toolbar: [['formula'], ['image']],
      imageResize: {}
    }
  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("userProps"));
    console.log(this.user);
    if(this.user==null){
      this.router.navigate(["/dashboard"]);
    }
  }



  setFocus($event) {
    $event.focus();
  }

  onSubmit = function(content){
    console.log(this.user);
    console.log(this.user['_id']);

    var data = JSON.stringify({title:content.title,type:content.type,body:content.editor,tags:content.tags,userid:this.user['_id']})

    var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    this.http.post(environment.apiUrl+'/content/addContent', data, config)
    .subscribe(res=>{
    console.log(res);

    },err=>{
      console.log(err);
    });

    console.log(content);
  }

}
