import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as JWT from 'jwt-decode';
@Component({
  selector: 'app-user-login',
    styles:
        ['#left {  float: left; width: 40%;overflow: hidden; }',
            '#right {  float: right; width: 60%;overflow: hidden; }'
        ],
  template: `
      
      <form class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
          <label  style="font-size: 55px;;font-weight: bold;">
              Login!

          </label>
  <input type = "text" class="form-control" name = "username" placeholder = "Enter your Username/Email" style="width: 300px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;  "ngModel>
  <br>
  <input type = "password" class="form-control" name = "password" placeholder = "Enter your password" style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top: 10px;" ngModel>
  <br>
          <div id="left">
              <label  style="font-size: 15px;;font-weight: bold;">
                 Not registered?
              </label>

              <a href="#/user/register" style="padding-right:5px ;color: #DC0C18">Create your account</a>
              <br> <br />
              <a href="#/user/forgot" style="padding-right:5px ;color: #DC0C18">Forgot your password?</a>
              
              
          </div>
          
          
          <div id="right">
  <input class="btn btn-success" type = "submit" value = "Login" >   {{errorView}}  
      </div>
      
  </form>
  <br /> 
  `
})
export class LoginComponent{
errorView = "";
    url="";
    final="";
  constructor(private http: HttpClient,private router: Router,  private activatedRoute: ActivatedRoute,
    private toastr: ToastrService){
      this.url = this.router.url;
      this.final = this.url.substr(this.url.lastIndexOf('/') + 1)
      console.log(this.final);
  }

onSubmit = function(user){
  var data = JSON.stringify({username:user.username,password:user.password})

var config = {
    headers : {
        'Content-Type': 'application/json'
    }
}

this.http.post(environment.apiUrl+'user/login', data, config)
.subscribe(res=>{
  //console.log(res["data"]);
  let token = res["data"];
  var payload = null
  var temp = null
    if (token) {
        // set token property
        this.token = token;
        // store username and jwt token in local storage to keep user logged in between page refreshes

        this.error = "Login successful";
        console.log(token);
        localStorage.setItem("UserDoc",token);
        console.log(localStorage.getItem("UserDoc"));
        payload = token.split('.')[1];
        temp = JWT(token);
        localStorage.setItem('userProps', JSON.stringify(temp["user"]));

     //  console.log(JSON.parse(localStorage.getItem("user"))["username"]);

        this.router.navigate(["/search"]);
    }
  },err=>{
    this.errorView = err.error["msg"];
    this.toastr.error("",err.error["msg"]);
        console.log(err.error["msg"]);
  }
);


}


}
