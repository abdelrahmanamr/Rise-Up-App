import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-items',
  template: `
<div class="container">


      <table  id ="table" class="table table-bordered">
          <thead>
          <tr>
              <th style="text-align:center" scope="col">Profile photo</th>
              <th style="text-align:center" scope="col">Username</th>
          </tr>
          </thead>
      <tbody>
          <tr *ngFor="let item of data" title="Click to view this user's information">
              <td style="text-align:center"><img src="/assets/profile1.png" (click) = "goToUser(item._id)"></td>
              <td style="text-align:center" (click) = "goToUser(item._id)">{{item.username}}</td>
          </tr>
          </tbody>
      </table>
</div>
      

   `
 
})
export class ViewUsersComponent {
  data =[];
  constructor(private http: HttpClient,private router: Router){}
  ngOnInit() 
  {
        this.http.get('http://localhost:3000/api/admin/getUsers').
       subscribe(res =>{this.data=res["data"]});     
  }

  goToUser(ident:string)
  {
     sessionStorage.setItem('userId',ident);
     window.location.replace("#/admin/profile");
   }



}
