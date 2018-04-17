import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard-items-addcompany',
  templateUrl: 'addcompany.html'
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
    type:companyForm.companytype,
    userid:JSON.parse(localStorage.getItem("userProps"))["_id"]
});

console.log(my);
        var config = {
            headers : {
                'Content-Type': 'application/json',
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