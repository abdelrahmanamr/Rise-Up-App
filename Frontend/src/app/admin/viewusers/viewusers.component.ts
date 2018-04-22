import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-dashboard-items',
  template: `
<div class="container">


  <div class="card" style="padding:15px 15px; padding-bottom:10px; padding-top:10px; 
  margin-bottom:20px;display: block; " *ngFor="let item of data">
 
  <img src="/assets/profile1.png" (click) = "goToUser(item._id)">
  <span> <b> {{ item.username }} </b> </span>
  <div style="float:right;padding-top:20px;"><Button (click)="goToUser(item.username)" class="btn btn-danger btn-sm">View </Button></div>
</div>
`
 
})
export class ViewUsersComponent {
  data =[];
  constructor(private http: HttpClient,private router: Router){}
  ngOnInit() 
  {
    var config = {
      headers : 
      {
          'Content-Type':'application/json',
          "id":JSON.parse(localStorage.getItem("userProps"))["_id"]
      }
  }
        this.http.get(environment.apiUrl+'admin/getUsers',config).
       subscribe(res =>{this.data=res["data"]});     
  }

  goToUser(username:string)
  {
     this.router.navigate(["/user/profile/"+username]);
   }



}
