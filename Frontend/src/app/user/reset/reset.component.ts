import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router,ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-user-login',
    styles:
        ['#left {  float: left; width: 40%;overflow: hidden; }',
            '#right {  float: right; width: 60%;overflow: hidden; }'
        ],
  template: `
      
      <form class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
          <label  style="font-size: 55px;;font-weight: bold;">
             Reset your password!

          </label>
  <input type = "text" class="form-control" name = "password" placeholder = "New Password" style="width: 300px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;  "ngModel>
  <br>
  <br>
          
          
          
          <div id="right">
  <input class="btn btn-success" type = "submit" value = "Login" style="background-color:#DC0C18">   {{errorView}}  
      </div>
      
  </form>
  <br /> 
  `
})
export class ResetComponent{
errorView = "";
 url="";
final="";
  constructor(private http: HttpClient,private router: Router,
              private activatedRoute: ActivatedRoute){
      this.url = this.router.url;
      this.final = this.url.substr(this.url.lastIndexOf('/') + 1)
      console.log(this.final);
  }

onSubmit = function(user){
  var data = JSON.stringify({password:user.password})

var config = {
    headers : {
        'Content-Type': 'application/json'
    }
}

this.http.post('http://localhost:3000/api/user/reset/:final', data, config)
.subscribe(res=>{
  //console.log(res["data"]);
    let message = res["msg"];
    if(message == "Success"){

        this.router.navigate(["/search"]);


    }

  },err=>{
    this.errorView = err.error["msg"];
    console.log(err.error["msg"]);
  }
);


}


}
