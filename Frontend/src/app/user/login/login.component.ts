import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";
@Component({
  selector: 'app-user-login',
  template: `<form class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
  <input type = "text" class="form-control" name = "username" placeholder = "Enter your Username/Email" ngModel>
  <br>
  <input type = "password" class="form-control" name = "password" placeholder = "Enter your password" ngModel>
  <br>
  <input class="btn btn-success" type = "submit" value = "submit">
  </form>
  <br /> `
})
export class LoginComponent{

  constructor(private http: HttpClient,private router: Router){

  }

onSubmit = function(user){
  var data = JSON.stringify({username:user.username,password:user.password})

var config = {
    headers : {
        'Content-Type': 'application/json'
    }
}

this.http.post('http://localhost:3000/api/user/login', data, config)
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
        payload = window.atob(payload);
        temp = JSON.parse(payload);
        localStorage.setItem("isAdmin",temp["user"].admin);
        localStorage.setItem("isBlocked",temp["user"].blocked);
        localStorage.setItem("Name",temp["user"].username);
        this.router.navigate(["/dashboard"]);
    }
  },err=>{
    console.log(err.error["msg"]);
  }
);
  
  
}


}