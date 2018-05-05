import { ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-dashboard-items',
    templateUrl: `viewActivity.html`
})
export class ViewActivityComponent {

    reports: any;
    comm: any;
    adminStatus: boolean = false;
    View: number;

    constructor(private http: HttpClient, private httpClient: HttpClient, private router: Router,
        private toastr: ToastrService) { }

    ngOnInit() {


        if (localStorage.getItem("UserDoc") != null) {
            this.adminStatus = JSON.parse(localStorage.getItem('userProps'))['admin'];
        }
        this.ViewReport();
        this.ViewComment();
    }

    ViewReport() {
        var config = {
            headers:
                {
                    'Content-Type': 'application/json',
                    "id": JSON.parse(localStorage.getItem("userProps"))["_id"],
                    'authorization': localStorage.getItem('UserDoc')
                }
        }

        this.httpClient.get(environment.apiUrl + 'admin/getActivityReport', config).subscribe(
            res => {
                this.reports = res['data'];
            }, err => {
                this.toastr.error("", err.error["msg"]);
                if (err.error["msg"] == "Login timed out, please login again." || err.error["msg"] == 'You have to login first before you can access this URL.') {
                    localStorage.clear();
                    this.router.navigateByUrl("/search/searchresults")
                }
            }
        );
    }
    ViewComment() {
        var config = {
            headers:
                {
                    'Content-Type': 'application/json',
                    "id": JSON.parse(localStorage.getItem("userProps"))["_id"],
                    'authorization': localStorage.getItem('UserDoc')
                }
        }

        this.httpClient.get(environment.apiUrl + 'admin/getActivityComment', config).subscribe(
            res => {
                this.comm = res['data'];
            }, err => {
                this.toastr.error("", err.error["msg"]);
                if (err.error["msg"] == "Login timed out, please login again." || err.error["msg"] == 'You have to login first before you can access this URL.') {
                    localStorage.clear();
                    this.router.navigateByUrl("/search/searchresults")
                }
            }
        );
    }




}
