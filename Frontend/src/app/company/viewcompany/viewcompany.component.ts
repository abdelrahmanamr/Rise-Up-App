import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-company-viewcompany',
  templateUrl: `viewcompany.html`
})
export class ViewCompanyComponent {
  Company="";
  ID:any;
  adminStatus : boolean = false;
  Url = "";

  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { 
    this.Url=window.location.href;
    this.ID = this.Url.substr(this.Url.lastIndexOf('/') + 1);
    console.log(this.ID);

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
