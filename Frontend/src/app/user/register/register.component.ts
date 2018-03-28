
import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

          <input placeholder= "Security Question" type="text" id="SQ" style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1; margin-top:15px;" class="form-control"
                 formControlName="secQField" ngModel></div>


      <div>

          <input placeholder= "Security Answer" type="text" id="SA"style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:15px;  " class="form-control"
                 formControlName="secAField" ngModel></div>

      <div>

          <input  class="btn btn-danger"type = "submit" value = "Register"style=" margin-top:200px;margin-left:150px;background-color:#DC0C18 ;">

      </div>
      </div>
     <div id="left">


          <div>

              <input placeholder= "Username" type="text" id="uname" style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1; margin-top:10px;" class="form-control"
                     formControlName="userNameField" ngModel></div>


          <div>

              <input placeholder= "First Name" type="text" id="fname"style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;  " class="form-control"
                     formControlName="firstNameField" ngModel></div>

          <div>

              <input placeholder= "Last Name" type="text" id="lname"style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;" class="form-control"
                     formControlName="lastNameField" ngModel>
          </div>

          <div>

              <input placeholder= "Password" type="password" id="pass"style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;" class="form-control"
                     formControlName="passwordField" ngModel>

          </div>
          <div>

              <input placeholder= "Repeat Password" type="password" id="pass2"style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;" class="form-control"
                     formControlName="passwordField" ngModel>
<label for="pass2" style="margin-top:10px;"> You must enter at least one number,one captial letter and the length is at least 8 characters </label>
          </div>
          <div>

              <input placeholder = "Email" type="text" id="email"style="width: 300px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;" class="form-control"
                     formControlName="emailField" ngModel>
          </div>

<div >
 </div>
</div>
           </div>
  </form>
  `
})
export class RegisterComponent implements OnInit{


    myForm: FormGroup;
    errorhandle = "";

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
          secAField: new FormControl(null, Validators.required),
          secQField: new FormControl(null, Validators.required)



});
}
  constructor(private http: HttpClient,private router: Router){

  }

onSubmit = function(user){

    var data = JSON.stringify({
        username: user.userNameField,
          secQues: user.secQField,
          secAns : user.secAField,
        password: user.passwordField,
        firstname: user.firstNameField,
        lastname: user.lastNameField,
        email: user.emailField});


var config = {
    headers : {
        'Content-Type': 'application/json'
    }
};
    this.http.post(environment.apiUrl+'register', data, config)
        .subscribe(res=>{
            console.log(res);
            let message = res["msg"];
            console.log(message);
            if (message == "Registered successfully"){
            this.errorhandle = "Register successful";
            this.router.navigate(["/user/login"]);}


});


}}
