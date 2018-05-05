

import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-register',
  styles:
   ['#left {  float: left; width: 40%;overflow: hidden; }',
   '#right {  float: right; width: 60%;overflow: hidden; }'
 ]
,
  template: ` <form [formGroup]="myForm"class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">

  <label for="wrapper"  style="font-size: 55px;;font-weight: bold;">
      Register!

  </label>

      <div class="form-group" id="wrapper">
      <div id = "right">
<div>


    <label for="usertags">Please write your tag and press "Enter" to add it,or press "Backspace" to edit it.</label>
    <tags-input class="form-control input-lg" formControlName="usertags" style=" color:#000000; width: 300px;padding: 10px;  border: 3px solid black;line-height: 1;margin-top:10px;" type="text" placeholder="Tags"
                (onTagsChanged)="onTagsChanged($event)" [(ngModel)]="tags" name="tags"></tags-input>
    
    
</div>
      <div>

          <input placeholder= "Security Question" type="text" id="SQ" style="width: 200px;padding: 10px;  border: 3px solid black;line-height: 1; margin-top:15px;" class="form-control"
                 formControlName="secQField" ngModel></div>


      <div>

          <input placeholder= "Security Answer" type="text" id="SA"style="width: 200px;padding: 10px;  border: 3px solid black;line-height: 1;margin-top:15px;  " class="form-control"
                 formControlName="secAField" ngModel></div>
    <div>
    <label for="bdate"  style="margin-top:10px; "> Birthdate: </label>

 <input placeholder="Birthdate" formControlName="bDateField" type="date" id="bdate" name="bday" max="1979-12-31" style="width: 200px;padding: 10px;  border: 3px solid black;line-height: 1;margin-top:15px; ">
 </div>
      <div>
<br />
          <input  class="btn btn-danger"type = "submit" [disabled]="! myForm.valid" value = "Register">

      </div>
      </div>
     <div id="left">


          <div>

              <input placeholder= "Username" type="text" id="uname" style="width: 200px;padding: 10px;  border: 3px solid black;line-height: 1; margin-top:10px;" class="form-control"
                     formControlName="userNameField" (blur) = "checkUsername(userForm.value.userNameField)" ngModel></div>


          <div>

              <input placeholder= "First Name" type="text" id="fname"style="width: 200px;padding: 10px;  border: 3px solid black;line-height: 1;margin-top:10px;  " class="form-control"
                     formControlName="firstNameField" ngModel></div>

          <div>

              <input placeholder= "Last Name" type="text" id="lname"style="width: 200px;padding: 10px;  border: 3px solid black;line-height: 1;margin-top:10px;" class="form-control"
                     formControlName="lastNameField" ngModel>
          </div>

          <div>

              <input placeholder= "Password" type="password" id="pass"style="width: 200px;padding: 10px;  border: 3px solid black;line-height: 1;margin-top:10px;" class="form-control"
                     formControlName="passwordField" ngModel>

          </div>
          <div>

              <input placeholder= "Repeat Password" type="password" id="pass2"style="width: 200px;padding: 10px;  border: 3px solid black;line-height: 1;margin-top:10px;" class="form-control"
                     formControlName="passwordField2" ngModel>
<label for="pass2" style="margin-top:10px;"> Password must atleast be 8 characters long </label>
          </div>
          <div>

              <input placeholder = "Email" type="text" id="email"style="width: 300px;padding: 10px;  border: 3px solid black;line-height: 1;margin-top:10px;" class="form-control"
                     formControlName="emailField" ngModel>
          </div>

<div >
 </div>
</div>
           </div>
           {{errorhandle}}
  </form>


  `
})
export class RegisterComponent implements OnInit{


    myForm: FormGroup;
    tags:any=[];

    onTagsChanged($event){

         

    }


    ngOnInit(){

    this.myForm = new FormGroup({
        userNameField: new FormControl(null, Validators.required),
        firstNameField: new FormControl(null, Validators.required),
        lastNameField: new FormControl(null, Validators.required),
        emailField: new FormControl(null, [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]),
          passwordField: new FormControl(null, Validators.required),
          passwordField2: new FormControl(null, Validators.required),
          secAField: new FormControl(null, Validators.required),
          secQField: new FormControl(null, Validators.required),
          bDateField: new FormControl(null, Validators.required),
          usertags : new FormControl(null, Validators.required)



});
}
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService){

  }

onSubmit = function(user){
    var result = this.tags.map(function(val) {
        return val.displayValue;
    }).join(',');

    var data = JSON.stringify({
        username: user.userNameField,
          securityQ: user.secQField,
          securityA : user.secAField,
          password: user.passwordField,
            confirmPassword: user.passwordField2,
          firstname: user.firstNameField,
          lastname: user.lastNameField,
        tags:result,
        email: user.emailField,
        dateOfBirth:(user.bDateField)
      });


var config = {
    headers : {
        'Content-Type': 'application/json'
    }
};
    this.http.post(environment.apiUrl+'user/register', data, config)
        .subscribe(res=>{
            let message = res["msg"];
            var JSONtoIndex = {
                "tags":res["data"]["tags"],
                "objectId":res["data"]["_id"],
                "username":res["data"]["username"]
            }
            this.errorhandle = "Register successful";
            this.http.post(environment.apiUrl+'search/addToUserIndex',JSONtoIndex,config).subscribe(res=>{
                this.router.navigateByUrl("/user/login");
            });
        },err=>{
            this.toastr.error("",err['error']['msg']);
            this.errorhandle = err['error']['msg'];
        });


}
checkUsername = function(username){
  var data = JSON.stringify({
  username: username
  });
  var config = {
  headers: {
  'Content-Type' : 'application/json'
  }
  };
  this.http.post(environment.apiUrl+'user/checkUsername', data, config).subscribe( res =>{
  this.errorhandle = "";
  },
err=>{
    this.toastr.error("",err['error']['msg']);
  this.errorhandle = "username already exists";
}
  )
}
}
