
import { Component,OnInit ,ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";
import * as QuillNamespace from 'quill';
import { ToastrService } from 'ngx-toastr';
let Quill: any = QuillNamespace;
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);
/*  Contributers : Omar Elzamarany , Ahmed Hossam  
    Methods : onTagsChanged , changeType , GetContent , ngOnInit , onSubmit , setFocus , 

 */

@Component({
	selector: 'app-content-create',
	templateUrl: `edit.html`,
	styleUrls:['style.css']
})
export class EditComponent implements OnInit{

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
editContent:JSON=JSON.parse(localStorage.getItem("editContent"));
contentToEdit="";
title = "";
link = "";
tags:any=[];
text = "";



constructor(private http: HttpClient, private toastr: ToastrService
		,private router:Router,fb: FormBuilder,private elem : ElementRef) {

	this.form = fb.group({
		editor: ['']
	});




}
onTagsChanged($event){


}

changeType(select){
	if(this.typeToSet=="Link"){
		this.post =1;
	}else{
		this.post =0;
	}
}

GetContent(ID:string){
	var config ={
			headers : 
			{
		'Content-Type':'application/json',
		'authorization':localStorage.getItem('UserDoc')

			}
	}
	if(this.editContent['type']=='suggestion'){
		this.http.get(environment.apiUrl +'/suggestedcontent/viewSuggestedContent/'+ID,config).subscribe(
				res=>{  


					this.title = res['data'].title;

					this.typeToSet = res['data'].type;
					if(res['data'].type== "Post"){
						this.quill.root.innerHTML = res['data'].body;
					}   

					if(res['data'].type== "Link"){
						this.link = res['data'].body;
					}  

					this.tags = res['data'].tags;

				}
				);
	}else if (this.editContent['type']=='content'){
		this.http.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
				res=>{  


					this.title = res['data'].title;
					this.typeToSet = res['data'].type;
					if(res['data'].type== "Post"){
						this.quill.root.innerHTML = res['data'].body;
					}   

					if(res['data'].type== "Link"){
						this.link = res['data'].body;
					}  

					if(res['data'].tags!=null)
						// this.tags = res['data'].tags.split(",");
						res['data'].tags.split(",").forEach(element => {
							var el = JSON.parse(JSON.stringify({"displayValue":element}));
							this.tags.push(el);
						});

				}
				);
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
	this.GetContent(this.editContent['id']);
	this.user = JSON.parse(localStorage.getItem("userProps"));
	if(this.user==null ){
		this.router.navigate(["/user"]);
	}



}



setFocus($event) {
	$event.focus();
}

onSubmit = function(content){

	var data:any;
var result = this.tags.map(function(val) {
	return val.displayValue;
}).join(',');
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
		'Content-Type': 'application/json',
		'authorization':localStorage.getItem('UserDoc')
	}
	}

	if(this.user['admin']){
		if(this.editContent['type']=='suggestion'){
			this.http.patch(environment.apiUrl+'/suggestedcontent/updateSuggestedContent/'+this.editContent['id'], data, config)
			.subscribe(res=>{
				this.router.navigate(["/content/suggestedcontent"]);
			},err=>{
				this.toastr.error("",err['error']["msg"]);
				if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
					localStorage.clear();
					this.router.navigateByUrl("/search/searchresults")
				}         });
		}else if(this.editContent['type']=='content'){
			this.http.patch(environment.apiUrl+'/content/editContent/'+this.editContent['id'], data, config)
			.subscribe(res=>{
				this.router.navigate(["/content/viewallcontents"]);
			},err=>{
				this.toastr.error("",err['error']["msg"]);
				if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
					localStorage.clear();
					this.router.navigateByUrl("/search/searchresults")
				}         });
		}
	}
	else{

	}

}
}


}
