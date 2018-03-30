import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
@Component({
  selector: 'app-expert-viewexpert',
  template: `
  <div class="container">

  <div class="profile" style="float: left; width: 40%;overflow: hidden;">
  <div class="card">
      <img src="/assets/profile.png" alt="{{expert.username}}" style="width:100%">
      <h1 class="uppercase">{{expert.username}}</h1>
      <h1 class="cap">{{expert.firstname}} {{expert.lastname}}</h1>
      <b *ngIf="expert.expert" style="color: #343ab9">Expert</b>
      <p class="title">{{expert.email}}</p></div>
</div>
  </div>`
})
export class ViewExpertComponent {
  ID:string=localStorage.getItem("expertID");
expert = "";
  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }

  ngOnInit() { 
    this.ViewExpert(this.ID) ;
      }

ViewExpert(ID:String){
  var config ={
    headers : 
  {
'Content-Type':'application/json'
  }
}
  this.httpClient.get(environment.apiUrl +'/User/viewUser/'+ID,config).subscribe(
    res=>{  
      this.expert = res['data'];
        
    }
  );
 }

}
