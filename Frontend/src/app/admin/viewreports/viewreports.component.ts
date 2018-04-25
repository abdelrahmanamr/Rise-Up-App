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

        this.httpClient.get(environment.apiUrl +'admin/viewAllReports').subscribe(
            res=>{
                this.reports = res['data'];


            }
        );
    }
   deleteComment(id: string){
        var config = {
            headers :
                {
                    'Content-Type':'application/json'
                }
        }
        this.httpClient.delete(environment.apiUrl+'/admin/deleteComment/'+id,config).
        subscribe(res=>{

            window.location.reload();
        },err=>{
            this.toastr.error("",err.error["msg"]);
            console.log(err);
        });
    };


    viewProfile(ID:String){

        this.router.navigate(['/user/profile/'+ID]);




    }

}
