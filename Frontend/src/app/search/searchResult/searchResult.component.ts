import { Component } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-search-searchResult',
    template: `
        <div class="container">
            <h1>Results</h1>
            <br>
            
            <div class="container-fluid" *ngFor="let item of this.Items">

                <div class="card" style="margin-bottom: 10px; box-shadow: 0 4px 4px 0 rgb(96,72,28);">
                    <h1 class="text-uppercase">{{item.name}}</h1>
                    <p class="title" style="float:right;"> {{item.type}}
                        <button class="btn btn-danger"
                                style="margin-left:auto;margin-right:0px;float:right;margin-left:70px;background-color:#DC0C18">
                            View Company
                        </button>
                    </p>


                </div>

            </div>


        </div>`
})
export class SearchResultComponent {
    Items = [];
    constructor(private http:HttpClient){

    }
    ngOnInit(){
        console.log(localStorage.getItem("searchKey"));
        if(localStorage.getItem("searchKey") == "compname"){
            console.log(localStorage.getItem("searchAttribute"))
            this.http.get(environment.apiUrl + '/search/getCompanyByName/' + localStorage.getItem("searchAttribute")).subscribe(res=>{
                this.Items=res['data'];
            });
        }
        if(localStorage.getItem("searchKey") == "comptype"){
            console.log(localStorage.getItem("searchAttribute"))
            this.http.get(environment.apiUrl + '/search/getCompanyByType/' + localStorage.getItem("searchAttribute")).subscribe(res=>{
                this.Items=res['data'];
            });
        }
    }
}

