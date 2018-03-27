import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  public contents:any[]=[];
  
  constructor(private httpClient: HttpClient) { }

ngOnInit() {
  this.ViewContents();
  }

  ViewContents(){
    this.httpClient.get(environment.apiUrl +'content/viewContents').subscribe(
      res=>{  
        this.contents = res['data'];       
      }
    );
    console.log(this.contents);
    console.log("fady")
  }
 
 

}
