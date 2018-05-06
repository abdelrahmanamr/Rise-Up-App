import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
/*  Contributers : Saleh Elhadidy,Loai Alaa
    Methods : ngOnInit,onSubmit
    Date Edited : 5/5/2018
*/
@Component({
    selector: 'app-user-login',
    styles:
        ['#left {  float: left; width: 40%;overflow: hidden; }',
            '#right {  float: right; width: 60%;overflow: hidden; }'
        ],
    template: `
      <div class="container" *ngIf="errorView == 'Expired'">

          <label  style="font-size: 20px;;font-weight: bold;">
              This link has expired!

          </label>
          
      </div>
      
      
      <form *ngIf="errorView != 'Expired'" class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
          <label  style="font-size: 55px;;font-weight: bold;">
             Reset your password!

          </label>
  <input type = "password" class="form-control" name = "password" placeholder = "New Password" style="width: 300px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;  "ngModel>
  <br>
  <br>
          
          
          
          <div id="right">
  <input class="btn btn-success" type = "submit" value = "Reset" style="background-color:#DC0C18">   {{errorView}}  
      </div>
      
  </form>
  <br /> 
  `
})
export class ResetComponent implements OnInit {
    errorView = "";
    url = "";
    final = "";
    message = ""
    expire: boolean = false;
    ngOnInit() {
        if(localStorage.getItem('userProps')){
            this.router.navigateByUrl('/');
        }
        this.url = this.router.url;
        this.final = this.url.substr(this.url.lastIndexOf('/') + 1)
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        this.http.get(environment.apiUrl + 'user/expire/' + this.final, config)
            .subscribe(res => {
                this.message = res["msg"];

            }, err => {

                this.errorView = err.error["msg"];
            }
            );


    }
    constructor(private http: HttpClient, private router: Router,
        private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
        this.url = this.router.url;
        this.final = this.url.substr(this.url.lastIndexOf('/') + 1)
    }

    onSubmit = function (user) {
        var data = JSON.stringify({ password: user.password })

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        this.http.patch(environment.apiUrl + 'user/reset/' + this.final, data, config)
            .subscribe(res => {
                let message = res["msg"];
                if (message == "Success") {

                    this.router.navigate(["/search"]);


                }

            }, err => {
                this.toastr.error("", err.error["msg"]);
                this.errorView = err.error["msg"];
            }
            );


    }


}
