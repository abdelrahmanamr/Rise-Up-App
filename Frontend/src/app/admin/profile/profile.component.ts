import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';

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
      font-size:15px;
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
   <th>E-mail</th>
   <th>First Name</th>
   <th>Last Name</th>
   <th>Tags</th>
   <th>Admin</th>
   <th>Expert</th>
   <th>Blocked</th>
   <th>ImageURL</th>
   <th>Created At</th>
   <th>Updated At</th>
    </tr>

  <tr>

    <td>{{data.username}}</td>
    <td>{{data.email}}</td>
    <td>{{data.firstname}}</td>
    <td>{{data.lastname}}</td>
    <td>{{data.tags}}</td>
    <td>{{data.admin}}</td>
    <td>{{data.expert}}</td>
    <td>{{data.blocked}}</td>
    <td>{{data.ImageURL}}</td>
    <td>{{data.createdAt}}</td>
    <td>{{data.updatedAt}}</td>
    </tr>
  </table>

  <br>
  <br>
  <br>
  <br>
  <br>
  <p>Admin System ya shabab ;D</p>
  <button type="button" style="width:100%" class="btn btn-primary" (click)="Block()">Block</button>
  <button type="button" style="width:100%" class="btn btn-primary" (click)="UnBlock()">UnBlock</button>
    <button type="button" style="width:100%" class="btn btn-primary" (click)="AddAdmin()">Add admin</button>
   <button type="button" style="width:100%" class="btn btn-primary" (click)="RemoveAdmin()">Remove admin</button>
     <button type="button" style="width:100%" class="btn btn-primary" (click)="AddExpert()">Add expert</button>
   <button type="button" style="width:100%" class="btn btn-primary" (click)="RemoveExpert()">Remove expert</button> 

  </body>
  </html>`
 
 
})
export class ProfileComponent {
    data = {};
  constructor(private http: HttpClient,private router: Router){}

  ngOnInit() 
  {

    var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    var id= sessionStorage.getItem('userId');

    this.http.get('http://localhost:3000/api/admin/getUserById/'+id,config).
    subscribe(res =>{
        console.log(res['data']);
        this.data = res['data'];
    
    });

  }

  Block()
  {
    var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    var id= sessionStorage.getItem('userId');
    this.http.patch(environment.apiUrl+'/admin/blockUser/'+id, config)
    .subscribe((info:any) => {console.log(info);});
  }

  UnBlock()
  {
    var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    var id= sessionStorage.getItem('userId');
    this.http.patch(environment.apiUrl+'/admin/UnblockUser/'+id, config)
    .subscribe((info:any) => {console.log(info);});
  }
    RemoveAdmin()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        var id= sessionStorage.getItem('userId');
        this.http.patch(environment.apiUrl+'/admin/RemoveAdmin/'+id, config)
            .subscribe((info:any) => {console.log(info);});
    }

    RemoveExpert()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        var id= sessionStorage.getItem('userId');
        this.http.patch(environment.apiUrl+'/admin/RemoveExpert/'+id, config)
            .subscribe((info:any) => {console.log(info);});
    }


      AddAdmin()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        var id= sessionStorage.getItem('userId');
        this.http.patch(environment.apiUrl+'/admin/AddAdmin/'+id, config)
            .subscribe((info:any) => {console.log(info);});
    }
    
    
    
    
    
    AddExpert()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        var id= sessionStorage.getItem('userId');
        this.http.patch(environment.apiUrl+'/admin/AddExpert/'+id, config)
            .subscribe((info:any) => {console.log(info);});
    }



}
