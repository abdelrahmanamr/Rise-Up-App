import { Component,OnInit } from '@angular/core';
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
  <label  style="font-size: 50px;;font-weight: bold;">
      Change Your Password!

  </label>
  <input type = "password" class="form-control" name = "oldpassword" placeholder = "Enter your current password" style="width: 300px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;  "ngModel>
  <br>
<input type = "password" class="form-control" name = "newpassword" placeholder = "Enter your new password" style="width: 300px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;  "ngModel>
<br>
<label  style="font-size: 25px;;font-weight: bold;">
Password Must Atleast be 6 characters long
</label>
<input type = "password" class="form-control" name = "confirmpassword" placeholder = "Confirm your new password" style="width: 250px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top: 10px;" ngModel>
<br>
  <div id="left">
  </div>
  
  
  <div id="right">
<input class="btn btn-success" type = "submit" value = "Confirm" style="background-color:#DC0C18">   {{errorView}}  
</div>

</form>
<br /> 
`
})
export class ChangePasswordComponent implements OnInit{
errorView = "";
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService){

  }
  ngOnInit(){
    if(localStorage.getItem('userProps')==null){
      this.router.navigateByUrl("/");
    }
  }

onSubmit = function(user){
  var data = JSON.stringify({newpassword:user.newpassword,
confirmpassword:user.confirmpassword,oldpassword:user.oldpassword});
var id = JSON.parse(localStorage.getItem("userProps"))["_id"];

var config = {
    headers : {
        'Content-Type': 'application/json'
    }
}

this.http.patch(environment.apiUrl+'user/ChangePassword/'+id, data, config)
.subscribe(res=>{
  console.log(res["data"]);

        this.router.navigateByUrl("/");


  },err=>{
    this.toastr.error("",err.error["msg"]) 
    this.errorView = err.error["msg"];
    console.log(err.error["msg"]);
  }
);


}


}
