import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-expert-viewallexperts',
  template: `
  
  <div class="container">
  <div *ngFor="let expert of experts">
    <div class="card" style="padding:10px 15px; padding-bottom:70px; margin-bottom:20px;display: block; ">
    <div style="float:left;">
    <h4>{{expert.firstname}} {{expert.lastname}}</h4>
    Email: {{expert.email}}</div>
    <div style="float:right;"><Button (click)="ViewExpert(expert._id)" class="btn btn-danger btn-sm"> View Expert </Button><br />

    </div>
  </div>
  </div>
  `
})
export class ViewAllExpertsComponent {

  // <tr *ngFor="let expert of experts">
  //     <td> <span *ngIf="expert.expert"> <a> {{expert.username}} </a>  </span> </td> 
  //   <td><span *ngIf="expert.expert">  <a> <Button (click)="ViewExpert(expert._id)"> ShowExpert </Button> </a></span></td>  
  //   </tr>

constructor(private httpClient: HttpClient, private router: Router) { }

public experts:any[]=[];

ngOnInit() {
  this.ViewExperts();
  }

  ViewExperts(){
    this.httpClient.get(environment.apiUrl +'User/viewUsers').subscribe(
      res=>{  
        this.experts=res['data']
     }
    );

   
  }


  ViewExpert(ID: string){

    localStorage.setItem("expertID",ID);
    this.router.navigate(['/expert/viewexpert']);


  }
}
