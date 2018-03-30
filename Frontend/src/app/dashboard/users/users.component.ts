import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-items',
  template: `<!DOCTYPE html>
  <html ng-app>
  <head>
   <style>
  #products {
      font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
  }
   #products td, #products th {
      border: 1px solid #ddd;
      padding: 8px;
  }
   #products tr:nth-child(even){background-color: #f2f2f2;}
   #products tr:hover {background-color:black;}
   #products th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: center;
      background-color: #337ab7;
      color: #fce100;
      font-size:25px;
  }
  .btn {
      background-color: DodgerBlue;
      border: none;
      color: #fce100;
      padding: 12px 16px;
      width:100%;
      font-size: 16px;
      cursor: pointer;
  }
   /* Darker background on mouse-over */
  .btn:hover {
      background-color: #fce100;
  }
  </style>
  </head>
  <body>

   <table id="products" style="width:100%;">
   <tr>
    <th>Username</th>
    </tr>

  <tr *ngFor="let item of data">
    <td><button type="button" class="btn btn-primary" (click)="goToUser(item._id)">{{item.username}}</button></td>
    </tr>
  </table>
  
  </body>
  </html>`
 
 
})
export class UsersComponent {
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
     window.location.replace("#/dashboard/profile");
   }



}
