import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-items-viewSuggestedCompanies',
  templateUrl: 'viewSuggestedCompanies.html'
})
export class ViewSuggestedCompaniesComponent implements OnInit
{


suggestedcompany : any;
user = null;

  constructor(private httpClient: HttpClient, private router: Router) { }
  public suggestedCompanies:any[]=[];

    ngOnInit()
    {
      this.httpClient.get(environment.apiUrl +'Company/viewCompanies').subscribe(
        res=>{  
          this.suggestedCompanies=res['data'];
          this.suggestedCompanies.forEach(suggestedCompanies => {
            suggestedCompanies.tags=suggestedCompanies.tags.split(",");
          });
       }
      );
    }

    Approve(ident:string)
    {
      var config = {
        headers : {
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('UserDoc')
        }
    }
       this.httpClient.get(environment.apiUrl+'suggestedcompany/viewSuggestedCompany/'+ident,config).
        subscribe(res=>{
        this.suggestedcompany = res['data'];
        this.user = JSON.parse(localStorage.getItem("userProps"));
        this.suggestedcompany['userid'] = this.user['_id'];
        this.httpClient.post(environment.apiUrl+'suggestedcompany/addSuggestedCompany',this.suggestedcompany,config).subscribe(res=>{
      
        });
        this.suggestedcompany['status'] = 1;
        this.httpClient.patch(environment.apiUrl+'suggestedcompany/updateSuggestedCompany/'+ident,this.suggestedcompany,config).subscribe(res=>{
          this.router.navigateByUrl('/admin/viewSuggestedCompanies');
        });
       });
    }

    Disapprove(ident:string)
    {
      console.log("frontend");
      console.log(ident);
      
      var config = {
        headers : {
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('UserDoc')
        }
    }
       this.httpClient.get(environment.apiUrl+'suggestedcompany/viewSuggestedCompany/'+ident,config).
        subscribe(res=>{
        this.suggestedcompany = res['data'];
        this.user = JSON.parse(localStorage.getItem("userProps"));
        this.suggestedcompany['userid'] = this.user['_id'];
        this.httpClient.post(environment.apiUrl+'suggestedcompany/addSuggestedCompany',this.suggestedcompany,config).subscribe(res=>{
      
        });
        this.suggestedcompany['status'] = -1;
        this.httpClient.patch(environment.apiUrl+'suggestedcompany/updateSuggestedCompany/'+ident,this.suggestedcompany,config).subscribe(res=>{
          this.router.navigateByUrl('/admin/viewSuggestedCompanies');
        });
       });
    }
  
        
}