//Contributers : ahmed akram, youssef khayat
//Methods:View Companies ,Company Views
//Data modified:5/5/2018
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";

@Component({
	selector: 'app-company-viewallcompanies',
	templateUrl: `viewallcompanies.html`
})
export class ViewAllCompaniesComponent {

	adminStatus: boolean = false;

	constructor(private httpClient: HttpClient, private router: Router) { }

	public companies: any[] = [];

	ngOnInit() {
		if (localStorage.getItem("userProps") != null) {
			this.adminStatus = JSON.parse(localStorage.getItem('userProps'))['admin'];
		}
		this.ViewCompanies();
	}


	ViewCompanies() {
		this.httpClient.get(environment.apiUrl + 'Company/viewCompanies').subscribe(
			res => {
				this.companies = res['data'];

				this.companies.forEach(company => {
					company.tags = company.tags.split(",");
				});
			}
		);


	}


	ViewCompany(ID: string) {
		var config = {
			headers:
				{
					'Content-Type': 'application/json'
				}
		}
		this.httpClient.patch(environment.apiUrl + "company/CompanyViews/" + ID, config).subscribe(
			res => {
				this.companies = res['data']

			}
		);
		this.router.navigateByUrl('/company/viewcompany/' + ID);



	}
	AddCompany() {
		this.router.navigate(["/admin/addcompany"]);
	}
}

