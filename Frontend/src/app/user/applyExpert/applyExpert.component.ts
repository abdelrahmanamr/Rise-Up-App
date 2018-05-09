import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
/* Contributer : Ahmed Hossam,KarimElghandour
   Methods :onSubmit();
   Date Edited : 5/5/2018
 */
@Component({
  selector: 'app-user-applyExpert',
  styles:
    ['#left {  float: left; width: 40%;overflow: hidden; }',
      '#right {  float: right; width: 60%;overflow: hidden; }'
    ],
  templateUrl:'applyExpert.html'
})
export class ApplyExpertComponent implements OnInit {
  errorView = "";
  user: any;
  alreadyApplied = false;
  applying = false;
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userProps"));
    if(this.user){
      if(this.user['expert']){
        this.alreadyApplied = true;
      }
      this.checkIfApplied();
    }else{
      this.router.navigateByUrl('/');
    }
	}

  onSubmit = function (user) {
    var id = this.user['_id'];

    var data = JSON.stringify({ previousExperience: user.previousExperience, userid: id });

    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.applying= true;

    this.http.post(environment.apiUrl+'applyExpert/createApplyExpert', data, config)
      .subscribe(res => {
        this.router.navigateByUrl("/");
      }, err => {
        this.toastr.error("", err.error["msg"])
        this.errorView = err.error["msg"];
      }
      );


  }

  checkIfApplied(){
    var id = this.user['_id'];
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.http.get(environment.apiUrl+'applyExpert/checkIfApplied/'+id,config)
      .subscribe(res=>{
        this.alreadyApplied = false;
      },err=>{
        this.alreadyApplied = true;
      });

  }
}
