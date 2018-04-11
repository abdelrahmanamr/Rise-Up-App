import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-company-viewcompany',
  template: `
  <div class="container">
  
  <h2>{{Company.name}}</h2>
  <br> 
  <div class="card" style="padding:25px 15px; padding-bottom:120px; margin-bottom:20px;display: block; ">

  <div style="float:right;" *ngIf = "adminStatus"><Button (click)="DeleteCompany(ID)" class="btn btn-danger btn-sm"> Delete StartUP </Button>
  </div>

  <div style="float:left;">
  
  Field:  {{Company.type}}
  <br>
  email: {{Company.email}}
  <br>
  website: {{Company.website}}
  <br>
  tags: {{Company.tags}}
  <br>
  views: {{Company.views}}
  <br>
  
  

  </div>

  </div>`
})
export class ViewCompanyComponent {
  Company="";
  ID:any;
  adminStatus : boolean = false;

  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.ID=localStorage.getItem("companyID");

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
       // console.log(Company);
          
      }
    );
      }


 DeleteCompany(ident:string)
 {
   var config = {
                 headers : 
                 {
                     'Content-Type':'application/json'
                 }
             }
   this.httpClient.delete('http://localhost:3000/api/admin/removeCompany/'+ident,config).
   subscribe(res=>{
    this.router.navigateByUrl('/company/viewallcompanies');
   });


 }

}
