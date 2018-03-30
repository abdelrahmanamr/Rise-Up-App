import { Component } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-search-searchResult',
    template: `<div class="container">



        <table class="table-hover">
              <thead>
              <tr>
                  <th>
                      Name
                  </th>
                  &nbsp;  &nbsp;&nbsp; 
                  <th>
                      Email
                  </th>
                  &nbsp;&nbsp;&nbsp;
                  <th>
                      website
                  </th>
                  &nbsp;&nbsp;&nbsp;
                  <th>
                      tags
                  </th>
                  &nbsp; &nbsp; &nbsp;
                  <th>
                      type
                  </th>
                  &nbsp; &nbsp; &nbsp; 
                  <th>
                      views
                  </th>
                  &nbsp; &nbsp; &nbsp;
                  <th>
                      createdAt
                  </th>
                  &nbsp;  &nbsp; &nbsp;
                  <th>
                      updatedAt
                  </th>
              </tr>
              </thead>
              
              <tbody>
              <tr  *ngFor="let item of this.Items" id="{{counter}}">
                  <td>{{item.name}}</td>
                  <td>{{item.email}}</td>
                  <td>{{item.website}}</td>
                  <td>{{item.tags}}</td>
                  <td>{{item.type}}</td>
                  <td>{{item.views}}</td>
                  <td>{{item.createdAt}}</td>
                  <td>{{item.updatedAt}}</td>
              </tr>
             
              </tbody>
              
          </table>
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

