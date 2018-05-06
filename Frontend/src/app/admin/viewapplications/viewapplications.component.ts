import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-admin-ViewApplications',
	templateUrl: 'viewapplications.html'
})
export class ViewApplicationsComponent {
	public applications: any[] = [];

	constructor(private httpClient: HttpClient, private router: Router,
		private toastr: ToastrService) { }

	ngOnInit() {
		if(localStorage.getItem("userProps")){
			this.ViewApplications();
		}else{
			this.router.navigateByUrl('/');
		}
	}
	ViewApplications() {     //this method views all applications of users to be an experts
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'authorization': localStorage.getItem('UserDoc')
			}
		}

		this.httpClient.get(environment.apiUrl + '/applyExpert/getApplications', config).subscribe(
			res => {if(res['data']!=null){
					for (var i = 0; i < res['data'].length; i++) {
						if (res['data'][i].status == 0) {
							this.applications.push(res['data'][i]);
						}
					}
				}
			}, err => {
				this.toastr.error("", err['error']["msg"]);
				if (err.error["msg"] == "Login timed out, please login again." || err.error["msg"] == 'You have to login first before you can access this URL.') {
					localStorage.clear();
					this.router.navigateByUrl("/search/searchresults")
				}
			}
		);
	}

	Accept(ID: string) {    //this method accepts the user application as an expert

		var config = {
			headers: {
				'Content-Type': 'application/json',
				'authorization': localStorage.getItem('UserDoc')
			}
		}
		var data = JSON.stringify({ userid: JSON.parse(localStorage.getItem("userProps"))["_id"] });
		this.httpClient.patch(environment.apiUrl + '/admin/AddExpert/' + ID, data, config)
			.subscribe(res => {
				if(res['data']['tags']){
					var JSONtoIndex = {
						"name": res['data']['tags'],
						"object": res['data'],
						"type": "User"
					}
				


				this.httpClient.post(environment.apiUrl + '/search/addToUserIndex', JSONtoIndex, config).subscribe(res => {
					window.location.reload();
				})
				}else{
					window.location.reload();
				}
			}, err => {
				this.toastr.error("", err['error']["msg"]);
				if (err.error["msg"] == "Login timed out, please login again." || err.error["msg"] == 'You have to login first before you can access this URL.') {
					localStorage.clear();
					this.router.navigateByUrl("/search/searchresults")
				}
			});
	}

	Reject(ID: String) {    //this method reject the user application as an expert


		var config = {
			headers: {
				'Content-Type': 'application/json',
				'authorization': localStorage.getItem('UserDoc')
			}
		}
		this.httpClient.delete(environment.apiUrl + '/admin/RemoveRequest/' + ID, config)
			.subscribe((info: any) => {
				window.location.reload();
			}, err => {
				this.toastr.error("", err['error']["msg"]);
				if (err.error["msg"] == "Login timed out, please login again." || err.error["msg"] == 'You have to login first before you can access this URL.') {
					localStorage.clear();
					this.router.navigateByUrl("/search/searchresults")
				}
			});
	}
}
