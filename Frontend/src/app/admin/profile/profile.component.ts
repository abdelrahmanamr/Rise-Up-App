import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard-items',
  template: `
      <div class="container" xmlns="http://www.w3.org/1999/html">

          <div class="profile" style="float: left; width: 40%;overflow: hidden;">
              <div class="card">
                  <img src="/assets/profile.png" alt="{{data.username}}" style="width:100%">
                  <h1 class="uppercase">{{data.username}}</h1>
                  <h1 class="cap">{{data.firstname}} {{data.lastname}}</h1>
                  <b *ngIf="data.admin" style="color: #2e2123">Admin</b>
                  <b *ngIf="data.blocked" style="color: #b94a48">Blocked</b>
                  <b *ngIf="data.expert" style="color: #343ab9">Expert</b>
                  Tags: <div><span class="tags-input__tag" *ngFor="let tag of data.tags;">{{tag}}</span></div>
                  <b style="color: #0b0e2b">Created At: {{data.createdAt | date}}</b>
                  <b style="color: #04040e">Last time updated at: {{data.updatedAt | date}}</b>
                  <p class="title">{{data.email}}</p></div>
          </div>
       
              <div style="margin-left:100px;text-align: center; width: 20%;overflow: hidden; max-width:700px;max-height: 1000px">
                  <div class="card" style=" background-color:rgba(253,255,245,0.49);max-width: 700px">
                      <label for="ctrs" style="color:rgba(22,19,8,0.92);">
                          <b> Admin Controls </b>
                      </label>

                      <div id="ctrs" style="text-align: center; overflow: hidden; max-width:300px;max-height: 500px">
                          <button *ngIf="!data.blocked" type="button"
                                  style="margin-bottom:10px; background-color:#DC0C18;width: 200px;"
                                  class="btn btn-primary" (click)="Block()">Block
                          </button>

                          <button *ngIf="data.blocked" type="button"
                                  style="margin-bottom:10px;background-color:#DC0C18; width: 200px;"
                                  class="btn btn-primary" (click)="UnBlock()">UnBlock
                          </button>
                          <br>
                          <button *ngIf="!data.admin" type="button"
                                  style="margin-bottom:10px;background-color:#DC0C18; width: 200px;"
                                  class="btn btn-primary" (click)="AddAdmin()">Make admin
                          </button>
                          <button *ngIf="data.admin" type="button"
                                  style="margin-bottom:10px;background-color:#DC0C18; width: 200px;"
                                  class="btn btn-primary" (click)="RemoveAdmin()">Remove admin
                          </button>
                          <br>
                          <button *ngIf="!data.expert" type="button"
                                  style="margin-bottom:10px;background-color:#DC0C18; width: 200px;"
                                  class="btn btn-primary" (click)="AddExpert()">Make expert
                          </button>

                          <button *ngIf="data.expert" type="button"
                                  style="margin-bottom:10px;background-color:#DC0C18; width: 200px;"
                                  class="btn btn-primary" (click)="RemoveExpert()">Remove expert
                          </button>

                          <button *ngIf="data.expert" type="button"
                                  style="margin-bottom:10px;background-color:#DC0C18; width: 200px;"
                                  class="btn btn-primary" (click)="go()">Show Expert Tags

                          </button>

                         
                          <div *ngIf="check">
                              <div *ngFor="let tag of tagFinalA">
                                  {{ tag }}
                              </div>
                          </div>

                        


                      </div>
                  </div>
              </div>

          <div style="margin-left:100px;text-align: initial; width: 60%;height:60%;overflow: hidden; max-width:700px;max-height: 1000px">
              <div class="card" style=" background-color:rgba(253,255,245,0.49);max-width: 700px">
                  <label for="ctrs" style="color:rgba(22,19,8,0.92);">
                      <b> Enter Tags Here: </b>
                  </label>
                  <tags-input  class="form-control input-lg" (onTagsChanged)="onTagsChanged($event)"
                               ng-controller="MainCtrl" ng-model="tags"  type="text" [(ngModel)]="tags"
                               name="tags"> </tags-input>
                  
                 
                      <button  *ngIf="data.expert" type="button"
                              style="margin-bottom:5px;margin-left:450px;background-color:#DC0C18; width: 200px;"
                              class="btn btn-primary" (click)="submitTags()">Submit Tags

                         
                          {{errorHandle}}
                      </button>

                  
                  </div>
              </div>

          </div>





  `
 
 
})
export class ProfileComponent {
    data = {};
    datas = {};
    flag = false;
    tags:any=[];
    check=false;
    Url:String
    ID:any;
    tagFinalA:any;
  constructor(private http: HttpClient,private router: Router){
    this.Url=window.location.href
    this.ID = this.Url.substr(this.Url.lastIndexOf('/') + 1);
    console.log(this.ID);
  }


  ngOnInit() 
  {
    var config = {
        headers : {
            'Content-Type': 'application/json',
            "id":JSON.parse(localStorage.getItem("userProps"))["_id"]
        }
    }

    this.http.get('http://localhost:3000/api/admin/getUserById/'+this.ID,config).
    subscribe(res =>{
        // console.log(res['data']);
        this.data = res['data'];
        if(res['data'].tags!=null)
        // this.tags = res['data'].tags.split(",");
        res['data'].tags.split(",").forEach(element => {
            var el = JSON.parse(JSON.stringify({"displayValue":element}));
            console.log(el);
            this.tags.push(el);
        });

          this.data['tags']=this.data['tags'].split(",");

    });

  }

  Block()
  {
    var config = {
        headers : {
            'Content-Type': 'application/json',
            "id":JSON.parse(localStorage.getItem("userProps"))["_id"]
        }
    }
    var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
    this.http.patch(environment.apiUrl+'/admin/blockUser/'+this.ID,data,config)
    .subscribe((info:any) => {console.log(info);});
      window.location.reload();
  }

  editExpert(){
    window.location.replace("#/admin/edittags");
  }
    onTagsChanged($event){}

submitTags(){

    var result = this.tags.map(function(val) {
        return val.displayValue;
    }).join(',');
    var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    var data = JSON.stringify({tags:result,userid:JSON.parse(localStorage.getItem("userProps"))["_id"]})

    var id= sessionStorage.getItem('userId');
    this.http.patch(environment.apiUrl+'/admin/UpdateExpertTag/'+this.ID,data, config)
        .subscribe(res=> {
            window.location.reload();
        });


    this.flag = true;

}
  UnBlock()
  {
    var config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
    this.http.patch(environment.apiUrl+'/admin/UnblockUser/'+this.ID,data,config)
    .subscribe((info:any) => {console.log(info);});
      window.location.reload();
  }
    RemoveAdmin()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
        this.http.patch(environment.apiUrl+'/admin/RemoveAdmin/'+this.ID,data,config)
            .subscribe((info:any) => {console.log(info);});
        window.location.reload();
    }

    RemoveExpert()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json',
            }
        }
        var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
        this.http.patch(environment.apiUrl+'/admin/RemoveExpert/'+this.ID,data,config)
            .subscribe((info:any) => {console.log(info);});
        window.location.reload();
    }


      AddAdmin()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json',
            }
        }
        var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
        this.http.patch(environment.apiUrl+'/admin/AddAdmin/'+this.ID,data,config)
            .subscribe((info:any) => {console.log(info);});


        window.location.reload();
    }
    
    
    
    go(){


        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        this.http.get(environment.apiUrl+'/admin/getUserTags/'+this.ID, config)
            .subscribe(res =>{
                console.log(res['data']);
                this.datas = res['data'];
                this.tagFinalA = res['data'].split(",");

            });


        this.check=true;
    }
    
    AddExpert()
    {
        var config = {
            headers : {
                'Content-Type': 'application/json',
            }
        }
        var data = JSON.stringify({userid:JSON.parse(localStorage.getItem("userProps"))["_id"]});
        this.http.patch(environment.apiUrl+'/admin/AddExpert/'+this.ID,data,config)
            .subscribe((info:any) => {console.log(info);});
        window.location.reload();
    }


}