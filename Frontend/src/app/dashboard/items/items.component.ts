import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-items',
  template: `\`\
  <!DOCTYPE html>
  
<html ng-app>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Add icon library -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<style>
#products {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
#products td, #products th {
    border: 1px solid #ddd;
    padding:12px;
}
#products tr:nth-child(even){background-color: 	white;}
#products tr:hover {background-color: 	#8B0000;}
#products th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #8B0000	;
    color: white;
}
.btn {
    background-color: #8B0000;
    border: black;
    color: white;
    padding: 20px 20px;
    font-size: 20px;
    cursor: pointer;
    
}
/* Darker background on mouse-over */
.btn:hover {
    background-color: black;
}
</style>
</head>
<body>
  
<table id="products">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Website</th>
    <th>Tags</th>
    <th>Type</th>
    <th>Views</th>
    <th>Created At</th>
    <th></th>
  </tr>
  
<tr *ngFor="let item of data">
  <td>{{item.name}}</td>
  <td>{{item.email}}</td>
  <td>{{item.website}}</td>
  <td>{{item.tags}}</td>
  <td>{{item.type}}</td>
  <td>{{item.view}}</td>
  <td><button type="button" class="btn btn-default" (click)="delete(item._id)">Delete</button></td>
  </tr>
</table>
<button type="button" style="width:10" class="btn btn-default" (click)="add()">Add A Company</button>
</body>
</html>`
})
export class ItemsComponent {
  data =[];
  constructor(private http: HttpClient,private router: Router){}

  ngOnInit() 
  {
       this.http.get(environment.apiUrl+'admin/viewCompanies').
       subscribe(res =>{this.data=res["data"]});
  }
  
  
  add()
  {
    window.location.replace("#/dashboard/addcompany");
    
  }
  delete(ident:string)
  {
    var config = {
                  headers : 
                  {
                      'Content-Type':'application/json'
                  }
              }
    this.http.delete('http://localhost:3000/api/admin/removeCompany/'+ident,config).
    subscribe();
    window.location.reload();
  }
}