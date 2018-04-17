import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-cp',
  templateUrl: `controlpanel.html`
 
})
export class ControlPanelComponent {
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
        this.http.get('http://localhost:3000/api/admin/getUsers',config).
       subscribe(res =>{this.data=res["data"]});     
  }

  goToUser(ident:string)
  {
     this.router.navigate(["/admin/profile/"+ident]);
   }



}
