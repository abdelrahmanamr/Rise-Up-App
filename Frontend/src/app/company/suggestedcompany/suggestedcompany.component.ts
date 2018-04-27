import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard-items-addcompany',
  templateUrl: 'suggestedcompany.html'
})
export class SuggestedcompanyComponent implements OnInit{
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
    type:companyForm.companytype,
    userid:JSON.parse(localStorage.getItem("userProps"))["_id"]
});

console.log(my);
        var config = {
            headers : {
                'Content-Type': 'application/json',
            }
        }

        this.http.post(environment.apiUrl+'suggestedcompany/addSuggestedCompany',my, config)
        .subscribe(res => {console.log(res)
         /*this.http.post(environment.apiUrl+'search/addToIndex',JSONtoIndex,config)
         .subscribe(res =>{console.log(res)
            this.router.navigate(['/admin']);

        },
        err=>console.log("error adding to index"));*/
        }
    ,err=>{
        this.errorHandle = err['error']['msg'];
      });
        

    }


    ngOnInit() {
        console.log("form");
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