import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-content-suggestedcontent',
  templateUrl: 'suggestedcontent.thml'
})
export class SuggestedContentComponent {
  public contents:any[]=[];
  
  constructor(private httpClient: HttpClient,private router: Router,
    private toastr: ToastrService) { }

ngOnInit() {
  this.ViewContents();
  }
  ViewContents(){
    
    this.httpClient.get(environment.apiUrl +'suggestedcontent/viewSuggestedContents').subscribe(
      res=>{ 
        for(var i = 0 ; i <res['data'].length;i++){
          if(res['data'][i].status == 0){
            this.contents.push(res['data'][i]);
          }
        }
        
      }
    );
  }
  ViewContent(ID: string){

    localStorage.setItem("contentID",ID);
    this.router.navigate(['/content/viewsuggestedcontent']);


  }
}
