import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-cp',
  template: `
  <div class="container">
  <div class="card" style="padding-bottom:10px;margin-bottom:5px;padding-left:9px;">
    <h4>Content Controls:</h4>
    <div>
      <a href="#/content/add"><button class="btn btn-danger"> Add Content </button></a>
      <a href="#/content/viewallcontents"><button class="btn btn-danger"> View All Content </button></a>
      <a href="#/content/suggestedcontent"><button class="btn btn-danger"> View Suggestions </button></a>
    </div>
  </div>
    <div class="card" style="padding-bottom:10px;margin-bottom:5px;padding-left:9px;">
    <h4>Company Controls:</h4>
    <div>
      <a href="#/admin/addcompany"><button class="btn btn-danger"> Add Company </button></a>
      <a href="#/company/viewallcompanies"><button class="btn btn-danger"> View All Companies </button></a>
    </div>
    </div>
    <div class="card" style="padding-bottom:10px;margin-bottom:5px;padding-left:9px;">
    <h4>User Controls:</h4>
    <div>
      <a href="#/admin/viewusers"><button class="btn btn-danger"> View All Users </button></a>
      <a href="#/expert/viewallexperts"><button class="btn btn-danger"> View All Experts </button></a>
    </div>
    </div>


  </div>
`
 
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
