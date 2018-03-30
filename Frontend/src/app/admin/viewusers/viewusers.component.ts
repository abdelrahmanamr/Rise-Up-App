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
              <th scope="col">Username</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">   </th>
          </tr>
          </thead>
      <tbody>
          
          <tr *ngFor="let item of data">
          
         
  
              <td>{{item.username}}</td>
              <td>{{item.firstname}}</td>
              <td>{{item.lastname}}</td>
              <td>  <a  (click) = "goToUser(item._id)">View user</a></td>

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
