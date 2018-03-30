import { Component, OnInit } from '@angular/core';
import { environment } from  '../../environments/environment.prod';
import { MENU_ITEMS } from './search-menu';
import {HttpClient} from "@angular/common/http";
import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';
@Component({
    selector: 'app-search',
    template: `
    <ngx-main-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet>
         <div class="dv">
          <input class="srch1" type="text" [(ngModel)]="nameortype" placeholder="Search..">
           &nbsp; &nbsp;
          <button class="btn1" (click)="search()"> Search </button><br><br/>
         </div>
          <form class="check">              
              <input id="cont" type="checkbox" value="false" (click)="checkUncheck('cont')"> CONTENT
              &nbsp; &nbsp;
              <input id="comp" type="checkbox" value="false" (click)="hide();checkUncheck('comp')"> COMPANIES
              &nbsp; &nbsp;
              <input id="exp"  type="checkbox" value="false" (click)="checkUncheck('exp')"> EXPERT
          </form>
          <div id="getHide">
              <input  id="name" type="checkbox" value="false" (click)="checkUncheck('name')"> name
              <input  id="type" type="checkbox" value="false" (click)="checkUncheck('type')"> type
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
                  border-width: .2em;
                  border-radius: .7em 0 0 .7em;
                  padding: .2em .2em .2em .5em;
                  border-radius: 25px;
                  outline: none;
                  width: 350px;
                  height: 40px;
              }
              .btn1 {
                  
                  font-size: 14px;
                  background-color: #f44336;
                  color:white;
                  font-weight:bold;
                  padding: 8px 16px;
                  outline: none;
              }
          </style>
      </router-outlet>
    </ngx-main-layout>
  `
})
export class SearchComponent implements OnInit {
    menu: NbMenuItem[];
    nameortype:any;
    Items =[];
    constructor(private http:HttpClient){

    }

    ngOnInit() {
        this.menu = MENU_ITEMS;
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

     if((<HTMLInputElement>document.getElementById("comp")).value == "true"){
         if((<HTMLInputElement>document.getElementById("name")).value == "true"){
             localStorage.setItem("searchKey","compname");
             localStorage.setItem("searchAttribute",this.nameortype);
             window.location.href = "http://localhost:4200/#/search/searchResult";


         }
         if((<HTMLInputElement>document.getElementById("type")).value == "true"){
             localStorage.setItem("searchKey","comptype");
             localStorage.setItem("searchAttribute",this.nameortype);
             window.location.href = "http://localhost:4200/#/search/searchResult";
             this.http.get(environment.apiUrl + '/search/getCompanyByType/' + this.nameortype).subscribe(res=>{
                 this.Items=res['data'];
                 localStorage.setItem('searchResult',JSON.stringify(this.Items));
             });
         }
     }
    }
}