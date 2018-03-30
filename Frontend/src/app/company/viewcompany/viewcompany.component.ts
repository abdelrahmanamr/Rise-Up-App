import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-company-viewcompany',
  template: `
  <div class="container">
  <table class="table table-responsive">
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
 <td> Created At </td> 
 <td> Updated At </td> 
 <td> Delete </td> 

 </tr>

  <tr >
      <td> {{Company.name}} </td> 
      <td> {{Company.email}} </td> 
      <td> {{Company.website}} </td> 
      <td> {{Company.tags}} </td> 
      <td> {{Company.type}} </td> 
      <td> {{Company.views}} </td> 
      <td> {{Company.createdAt}} </td> 
      <td> {{Company.updatedAt}} </td> 
      <td><Button (click)="DeleteCompany(Company._id)"> Delete </Button></td>  

   </tr>          

 </tbody>
  </table>

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
