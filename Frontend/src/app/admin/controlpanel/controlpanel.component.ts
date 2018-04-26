import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-cp',
  templateUrl: `controlpanel.html`
 
})
export class ControlPanelComponent {
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
       subscribe(res =>{this.data=res["data"]},
       err=>{
        this.toastr.error("",err.error["msg"]);
        if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
          localStorage.clear();
          this.router.navigateByUrl("/search/searchresults")
        }
      });     
  }

  goToUser(ident:string)
  {
     this.router.navigate(["/admin/profile/"+ident]);
   }



}
