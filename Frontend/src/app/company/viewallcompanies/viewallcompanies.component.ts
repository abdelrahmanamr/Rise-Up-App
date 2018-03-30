import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-viewallcompanies',
  template: `<div class="container">
  <h2> Startups </h2>
  <br>
  <div *ngFor="let company of companies">
  <div class="card" style="padding:10px 15px; padding-bottom:80px; margin-bottom:20px;display: block; ">
  <div style="float:left;">
  <h4>{{company.name}}</h4>
  Field: {{company.type}}
  </div>
  <div style="float:right;"> <br> <Button (click)="ViewCompany(company._id)" class="btn btn-danger btn-sm"> see more </Button>
  </div>

  </div>
</div>


  </div>`
})
export class ViewAllCompaniesComponent {

 

constructor(private httpClient: HttpClient, private router: Router) { }

public companies:any[]=[];

ngOnInit() {
  this.ViewCompanies();
  }

  ViewCompanies(){
    this.httpClient.get(environment.apiUrl +'Company/viewCompanies').subscribe(
      res=>{  
        this.companies=res['data']
     }
    );

   
  }


  ViewCompany(ID: string){

    localStorage.setItem("companyID",ID);
    this.router.navigate(['/company/viewcompany']);


  }
}