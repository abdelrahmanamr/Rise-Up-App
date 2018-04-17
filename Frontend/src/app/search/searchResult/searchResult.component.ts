import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";


@Component({
    selector: 'app-search-searchResult',
    templateUrl: `searchResult.html`

})
export class SearchResultComponent implements OnInit{
    Items = [];
    searchStatus : boolean;
    searchByTags : boolean;
    expertStatus : boolean;
    contentStatus : boolean;
    contentElasticSearch =[];
    companyElasticSearch =[];
    userElasticSearch =[];
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
        this.contentElasticSearch = [];
        this.companyElasticSearch = [];
        this.userElasticSearch = [];
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

                        this.Items.forEach(element => {
                            if (element._source.type == 'Company') {
                                this.companyElasticSearch.push(element);
                                element._source.object.tags=element._source.object.tags.split(",");
 
                                    
                            }

                            if (element._source.type == 'Content') {
                                    this.contentElasticSearch.push(element);
                                    element._source.object.tags=element._source.object.tags.split(",");

                            }
                            console.log( this.contentElasticSearch);
                            if (element._source.type == 'User'&& element._source.object.expert) {
                                    this.userElasticSearch.push(element);
                                    element._source.object.tags=element._source.object.tags.split(",");

                            }

                        });

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
                    this.Items.forEach(item => {
                        item.tags=item.tags.split(",");
                      });
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
                       this.Items.forEach(item => {
                        item.tags=item.tags.split(",");
                      });
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
                            this.Items.forEach(item => {
                                item.tags=item.tags.split(",");
                              });
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
                                this.Items.forEach(item => {
                                    item.tags=item.tags.split(",");
                                  });
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
                                   this.Items.forEach(item => {
                                    item.tags=item.tags.split(",");
                                  });
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
                                   this.Items.forEach(item => {
                                    item.tags=item.tags.split(",");
                                  });
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
                                      this.Items.forEach(item => {
                                        item.tags=item.tags.split(",");
                                      });
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
                this.Items.forEach(item => {
                    item.tags=item.tags.split(",");
                  });
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
                this.Items.forEach(item => {
                    item.tags=item.tags.split(",");
                  });
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

