import {ElementRef,Component, OnInit , ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard-items',
  templateUrl: `viewActivity.html`
})
export class ViewActivityComponent {

    reports:any;
    comm:any;
    adminStatus:boolean = false;
    View:number;

    constructor(private http: HttpClient,private httpClient: HttpClient,private router: Router,
                private toastr: ToastrService) { }

    ngOnInit() {


        if(localStorage.getItem("UserDoc")!=null){
            this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
        }
        this.ViewReport();
        this.ViewComment();
    }

    ViewReport(){

        this.httpClient.get(environment.apiUrl +'admin/getActivityReport').subscribe(
            res=>{
                this.reports = res['data'];
            }
        );
    }
    ViewComment(){

        this.httpClient.get(environment.apiUrl +'admin/getActivityComment').subscribe(
            res=>{
                this.comm = res['data'];
                console.log(this.comm);
            }
        );
    }




}
