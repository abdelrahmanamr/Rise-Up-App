import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-viewallcompanies',
  template: `<div class="container">
  <table class="table table-responsive">
  <thead>
   <tr>
     <th>Companies Table</th>
   </tr>
 </thead>
 <tbody>

 <tr>
 <td>Name</td>
 
 </tr>

  <tr *ngFor="let company of companies">
      <td> {{company.name}} </td> 
    <td> <Button (click)="ViewCompany(company._id)"> ShowCompany </Button> </td>  
   </tr>          

 </tbody>
  </table>
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