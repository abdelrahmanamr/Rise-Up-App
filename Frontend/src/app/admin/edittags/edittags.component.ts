import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-admin-edittags',
	templateUrl: 'edittags.html'

})
export class EdittagsComponent implements OnInit{
	ID:string=localStorage.getItem("expertID");
expert = "";
constructor(private toastr: ToastrService,private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }

ngOnInit() { 
	this.ViewExpert(this.ID) ;
}

ViewExpert(ID:String){
	var config ={
			headers : 
			{
		'Content-Type':'application/json',
		"id":JSON.parse(localStorage.getItem("userProps"))["_id"],
		'authorization':localStorage.getItem('UserDoc')
			}
	}
	this.httpClient.get(environment.apiUrl +'/User/viewUser/'+ID,config).subscribe(
			res=>{  
				this.expert = res['data'];

			},       err=>{
				this.toastr.error("",err.error["msg"]);
				if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
					localStorage.clear();
					this.router.navigateByUrl("/search/searchresults")
				}
			});  

}
go(){
	window.location.replace("#/admin/profile")

}

}
