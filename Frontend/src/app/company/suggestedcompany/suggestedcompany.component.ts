import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
//Contributers : khaled abo el naga
//Methods:Add Suggested Company
//Data modified:5/5/2018

@Component({
    selector: 'app-dashboard-items-addcompany',
    templateUrl: 'suggestedcompany.html'
})
export class SuggestedcompanyComponent implements OnInit {
    errorHandle = "";
    tags: any = [];
    isSubmitted = false;

    myForm: FormGroup;
    constructor(private http: HttpClient, private router: Router) { }


    onSubmit(companyForm) {
        this.isSubmitted = true;
        var result = this.tags.map(function (val) {
            return val.displayValue;
        }).join(',');

        var my = JSON.stringify
            ({
                // userid:localStorage.getItem("user"),
                name: companyForm.companyname,
                email: companyForm.companyemail,
                website: companyForm.companywebsite,
                tags: result,
                type: companyForm.companytype,
                userid: JSON.parse(localStorage.getItem("userProps"))["_id"]
            });
        var config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        this.http.post(environment.apiUrl + 'suggestedcompany/addSuggestedCompany', my, config)
            .subscribe(res => {
                this.router.navigateByUrl('/');
            }
                , err => {
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
            companytags: new FormControl(null, Validators.required),
            companytype: new FormControl(null, Validators.required)
        });

    }
}
