import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-ViewApplications',
  templateUrl: 'viewapplications.html'
})
export class ViewApplicationsComponent {
  public applications:any[]=[];
  
  constructor(private httpClient: HttpClient,private router: Router,
    private toastr: ToastrService) { }

ngOnInit() {
  this.ViewApplications();
  }
  ViewApplications(){
    var config = {
      headers : {
          'Content-Type': 'application/json',
          'authorization':localStorage.getItem('UserDoc')
      }
  }
    
    this.httpClient.get(environment.apiUrl +'/applyExpert/getApplications',config).subscribe(
      res=>{ 
        for(var i = 0 ; i <res['data'].length;i++){
          if(res['data'][i].status == 0){
            this.applications.push(res['data'][i]);
          }
        }
       console.log(this.applications) 
      },err=>{
        this.toastr.error("",err['error']["msg"]);
        if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
          localStorage.clear();
          this.router.navigateByUrl("/search/searchresults")
        }         }
    );
  }

  Accept(ID:string){

        var config = {
            headers : {
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem('UserDoc')
            }
        }
        var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
        this.httpClient.patch(environment.apiUrl+'/admin/AddExpert/'+ID,data,config)
            .subscribe((info:any) => {
                console.log(info);

                var JSONtoIndex = {
                    "name":info['data']['tags'],
                    "object":info['data'],
                    "type":"User"
                }
                this.httpClient.post(environment.apiUrl+'/search/addToIndex',JSONtoIndex,config).subscribe(res=>{
                    console.log(res);
                    window.location.reload();
                })
            },err=>{
                this.toastr.error("",err['error']["msg"]);
                if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
                  localStorage.clear();
                  this.router.navigateByUrl("/search/searchresults")
                }     
              });
    }
}
