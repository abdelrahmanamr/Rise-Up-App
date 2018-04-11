import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";


@Component({
    selector: 'app-search-searchResult',
    template: `

    <div class="dv">
          <input class="srch1" style="outline:none;" type="text" [(ngModel)]="nameortype" placeholder="Search.." ngModel>
           &nbsp; &nbsp;
          <button class="btn btn-danger" (click)="search()"> Search </button><br>
         </div>
          <form class="check">              
              <input id="cont" type="checkbox" value="false" (click)="checkUncheck('cont')"> CONTENT
              &nbsp; &nbsp;
              <input id="comp" type="checkbox" value="false" (click)="hide();checkUncheck('comp')"> COMPANIES
              &nbsp; &nbsp;
              <input id="exp"  type="checkbox" value="false" (click)="checkUncheck('exp')"> EXPERT
          </form>
            <div style="text-align:center;">
          <div id="getHide">
              <input  id="name" type="checkbox" value="false" (click)="checkUncheck('name')"> NAME
              <input  id="type" type="checkbox" value="false" (click)="checkUncheck('type')"> TYPE
              <input  id="tag" type="checkbox" value="false" (click)="checkUncheck('tag')"> TAG
          </div>
          <br />
          <a href="#/content/viewallcontents"><button class="btn btn-danger"> View All Content </button></a>
          <a href="#/company/viewallcompanies"><button class="btn btn-danger"> View All Companies </button></a>
          <a href="#/expert/viewallexperts"><button class="btn btn-danger"> View All Experts </button></a>

          </div>
          <style>
              .check{
                   position: relative;
                 left: 420px;
              }
              .dv{
                  text-align: center;
              }
              .srch1{

                  padding: .2em .2em .2em .5em;
                  border-radius: 25px;
                  width: 350px;
                  height: 40px;
              }
          </style>

          <div *ngIf="!searchByTags">

          <!--Rifky-->
          <div *ngIf="searchStatus">
        <div class="container">
            <h1>Results</h1>
            <br>
            
            <div class="container-fluid" *ngFor="let item of this.Items">
                <div class="card" style="margin-bottom: 10px; box-shadow: 0 4px 4px 0 rgb(96,72,28); padding-left:30px; padding-top:10px; padding-right:10px;">
                    <h4 class="text-uppercase">{{item.name}}</h4>
                    <p class="title" style="float:right;"> {{item.type}}
                        <button class="btn btn-danger"
                                style="margin-left:auto;margin-right:0px;float:right;margin-left:70px;background-color:#DC0C18" (click)="viewCompany(item._id)">
                            View Company
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div *ngIf="contentStatus">
        <div class="container">
            <h1>Results</h1>
            <br>
            
            <div class="container-fluid" *ngFor="let item of this.Items">
                <div class="card" style="margin-bottom: 10px; box-shadow: 0 4px 4px 0 rgb(96,72,28); padding-left:30px; padding-top:10px; padding-right:10px;">
                    <h4 class="text-uppercase">{{item.title}}</h4>
                    <p class="title" style="float:right;"> {{item.type}}
                        <button class="btn btn-danger"
                                style="margin-left:auto;margin-right:0px;float:right;margin-left:70px;background-color:#DC0C18" (click)="viewContent(item._id)">
                            View Content
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div *ngIf="expertStatus">
        <div class="container">
            <h1>Results</h1>
            <br>
            
            <div class="container-fluid" *ngFor="let item of this.Items">
                <div class="card" style="margin-bottom: 10px; box-shadow: 0 4px 4px 0 rgb(96,72,28); padding-left:30px; padding-top:10px; padding-right:10px;">
                    <h4 class="text-uppercase">{{item.username}}</h4>
                    <p class="title" style="float:right;"> {{item.email}}
                        <button class="btn btn-danger"
                                style="margin-left:auto;margin-right:0px;float:right;margin-left:70px;background-color:#DC0C18" (click)="viewExpert(item._id)">
                            View Expert
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!--End rifky-->
    </div>
          <div *ngIf="searchByTags">
          <div class="container">
          <h1>Results</h1>
          <div id="tablesDiv" *ngFor="let item of this.Items">
                <div id="companyDiv" *ngIf="item._source.type=='Company'">
                
                  <h2>Companies</h2>
                <div class="card" style="margin-bottom: 10px; box-shadow: 0 4px 4px 0 rgb(96,72,28); padding-left:30px; padding-top:10px; padding-right:10px;">
                    <h4 class="text-uppercase">{{item._source.object.name}}</h4>
                   
                        <button class="btn btn-danger"
                        style="margin-left:auto;margin-right:0px;float:right;margin-left:80%;margin-bottom:1%;width:20%;"  (click)="viewCompany(item._source.object._id)">
                            View Company
                        </button>
                    
               </div>
                </div>
                <div id="expertDiv" *ngIf="item._source.type=='User' && item._source.object.expert">
                <h2>Experts</h2>
                <div class="card" style="margin-bottom: 10px; box-shadow: 0 4px 4px 0 rgb(96,72,28); padding-left:30px; padding-top:10px; padding-right:10px;">
                <h4 class="text-uppercase">{{item._source.object.name}}</h4>
                
                    <button class="btn btn-danger"
                            style="margin-left:auto;margin-right:0px;float:right;margin-left:80%;margin-bottom:1%;width:20%;"  (click)="viewExpert(item._source.object._id)">
                        View Company
                    </button>
                
           </div>
                </div>
                <div id="contentDiv" *ngIf="item._source.type=='Content'">
                <h2>Content</h2>
                <div class="card" style="margin-bottom: 10px; box-shadow: 0 4px 4px 0 rgb(96,72,28); padding-left:30px; padding-top:10px; padding-right:10px;">
                <h4 class="text-uppercase">{{item._source.object.title}}</h4>
                
                    <button class="btn btn-danger"
                            style="margin-left:auto;margin-right:0px;float:right;margin-left:80%;margin-bottom:1%;width:20%;" 
                            (click)="viewContent(item._source.object._id)">
                        View Company
                    </button>
              
           </div>
                </div>
          </div>              
          </div>

         `

})
export class SearchResultComponent implements OnInit{
    Items = [];
    searchStatus : boolean;
    searchByTags : boolean;
    expertStatus : boolean;
    contentStatus : boolean;
    constructor(private http:HttpClient,private router:Router){

    }
    ngOnInit(){
        this.searchStatus = false;
        this.expertStatus = false;
        this.contentStatus = false;
        document.getElementById("getHide").style.display = "none";

    }

    hide(){
        var x = document.getElementById("getHide");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    nameortype:any;
    checkUncheck(y:any){
        if((<HTMLInputElement>document.getElementById(y)).value == "true"){
        (<HTMLInputElement>document.getElementById(y)).value = "false";
            console.log((<HTMLInputElement>document.getElementById(y)).value);
        }
        else{
            (<HTMLInputElement>document.getElementById(y)).value = "true";
            console.log((<HTMLInputElement>document.getElementById(y)).value);
        }
    }

    search(){
        this.Items = [];
        if((<HTMLInputElement>document.getElementById("comp")).value == "false" &&
           (<HTMLInputElement>document.getElementById("exp")).value == "false" && 
           (<HTMLInputElement>document.getElementById("cont")).value == "false" )
        {
            this.http.get(environment.apiUrl + '/search/getTagbyKeyword/'+this.nameortype).subscribe
            (res=>{
                if(this.Items=[])
                {
                    this.Items= res['data'];
                }
                this.searchByTags=true;
                console.log(res['data']);

                this.http.get(environment.apiUrl+'/search/getContentbyTitle/'+this.nameortype).subscribe(
                    res=>{
                        if(this.Items.length==0)
                        {
                            this.Items= res['data'];
                        }
                        else{
                            this.Items.concat(res['data']);

                        }
                        console.log(this.Items);

                    }
                )

            });
        }
        else
        {
                this.searchByTags=false;
        
     if((<HTMLInputElement>document.getElementById("comp")).value == "true"){
         if(((<HTMLInputElement>document.getElementById("name")).value == "true" &&(<HTMLInputElement>document.getElementById("type")).value == "true"&&(<HTMLInputElement>document.getElementById("tag")).value == "true" ) ||
         ((<HTMLInputElement>document.getElementById("name")).value == "false" &&(<HTMLInputElement>document.getElementById("type")).value == "false"&&(<HTMLInputElement>document.getElementById("tag")).value == "false" ) ){

            console.log("entered");
            this.http.get(environment.apiUrl + '/search/getCompanyTagsOrNameOrType/' + this.nameortype).subscribe(res=>{
                if(this.Items=[]){
                    this.Items= res['data'];
                }
                this.searchStatus= true;
                this.expertStatus = false;
                this.contentStatus = false;
                console.log(res['data']);
            });
         }
         else{
            if(((<HTMLInputElement>document.getElementById("name")).value == "true" &&(<HTMLInputElement>document.getElementById("type")).value == "true")){
               console.log("entered");
               this.http.get(environment.apiUrl + '/search/getCompanyByNameOrType/' + this.nameortype).subscribe(res=>{
                   if(this.Items=[]){
                       this.Items= res['data'];
                   }
                   this.searchStatus= true;
                   this.expertStatus = false;
                   this.contentStatus = false;
                   console.log(res['data']);
               });
            }else{
                if(((<HTMLInputElement>document.getElementById("name")).value == "true" &&(<HTMLInputElement>document.getElementById("tag")).value == "true")){
                    console.log("entered");
                    this.http.get(environment.apiUrl + '/search/getCompanyTagsOrName/' + this.nameortype).subscribe(res=>{
                        if(this.Items=[]){
                            this.Items= res['data'];
                        }
                        this.searchStatus= true;
                        this.expertStatus = false;
                        this.contentStatus = false;
                        console.log(res['data']);
                    });
                 }else{
                    if(((<HTMLInputElement>document.getElementById("type")).value == "true" &&(<HTMLInputElement>document.getElementById("tag")).value == "true")){
                        console.log("entered");
                        this.http.get(environment.apiUrl + '/search/getCompanyTagsOrType/' + this.nameortype).subscribe(res=>{
                            if(this.Items=[]){
                                this.Items= res['data'];
                            }
                            this.searchStatus= true;
                            this.expertStatus = false;
                            this.contentStatus = false;
                            console.log(res['data']);
                        });
                     }else{
                        if((<HTMLInputElement>document.getElementById("name")).value == "true"){
                            console.log("entered name");
                           this.http.get(environment.apiUrl + '/search/getCompanyByName/' + this.nameortype).subscribe(res=>{
                               if(this.Items=[]){
                                   this.Items= res['data'];
                               }
                               this.searchStatus= true;
                               this.expertStatus = false;
                               this.contentStatus = false;
                               console.log(res['data']);
                           });
               
                           }
                           if((<HTMLInputElement>document.getElementById("type")).value == "true"){
                            this.http.get(environment.apiUrl + '/search/getCompanyByType/' + this.nameortype).subscribe(res=>{
                               if(this.Items=[]){
                                   this.Items= res['data'];
                               }
                                this.searchStatus= true;
                                this.expertStatus = false;
                                this.contentStatus = false;
                                console.log(res['data']);
                            });
                           }
                           if((<HTMLInputElement>document.getElementById("tag")).value == "true"){
                               this.http.get(environment.apiUrl + '/search/getCompanyTags/' + this.nameortype).subscribe(res=>{
                                  if(this.Items=[]){
                                      this.Items= res['data'];
                                  }
                                   this.searchStatus= true;
                                   this.expertStatus = false;
                                   this.contentStatus = false;
                                   console.log(res['data']);
                               });
                           }

                     }
                 }
            }
        }

     }
    

    }

    if((<HTMLInputElement>document.getElementById("cont")).value == "true"){
        this.http.get(environment.apiUrl + '/search/getContentTags/' + this.nameortype).subscribe(res=>{
            if(this.Items=[]){
                this.Items= res['data'];
            }
             this.contentStatus= true;
             this.expertStatus = false;
        this.searchStatus = false;
         });
    }

    if((<HTMLInputElement>document.getElementById("exp")).value == "true"){
        this.http.get(environment.apiUrl + '/search/getExpertTags/' + this.nameortype).subscribe(res=>{
            if(this.Items=[]){
                this.Items= res['data'];
            }
             this.expertStatus= true;
             this.searchStatus = false;
        this.contentStatus = false;
         });

    }


}
    viewCompany(id:string){
        this.router.navigateByUrl('/company/viewcompany/'+id);
    }
    viewExpert(id:string){
        this.router.navigateByUrl('/expert/viewexpert/'+id);
    }
    viewContent(id:string){
        this.router.navigateByUrl('/content/viewcontent/'+id);
    }


    
}

