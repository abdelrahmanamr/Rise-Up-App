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
  <h5>Viewing Company:</h5>
  <h2><b>{{Company.name}}</b></h2>
  <br> 
  <div class="card" style="padding:25px 15px; padding-bottom:220px; margin-bottom:20px;display: block; ">

  <div style="float:right;" *ngIf = "adminStatus"><Button (click)="DeleteCompany(ID)" class="btn btn-danger btn-sm"><i class="nb-trash" style="font-size:20px;color:#FFF;font-weight:900;"></i>


  </Button>
  </div>

  <div style="float:left;">
  
  <div><b>Field:</b>  {{Company.type}}</div>
  <br>
  <div><b>Email:</b> {{Company.email}}</div>
  <br>
  <div><b>Website:</b>{{Company.website}}</div>
  <br>
  <div><b>Views:</b> {{Company.views}}</div>
  <br>
  <div><b>Tag:</b> <span class="tags-input__tag" *ngFor="let tag of Company.tags;">{{tag}}</span></div>
  <br>
  
  

  </div>

  </div>`
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
