import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  public contents:any[]=[];
  Content : any
  constructor(private httpClient: HttpClient,private router: Router) { }

ngOnInit() {
  this.ViewContents();
  }

  ViewContents(){
    this.httpClient.get(environment.apiUrl +'Content/viewContents').subscribe(
      res=>{  
        this.contents = res['data'];       
      }
    );
  }
 

  ViewContent(ID: string){

    localStorage.setItem("contentID",ID);
    this.router.navigate(['/content']);


  //   var config ={
  //     headers : 
  //   {
  // 'Content-Type':'application/json'
  //   }
  // }
  //   this.httpClient.get(environment.apiUrl +'/Content/viewContent/'+ID,config).subscribe(
  //     res=>{  
  //       this.Content = res['data'];       
  //     }
  //   );

  }
 

}
