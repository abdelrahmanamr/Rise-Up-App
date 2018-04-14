import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-login',
    styles:
        ['#left {  float: left; width: 40%;overflow: hidden; }',
            '#right {  float: right; width: 60%;overflow: hidden; }'
        ],
  template: `
      
      <form class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
          <label  style="font-size: 55px;;font-weight: bold;">
              Forgot your password!

          </label>
  <input type = "text" class="form-control" name = "email" placeholder = "Enter your Email" style="width: 300px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;  "ngModel>
  <br>
  <br>
          
          
          
          <div id="right">
  <input class="btn btn-success" type = "submit" value = "Submit my Email" style="background-color:#DC0C18">   {{errorView}}  
      </div>
      
  </form>
  <br /> 
  `
})
export class ForgotComponent implements OnInit {
errorView = "";
  constructor(private http: HttpClient,private router: Router, private toastr: ToastrService){

  }
  ngOnInit(){
    if(localStorage.getItem('userDocs')!=null ||localStorage.getItem('userProps')!=null){
      this.router.navigate(["/search"]);
    }
  }

onSubmit = function(user){
  var data = JSON.stringify({email:user.email})

var config = {
    headers : {
        'Content-Type': 'application/json'
    }
}

this.http.post('http://localhost:3000/api/user/forgetPassword', data, config)
.subscribe(res=>{
  //console.log(res["data"]);
    let message = res["msg"];
    if(message == "Success"){

        this.router.navigate(["/search"]);


    }

  },err=>{
    this.toastr.error("",err.error["msg"])
    this.errorView = err.error["msg"];
    console.log(err.error["msg"]);
  }
);


}


}
