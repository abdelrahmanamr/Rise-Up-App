import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-items',
  templateUrl: `profile.html`
 
 
})
export class ProfileComponent {
    currentPerson  ={};
    data = {};
    datas = {};
    flag = false;
    tags:any=[];
    check=false;
    Url:String
    ID:any;
    tagFinalA:any;
    username:String;
    permitted = true;
  constructor(private http: HttpClient,private router: Router, private toastr: ToastrService){
    this.Url=window.location.href
    this.username = this.Url.substr(this.Url.lastIndexOf('/') + 1);
    console.log(this.username);
  }


  ngOnInit() 
  {
    var config = {
        headers : {
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('UserDoc')
        }
    }

    this.http.get(environment.apiUrl+'user/getUserByUsername/'+this.username,config).
    subscribe(res =>{
        // console.log(res['data']);
        this.data = res['data'];
        this.currentPerson = res['data'];
        this.ID = this.data['_id'];
        if(this.data['expert']||JSON.parse(localStorage.getItem("userProps"))["admin"]){
            this.permitted=true;
        }else{
            this.permitted=false;
        }
        if(res['data'].tags!=null){
        // this.tags = res['data'].tags.split(",");
        res['data'].tags.split(",").forEach(element => {
            var el = JSON.parse(JSON.stringify({"displayValue":element}));
            console.log(el);
            this.tags.push(el);
        });

          this.data['tags']=this.data['tags'].split(",");
        }


    },err=>{
        this.toastr.error("",err['error']["msg"]);
        if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
          localStorage.clear();
          this.router.navigateByUrl("/search/searchresults")
        }     
      });

  }

  Block()
  {
    var config = {
        headers : {
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('UserDoc')
        }
    }
    var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
    this.http.patch(environment.apiUrl+'/admin/blockUser/'+this.ID,data,config)
    .subscribe((info:any) => {
        console.log(info);
        window.location.reload();
    },err=>{
        this.toastr.error("",err['error']["msg"]);
        if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
          localStorage.clear();
          this.router.navigateByUrl("/search/searchresults")
        }     
      });

  }
    onTagsChanged($event){}

submitTags(){

    var result = this.tags.map(function(val) {
        return val.displayValue;
    }).join(',');
    var config = {
        headers : {
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('UserDoc')
        }
    }
    var data = JSON.stringify({tags:result,userid:JSON.parse(localStorage.getItem("userProps"))["_id"]})

    var id= sessionStorage.getItem('userId');
    this.http.patch(environment.apiUrl+'/admin/UpdateExpertTag/'+this.ID,data, config)
        .subscribe(res=> {
            window.location.reload();
        },err=>{
            this.toastr.error("",err['error']["msg"]);
            if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
              localStorage.clear();
              this.router.navigateByUrl("/search/searchresults")
            }     
          });


    this.flag = true;
}
  UnBlock()
  {
    var config = {
        headers : {
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('UserDoc')
        }
    }
    var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
    this.http.patch(environment.apiUrl+'/admin/UnblockUser/'+this.ID,data,config)
    .subscribe((info:any) => {
        console.log(info);
        window.location.reload();
    },err=>{
        this.toastr.error("",err['error']["msg"]);
        if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
          localStorage.clear();
          this.router.navigateByUrl("/search/searchresults")
        }     
      });

  }
    RemoveAdmin()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem('UserDoc')
            }
        }
        var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
        this.http.patch(environment.apiUrl+'/admin/RemoveAdmin/'+this.ID,data,config)
            .subscribe((info:any) =>
            {console.log(info);
            window.location.reload();
            },err=>{
                this.toastr.error("",err['error']["msg"]);
                if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
                  localStorage.clear();
                  this.router.navigateByUrl("/search/searchresults")
                }     
              });

    }

    RemoveExpert()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem('UserDoc')
            }
        }
        var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
        this.http.patch(environment.apiUrl+'/admin/RemoveExpert/'+this.ID,data,config)
            .subscribe((info:any) => {
                console.log(info);
                window.location.reload();
            },err=>{
                this.toastr.error("",err['error']["msg"]);
                if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
                  localStorage.clear();
                  this.router.navigateByUrl("/search/searchresults")
                }     
              });

    }


      AddAdmin()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem('UserDoc')
            }
        }
        var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
        this.http.patch(environment.apiUrl+'/admin/AddAdmin/'+this.ID,data,config)
            .subscribe((info:any) => {
                console.log(info);
                window.location.reload();
            },err=>{
                this.toastr.error("",err['error']["msg"]);
                if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
                  localStorage.clear();
                  this.router.navigateByUrl("/search/searchresults")
                }     
              });



    }
    
    
    
    go(){
        this.check= !this.check;
    }
    
    AddExpert()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem('UserDoc')
            }
        }
        var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
        this.http.patch(environment.apiUrl+'/admin/AddExpert/'+this.ID,data,config)
            .subscribe((info:any) => {
                console.log(info);

                var JSONtoIndex = {
                    "name":info['data']['tags'],
                    "object":info['data'],
                    "type":"User"
                }
                this.http.post(environment.apiUrl+'/search/addToIndex',JSONtoIndex,config).subscribe(res=>{
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