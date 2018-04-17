import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-admin-edittags',
  template: 'edittags.html'
  
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
    'Content-Type':'application/json',
    "id":JSON.parse(localStorage.getItem("userProps"))["_id"]
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
    