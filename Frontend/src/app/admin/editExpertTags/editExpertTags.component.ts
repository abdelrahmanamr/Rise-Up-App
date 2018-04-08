import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard-items-editExpertTags',
  template: `

      <div class="container" style="background-color: #FFF; color:black; padding-top:20px; padding-bottom:20px;">

          <form class="container" [formGroup]="myForm" #companyForm="ngForm" (ngSubmit)="onSubmit(companyForm.value)">


              <label for="companyname">Company Name</label><br/>
              <input type="text" class="form-control" formControlName="companyname" name="companyname" ngModel>
              <br>


              <label for="companyprice">Company Email</label>
              <input type="text" class="form-control" formControlName="companyemail" name="companyemail" ngModel>
              <br>

              <label for="companywebsite">Company Website</label>
              <input type="text" class="form-control" formControlName="companywebsite" name="companywebsite" ngModel>
              <br>

              <label for="companytags">Company Tags</label>
              <tags-input class="form-control input-lg" formControlName="companytags" type="text"
                          (onTagsChanged)="onTagsChanged($event)" [(ngModel)]="tags" name="tags"></tags-input>
              <br>

              <label for="companytype">Company Type</label>
              <input type="text" class="form-control" formControlName="companytype" name="companytype" ngModel>
              <br>

              <input class="btn btn-success" [disabled]="! myForm.valid" STYLE="background-color: #ff4c6a" type="submit"
                     value="ADD STARTUP">
              {{errorHandle}}
          </form>

          <br/>


      </div>
  `
})
export class editExpertTagsComponent {

}