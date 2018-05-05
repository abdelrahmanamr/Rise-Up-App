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
    this.router.navigate(["/user/profile/"+ID]);


  }
}
