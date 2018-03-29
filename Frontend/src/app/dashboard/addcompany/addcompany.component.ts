import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard-items-addcompany',
  template: `

  <div class="col-md col-md-offset-2">
  <form [formGroup]="myForm" class="container" #userForm="ngForm" (ngSubmit) = "onSubmit(userForm.value)">
          <div class="form-group">
          
          <div>
                  <label for="name">Name</label>
                  <input type="text" id="name" class="form-control"
                         formControlName="Name" ngModel></div>
                         <div>
                         <label for="email">Email</label>
                         <input type="email" id="email" class="form-control"
                                min="0" formControlName="Email" ngModel></div>

                                <div>
                                <label for="website">Website</label>
                                <input type="url" id="website" class="form-control"
                                       min="0" formControlName="Website" ngModel></div>  
                                       <div>
                                       <label for="tags">Tags</label>
                                       <input type="text" id="tags" class="form-control"
                                              min="0" formControlName="Tags" ngModel></div>
       
                                              <div>
                                              <label for="type">Type</label>
                                              <input type="text" id="type" class="form-control"
                                                     min="0" formControlName="Type" ngModel></div>
                                                     <div>
       
       
                                          <label for="views">Views</label>
                                    <input type="number" id="views" class="form-control"
                             min="0" formControlName="Views" ngModel></div>      
                    
       
       








          </div>
          
          <button class="btn btn-primary" [disabled]="!myForm.valid" type="submit">Add Company</button>
      </form>
  </div>
`
})
export class AddcompanyComponent implements OnInit{


    myForm: FormGroup;

    constructor(private http: HttpClient,private router: Router){}

   

    onSubmit(user){
var my = JSON.stringify
({name:user.Name,
    email:user.Email,
    website:user.Website,
    type:user.Type,
    tags:user.Tags,
    views:user.Views,


})

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        this.http.post(environment.apiUrl+'/admin/addCompany',my, config)
        .subscribe((info:any) => {console.log(info);});
        
        window.location.replace("#/dashboard/items");
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            Name: new FormControl(null, Validators.required),
            Email: new FormControl(null, Validators.required),
            Website: new FormControl(null, Validators.required),
            Tags: new FormControl(null, Validators.required),
            Views: new FormControl(null, Validators.required),


        });
}}