import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
/* Contributer : Ahmed Hossam,KarimElghandour
   Methods :onSubmit();
   Date Edited : 5/5/2018
 */
@Component({
	selector: 'app-user-applyExpert',
	styles:
		['#left {  float: left; width: 40%;overflow: hidden; }',
		 '#right {  float: right; width: 60%;overflow: hidden; }'
		 ],
		template: `
		<form class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
<label  style="font-size: 50px;;font-weight: bold;">
Enter your previous Experience!

</label>
<input type = "exp" class="form-control" name = "previousExperience" placeholder = "Enter your previous experience" style="width: 300px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;  "ngModel>
<br>
<div id="left">
</div>


<div id="right">
<input class="btn btn-success" type = "submit" value = "Confirm" style="background-color:#DC0C18">   {{errorView}}  
</div>

</form>
<br /> 
`
})
export class ApplyExpertComponent implements OnInit{
	errorView = "";
	constructor(private http: HttpClient,private router: Router,private toastr: ToastrService){

	}
	ngOnInit(){

	}

	onSubmit = function(user){
		var id = JSON.parse(localStorage.getItem("userProps"))["_id"];

		var data = JSON.stringify({previousExperience:user.previousExperience , userid : id});

		var config = {
				headers : {
			'Content-Type': 'application/json'
		}
		}

		this.http.post('http://localhost:3000/api/applyExpert/createApplyExpert', data, config)
		.subscribe(res=>{

			this.router.navigateByUrl("/");


		},err=>{
			this.toastr.error("",err.error["msg"]) 
			this.errorView = err.error["msg"];
		}
				);


	}


}
