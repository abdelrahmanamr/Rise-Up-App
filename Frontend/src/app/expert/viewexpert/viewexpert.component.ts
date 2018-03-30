import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
@Component({
  selector: 'app-expert-viewexpert',
  template: `
  <div class="container">
  <span> <div [innerHTML]="Expert"></div></span>
  </div>`
})
export class ViewExpertComponent {
  ID:string=localStorage.getItem("expertID");
Expert:any
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
      this.Expert = res['data'].firstname;  
        
    }
  );
 }

}
