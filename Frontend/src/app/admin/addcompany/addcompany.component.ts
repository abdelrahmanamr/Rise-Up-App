import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard-items-addcompany',
  template: `

      <div class="container" style="background-color: #FFF; color:black; padding-top:20px; padding-bottom:20px;">

          <form class="container" [formGroup]="myForm" #companyForm="ngForm" (ngSubmit)="onSubmit(companyForm.value)">


              <label for="companyname">Company Name</label><br/>
              <input type="text" class="form-control" formControlName="companyname" name="companyname" ngModel>
              <br>


              <label for="companyprice">Company Email</label>
              <input type="text" class="form-control" formControlName="companyemail" name="companyemail" ngModel>
              <br>

              <label for="companywebsite">Company Website</label>
              <input type="text" class="form-control" formControlName="companywebsite" name="companywebsite" ngModel>
              <br>

              <label for="companytags">Company Tags</label>
              <tags-input class="form-control input-lg" formControlName="companytags" type="text"
                          [(ngModel)]="tags" name="tags"></tags-input>
              <br>

              <label for="companytype">Company Type</label>
              <input type="text" class="form-control" formControlName="companytype" name="companytype" ngModel>
              <br>

              <input class="btn btn-success" [disabled]="! myForm.valid" STYLE="background-color: #ff4c6a" type="submit"
                     value="ADD STARTUP">
              {{errorHandle}}
          </form>

          <br/>


      </div>
  `
})
export class AddcompanyComponent implements OnInit{
errorHandle = "";
tags:any=[];


    myForm: FormGroup;
    constructor(private http: HttpClient,private router: Router){}


    onSubmit(companyForm){
        var result = this.tags.map(function(val) {
            return val.displayValue;
        }).join(',');


console.log(result);
var my = JSON.stringify
({  
    // userid:localStorage.getItem("user"),
    name:companyForm.companyname,
    email:companyForm.companyemail,
    website:companyForm.companywebsite,
    tags:result,
    type:companyForm.companytype
});

console.log(my);
        var config = {
            headers : {
                'Content-Type': 'application/json',
                "id":JSON.parse(localStorage.getItem("userProps"))["_id"]
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
        this.myForm = new FormGroup({
            companyname: new FormControl(null, Validators.required),
            companywebsite: new FormControl(null, Validators.required),
            companyemail: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            companytags:new FormControl(null, Validators.required),
            companytype: new FormControl(null, Validators.required)});
        
}}