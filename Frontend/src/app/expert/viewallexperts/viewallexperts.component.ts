import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-expert-viewallexperts',
  templateUrl: `viewallexperts.html`
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
        this.experts=res['data'];
        this.experts.forEach(expert => {
          expert.tags=expert.tags.split(",");
        });
     }
    );

   
  }


  ViewExpert(ID: string){

    localStorage.setItem("expertID",ID);
    this.router.navigate(['/expert/viewexpert']);


  }
}
