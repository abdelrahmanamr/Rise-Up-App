import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
/*  Contributers : Mohamed Ashraf , Karim Elghandour , Ahmed Hossam
    Methods : ngOnInit , ViewContents , ViewContent
    Date Edited : 5/5/2018
*/
@Component({
  selector: 'app-content-suggestedcontent',
  templateUrl: 'suggestedcontent.html'
})
export class SuggestedContentComponent {
  public contents: any[] = [];

  constructor(private httpClient: HttpClient, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.ViewContents();
  }
  ViewContents() {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('UserDoc')
      }
    }

    this.httpClient.get(environment.apiUrl + 'suggestedcontent/viewSuggestedContents', config).subscribe(
      res => {
        for (var i = 0; i < res['data'].length; i++) {
          if (res['data'][i].status == 0) {
            this.contents.push(res['data'][i]);
          }
        }

      }, err => {
        this.toastr.error("", err['error']["msg"]);
        if (err.error["msg"] == "Login timed out, please login again." || err.error["msg"] == 'You have to login first before you can access this URL.') {
          localStorage.clear();
          this.router.navigateByUrl("/search/searchresults")
        }
      }
    );
  }
  ViewContent(ID: string) {

    localStorage.setItem("contentID", ID);
    this.router.navigate(['/content/viewsuggestedcontent']);


  }
}
