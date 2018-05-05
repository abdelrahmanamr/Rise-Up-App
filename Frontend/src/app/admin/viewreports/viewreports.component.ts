import {ElementRef,Component, OnInit , ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard-items',
  templateUrl: `viewreports.html`
})
export class ViewReportsComponent {

    public reports:any[]=[];
    adminStatus:boolean = false;
    View:number;

    constructor(private http: HttpClient,private httpClient: HttpClient,private router: Router,
                private toastr: ToastrService) { }

    ngOnInit() {


        if(localStorage.getItem("UserDoc")!=null){
            this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
        }

this.ViewContents();
    }

    ViewContents(){
        var config = {
            headers : 
            {
                'Content-Type':'application/json',
                "id":JSON.parse(localStorage.getItem("userProps"))["_id"],
                'authorization':localStorage.getItem('UserDoc')
            }
        }

        this.httpClient.get(environment.apiUrl +'admin/viewAllReports',config).subscribe(
            res=>{
                this.reports = res['data'];


            } , err=>{
                this.toastr.error("",err.error["msg"]);
                if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
                  localStorage.clear();
                  this.router.navigateByUrl("/search/searchresults")
                }
              }
        );
    }
   deleteComment(id: string){
        var config = {
            headers :
                {
                    'Content-Type':'application/json',
                    'authorization':localStorage.getItem('UserDoc')
                }
        }
        this.httpClient.delete(environment.apiUrl+'/Content/deleteComment/'+id,config).
        subscribe(res=>{

            window.location.reload();
        },err=>{
            this.toastr.error("",err.error["msg"]);
            if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
                localStorage.clear();
                this.router.navigateByUrl("/search/searchresults")
              }        });
    };


    viewProfile(ID:String){

        this.router.navigate(['/user/profile/'+ID]);




    }

}
