import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-items',
  template: `<div class="container">
  <table class="table table-responsive">
  <thead>
   <tr>
     <th>experts Table</th>
   </tr>
 </thead>
 <tbody>

 <tr>
 <td>Title</td>
 <td>Rating</td>
 
 </tr>

   <tr *ngFor="let expert of experts">
     <td>{{expert.title}}</td>
     <td>{{expert.rating}}</td>
    
   <td><Button (click)="Viewexpert(expert._id)"> Showexpert </Button></td>  
   </tr>          

 </tbody>
  </table>
  </div>

  <br>

  

  `
})
export class ViewAllExpertsComponent {
  public experts:any[]=[];
  
  constructor(private httpClient: HttpClient,private router: Router) { }

ngOnInit() {
  this.ViewExperts();
  }

  ViewExperts(){
    this.httpClient.get(environment.apiUrl +'expert/viewexperts').subscribe(
      res=>{  
        this.experts = res['data'];       
      }
    );
  }
 

  Viewexpert(ID: string){

    localStorage.setItem("expertID",ID);
    this.router.navigate(['/expert/viewexpert']);


  }


}
