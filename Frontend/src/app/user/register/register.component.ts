
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
    <label for="bdate"  style="margin-top:10px;font-family: Georgia;"> Birthdate: </label>

 <input placeholder="Birthdate" formControlName="bDateField" type="date" id="bdate" name="bday" max="1979-12-31" style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:15px; ">
 </div>
      <div>

          <input  class="btn btn-danger"type = "submit" [disabled]="! myForm.valid" value = "Register"style=" margin-top:100px;margin-left:150px;background-color:#DC0C18 ;">

      </div>
      </div>
     <div id="left">


          <div>

              <input placeholder= "Username" type="text" id="uname" style="width: 200px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1; margin-top:10px;" class="form-control"
                     formControlName="userNameField" (blur) = "checkUsername(userForm.value.userNameField)" ngModel></div>


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
                     formControlName="passwordField2" ngModel>
<label for="pass2" style="margin-top:10px;"> Password must atleast be 8 characters long </label>
          </div>
          <div>

              <input placeholder = "Email" type="text" id="email"style="width: 300px;padding: 10px;font-family: Georgia; border: 3px solid black;line-height: 1;margin-top:10px;" class="form-control"
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
          bDateField: new FormControl(null, Validators.required)



});
}
  constructor(private http: HttpClient,private router: Router){

  }

onSubmit = function(user){

    var data = JSON.stringify({
        username: user.userNameField,
          securityQ: user.secQField,
          securityA : user.secAField,
          password: user.passwordField,
            confirmPassword: user.passwordField2,
          firstname: user.firstNameField,
          lastname: user.lastNameField,
        email: user.emailField,
        dateOfBirth:(user.bDateField)
      });


var config = {
    headers : {
        'Content-Type': 'application/json'
    }
};
    this.http.post('http://localhost:3000/api/user/register', data, config)
        .subscribe(res=>{
            console.log(res);
            let message = res["msg"];
            console.log(message);
            this.errorhandle = "Register successful";
            this.router.navigateByUrl("/user/login");
        },err=>{
            console.log(err);
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
  this.http.post('http://localhost:3000/api/user/checkUsername', data, config).subscribe( res =>{
  console.log(res);

  },
err=>{
  console.log(err);
  this.errorhandle = "username already exists";
}
  )
}
}
