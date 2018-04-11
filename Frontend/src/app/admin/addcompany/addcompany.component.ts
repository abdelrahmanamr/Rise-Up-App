import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard-items-addcompany',
  template: `

  <div class="container" style="background-color: #FFF; color:black; padding-top:20px; padding-bottom:20px;">
  <form class="container" #companyForm="ngForm" (ngSubmit) = "onSubmit(companyForm.value)">


  <label for="companyname">Company Name</label><br />
  <input type = "text" class="form-control" name = "companyname" ngModel>
  <br>


  <label for="companyprice">Company Email</label>
  <input type = "text" class="form-control" name = "companyemail"  ngModel>
  <br>

  <label for="companywebsite">Company Website</label>
  <input type = "text" class="form-control" name = "companywebsite"  ngModel>
  <br>

  <label for="companytags">Company Tags</label>
  <input type = "text" class="form-control" name = "companytags"  ngModel>
  <br>

  <label for="companytype">Company Type</label>
  <input type = "text" class="form-control" name = "companytype"  ngModel>
  <br>

  <input class="btn btn-success" type = "submit" value = "submit">
  {{errorHandle}}
  </form>
  <br />


  </div>
`
})
export class AddcompanyComponent implements OnInit{
errorHandle = "";

    constructor(private http: HttpClient,private router: Router){}


    onSubmit(companyForm){


var my = JSON.stringify
({  
    // userid:localStorage.getItem("user"),
    name:companyForm.companyname,
    email:companyForm.companyemail,
    website:companyForm.companywebsite,
    tags:companyForm.companytags,
    type:companyForm.companytype
});

console.log(my);
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        this.http.post(environment.apiUrl+'admin/addCompany',my, config)
        .subscribe(res => {console.log(res)
         var tags =   res["data"]["tags"];
         var JSONtoIndex = {
             "name":tags,
             "object":res["data"],
             "type":"Company"
         }
         this.http.post(environment.apiUrl+'search/addToIndex',JSONtoIndex,config)
         .subscribe(res =>{console.log(res)
            this.router.navigate(['/admin']);

        },
        err=>console.log("error adding to index"));
        }
    ,err=>{
        this.errorHandle = err['error']['msg'];
      });
        

    }

    ngOnInit() {
        
        
}}