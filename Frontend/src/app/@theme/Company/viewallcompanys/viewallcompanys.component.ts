import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-items',
  template: `<div class="container">
  <table class="table table-responsive">
  <thead>
   <tr>
     <th>Companys Table</th>
   </tr>
 </thead>
 <tbody>

 <tr>
 <td>Title</td>
 <td>Rating</td>
 
 </tr>

   <tr *ngFor="let Company of Companys">
     <td>{{Company.title}}</td>
     <td>{{Company.rating}}</td>
    
   <td><Button (click)="ViewCompany(Company._id)"> ShowCompany </Button></td>  
   </tr>          

 </tbody>
  </table>
  </div>

  <br>

  

  `
})
export class ViewAllCompanysComponent {
  public Companys:any[]=[];
  
  constructor(private httpClient: HttpClient,private router: Router) { }

ngOnInit() {
  this.ViewCompanys();
  }

  ViewCompanys(){
  //  this.httpClient.get(environment.apiUrl +'Company/viewCompanys').subscribe(
      res=>{  
        this.Companys = res['data'];       
      }
    //);
  }
 

  ViewCompany(ID: string){

    localStorage.setItem("CompanyID",ID);
    this.router.navigate(['/Company/viewCompany']);


  }


}
