import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dashboard-items-addcompany',
    templateUrl: 'addcompany.html'
})
export class AddcompanyComponent implements OnInit {
    errorHandle = "";
    tags: any = [];


    myForm: FormGroup;
    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }


    onSubmit(companyForm) {
        var result = this.tags.map(function (val) {
            return val.displayValue;
        }).join(',');


        var newCompany = JSON.stringify
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
                'authorization': localStorage.getItem('UserDoc')
            }
        }

        this.http.post(environment.apiUrl + 'admin/addCompany', newCompany, config)
            .subscribe(res => {
                var tags = res["data"]["tags"];
                var JSONtoIndex = {
                    "tags": tags,
                    "objectId": res["data"]["_id"],
                    "name": res["data"]["name"]
                }
                this.http.post(environment.apiUrl + 'search/addToCompanyIndex', JSONtoIndex, config)
                    .subscribe(res => {
                        this.router.navigate(['/admin']);

                    },
                        err => { });
            }
                , err => {
                    this.toastr.error("", err.error["msg"]);
                    if (err.error["msg"] == "Login timed out, please login again." || err.error["msg"] == 'You have to login first before you can access this URL.') {
                        localStorage.clear();
                        this.router.navigateByUrl("/search/searchresults")
                    }
                }
            );


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