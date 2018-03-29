import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

ID:string=localStorage.getItem("contentID");
Content : any;
Title:any
Title1:any
base64Image: string;

  constructor(private httpClient: HttpClient,private router: Router,private domSanitizer: DomSanitizer) { }


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
      if(res['data'].type== "Post"){
        this.ViewText(this.ID)
      }   
      
      if(res['data'].type== "Image"){
        this.ViewImage(this.ID)
      }  
      if(res['data'].type== "Link"){
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
          this.Content = res['data'].body;  
            
        }
      );
     }

     

     ViewLink(ID:string){
      var config ={
        headers : 
      {
    'Content-Type':'application/json'
      }
    }
      this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
        res=>{  
          this.Title1=res['data'].title
          this.Title = res['data'].body;  
            
        }
      );
     }

     ViewImage(ID:string){
      var config ={
        headers : 
      {
    'Content-Type':'application/json'
      }
    }
      this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
        res=>{  
         this.ReadImage(res['data'].body);  
            
        }
      );
     }

     ReadImage(inputValue: any): void {
      var file: File = inputValue.files[0];
      var myReader: FileReader = new FileReader();
  
      myReader.onloadend = (e) => {
        this.base64Image = myReader.result;
        console.log(this.base64Image);
      }
      myReader.readAsDataURL(file);
    }
  


}
