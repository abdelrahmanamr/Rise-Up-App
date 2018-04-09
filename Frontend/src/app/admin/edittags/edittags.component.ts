import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-admin-edittags',
  template: `
  <div class="container">

<h2>Expert Tags</h2>

<form action="/action_page.php">
  <input type="text" name="tags" style="font-size:18pt;height:100px;width:600px;">
  <br><br>
  <input class="btn btn-primary" type="button" style="margin-bottom:10px;background-color:#DC0C18; width: 200px;" (click)="go()"
  value="DONE">
</form> 

  </div>   

  `
})
export class EdittagsComponent implements OnInit{
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
     go(){
        window.location.replace("#/admin/profile")

     }
     
    }
    