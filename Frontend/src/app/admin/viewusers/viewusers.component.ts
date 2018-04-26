import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

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
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService){}
  ngOnInit() 
  {
    var config = {
      headers : 
      {
          'Content-Type':'application/json',
          "id":JSON.parse(localStorage.getItem("userProps"))["_id"],
          'authorization':localStorage.getItem('UserDoc')
      }
  }
        this.http.get('http://localhost:3000/api/admin/getUsers',config).
       subscribe(res =>{this.data=res["data"]}
       ,err=>{
        this.toastr.error("",err.error["msg"]);
        if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
            localStorage.clear();
            this.router.navigateByUrl("/search/searchresults")
          }     
           }
        );     
  }

  goToUser(username:string)
  {
     this.router.navigate(["/user/profile/"+username]);
   }



}
