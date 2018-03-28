import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

ID:string=localStorage.getItem("contentID");
Content : any



  constructor(private httpClient: HttpClient,private router: Router) { }


  ngOnInit() { 
    this.GetContent(this.ID) ;
      }


  GetContent(ID:string){
        var config ={
      headers : 
    {
  'Content-Type':'application/json'
    }
  }
    this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
      res=>{  
      if(res['data'].type== "post"){
        this.ViewText(this.ID)
      }   
      
      if(res['data'].type== "image"){
        this.ViewImage(this.ID)
      }  
      if(res['data'].type== "link"){
        this.ViewLink(this.ID)
      }  
          
      }
    );
 }

     ViewText(ID:String){
      var config ={
        headers : 
      {
    'Content-Type':'application/json'
      }
    }
      this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
        res=>{  
          this.Content = res['data'];  
            
        }
      );
     }

     ViewImage(ID:string){}

     ViewLink(ID:string){}

}
