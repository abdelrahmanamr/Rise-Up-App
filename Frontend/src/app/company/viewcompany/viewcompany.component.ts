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

  <div style="float:right;" *ngIf = "adminStatus"><Button (click)="DeleteCompany(ID)" class="btn btn-danger btn-sm"> DeleteCompany </Button>
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


  <!--table class="table table-responsive">
  <thead>
   <tr>
     <th>Companies Table</th>
   </tr>
 </thead>
 <tbody>

 <tr>
 <td>Name</td> 
 <td>Email</td> 
 <td>Website</td> 
 <td>Tags</td> 
 <td> Type </td> 
 <td> Views </td> 
 <td *ngIf = "adminStatus" > Created At </td> 
 <td *ngIf = "adminStatus" >  Delete </td> 

 </tr>

  <tr >
      <td> {{Company.name}} </td> 
      <td> {{Company.email}} </td> 
      <td> {{Company.website}} </td> 
      <td> {{Company.tags}} </td> 
      <td> {{Company.type}} </td> 
      <td> {{Company.views}} </td> 
      <td *ngIf = "adminStatus"> {{Company.createdAt | date}} </td>  
      <td *ngIf = "adminStatus" ><Button  (click)="DeleteCompany(Company._id)"> Delete </Button></td>  

   </tr>          

 </tbody>
  </table-->

  </div>`
})
export class ViewCompanyComponent {
  ID:string=localStorage.getItem("companyID");
  Company:any
  adminStatus : boolean = false;

  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    
    if(localStorage.getItem("userProps")!=null){
      this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
    }
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
   subscribe();
   this.router.navigate(['/company/viewcompanies']);
   //window.location.reload();
 }

}
