import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
<<<<<<< HEAD
  selector: 'app-expert-viewallexperts',
=======
  selector: 'app-dashboard-items',
>>>>>>> ReadingContent
  template: `<div class="container">
  <table class="table table-responsive">
  <thead>
   <tr>
<<<<<<< HEAD
     <th>Experts Table</th>
=======
     <th>experts Table</th>
>>>>>>> ReadingContent
   </tr>
 </thead>
 <tbody>

 <tr>
<<<<<<< HEAD
 <td>Name</td>
 
 </tr>

  <tr *ngFor="let expert of experts">
      <td> <span *ngIf="expert.expert"> <a> {{expert.username}} </a>  </span> </td> 
    <td><span *ngIf="expert.expert">  <a> <Button (click)="ViewExpert(expert._id)"> ShowExpert </Button> </a></span></td>  
=======
 <td>Title</td>
 <td>Rating</td>
 
 </tr>

   <tr *ngFor="let expert of experts">
     <td>{{expert.title}}</td>
     <td>{{expert.rating}}</td>
    
   <td><Button (click)="Viewexpert(expert._id)"> Showexpert </Button></td>  
>>>>>>> ReadingContent
   </tr>          

 </tbody>
  </table>
<<<<<<< HEAD
  </div>`
})
export class ViewAllExpertsComponent {

  // <tr *ngFor="let expert of experts">
  //     <td> <span *ngIf="expert.expert"> <a> {{expert.username}} </a>  </span> </td> 
  //   <td><span *ngIf="expert.expert">  <a> <Button (click)="ViewExpert(expert._id)"> ShowExpert </Button> </a></span></td>  
  //   </tr>

constructor(private httpClient: HttpClient, private router: Router) { }

public experts:any[]=[];
=======
  </div>

  <br>

  

  `
})
export class ViewAllExpertsComponent {
  public experts:any[]=[];
  
  constructor(private httpClient: HttpClient,private router: Router) { }
>>>>>>> ReadingContent

ngOnInit() {
  this.ViewExperts();
  }

  ViewExperts(){
<<<<<<< HEAD
    this.httpClient.get(environment.apiUrl +'User/viewUsers').subscribe(
      res=>{  
        this.experts=res['data']
     }
    );

   
  }


  ViewExpert(ID: string){
=======
    this.httpClient.get(environment.apiUrl +'expert/viewexperts').subscribe(
      res=>{  
        this.experts = res['data'];       
      }
    );
  }
 

  Viewexpert(ID: string){
>>>>>>> ReadingContent

    localStorage.setItem("expertID",ID);
    this.router.navigate(['/expert/viewexpert']);


  }
<<<<<<< HEAD
}
=======


}
>>>>>>> ReadingContent
