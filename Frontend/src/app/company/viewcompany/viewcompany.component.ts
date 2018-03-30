import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-company-viewcompany',
  template: `
  <div class="container">
  <span> <div [innerHTML]="Company"></div></span>
  </div>`
})
export class ViewCompanyComponent {
  ID:string=localStorage.getItem("companyID");
  Company:any

  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }

  ngOnInit() { 
    this.ViewCompany(this.ID) ;
      }

ViewCompany(ID:String){
  var config ={
    headers : 
  {
'Content-Type':'application/json'
  }
}
  this.httpClient.get(environment.apiUrl +'/Company/viewCompany/'+ID,config).subscribe(
    res=>{  
      this.Company = res['data'].email;  
        
    }
  );
 }

}
