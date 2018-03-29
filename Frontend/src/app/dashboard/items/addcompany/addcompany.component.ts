import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard-items-addcompany',
  template: this.newMethod()
})
export class AddcompanyComponent implements OnInit{


    myForm: FormGroup;

    constructor(private http: HttpClient,private router: Router){}

    private newMethod(): string {
        return `\

  <div class="col-md col-md-offset-2">
  <form [formGroup]="myForm" class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
          <div class="form-group">
              <div>
                  <label for="name">Name:</label>
                  <input type="text" id="name" class="form-control"
                         formControlName="NameField" ngModel></div>

              
              <div>
                  <label for="email">Email:</label>
                  <input type="text" id="email" class="form-control"
                         min="0" formControlName="EmailField" ngModel></div>

              <div>
                  <label for="website">Website:</label>
                  <input type="text" id="website" class="form-control"
                         formControlName="WebsiteField" ngModel>
              </div>
              <div>
              <label for="type">Type:</label>
              <input type="number" id="type" class="form-control"
                     min="0" formControlName="TypeField" ngModel></div>
              <div>
                  <label for="tags">Tags:</label>
                  <input type="text" id="tags" class="form-control"
                         min="0" formControlName="TagsField" ngModel></div>

                         <div>
                         <label for="views">Views:</label>
                         <input type="number" id="views" class="form-control"
                                min="0" formControlName="ViewsField" ngModel></div>
       
          </div>
          <button class="btn btn-primary" [disabled]="!myForm.valid" type="submit">Add Company</button>
      </form>
  </div>
  `;
    }

    onSubmit(user){
var my = JSON.stringify
({name:user.NameField,
    email:user.EmailField,
    website:user.WebsiteField,
    type:user.TypeField,
    tags:user.TagsField,
    views:user.ViewsField,


})

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        this.http.post(environment.apiUrl+'/companies/addCompany',my, config)
        .subscribe((info:any) => {console.log(info);});
        
        //window.location.replace("#/dashboard/items");
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            NameField: new FormControl(null, Validators.required),
            EmailField: new FormControl(null, Validators.required),
            WebsiteField: new FormControl(null, Validators.required),
            TagsField: new FormControl(null, Validators.required),
            ViewsField: new FormControl(null, Validators.required),


        });
}}