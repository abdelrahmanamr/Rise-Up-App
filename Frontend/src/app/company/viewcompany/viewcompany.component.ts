//Contributers : ahmed akram , youssef khayat,omar tarek
//Methods:View Company ,remove Company
//Data modified:5/5/2018
import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-company-viewcompany',
	templateUrl: `viewcompany.html`,
	styleUrls: ['style.css']
})
export class ViewCompanyComponent {
	Company="";
	ID:any;
	adminStatus : boolean = false;
	Url = "";

	constructor(private toastr: ToastrService,private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) {
		this.Url=window.location.href;
		this.ID = this.Url.substr(this.Url.lastIndexOf('/') + 1);

	}

	ngOnInit() {

		if(localStorage.getItem("userProps")!=null){
			this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
		}
		var config ={
				headers :
				{
			'Content-Type':'application/json'
				}
		}
		this.httpClient.get(environment.apiUrl +'/Company/viewCompany/'+this.ID,config).subscribe(
				res=>{
					this.Company = res['data'];
					this.Company['tags']= this.Company['tags'].split(",");
				});

	}

	DeleteCompany()
	{


		var config = {
				headers :
				{
			'Content-Type':'application/json',
			"id":JSON.parse(localStorage.getItem("userProps"))["_id"],
			'authorization':localStorage.getItem('UserDoc')
				}
		}
		this.httpClient.delete(environment.apiUrl+'admin/removeCompany/'+this.ID,config).
		subscribe(res=>{
            this.httpClient.delete(environment.apiUrl+"/search/deleteCompanyFromCompanyIndex/"+this.ID).subscribe(res=>{
                this.router.navigateByUrl('/company/viewallcompanies');
            })
		}       ,err=>{
			this.toastr.error("",err.error["msg"]);
			if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
				localStorage.clear();
				this.router.navigateByUrl("/search/searchresults")
			}
		});


	}

}
