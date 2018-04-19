import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-search-searchResult',
    templateUrl: `searchResult.html`,
    styleUrls: ['./style.css']

})
export class SearchResultComponent implements OnInit{
    Items = [];
    searchResult=false;
    contentElasticSearch =[];
    companyElasticSearch =[];
    userElasticSearch =[];
    filterOn=false;
    companyFilterOn=false;
    filterToSet = "All";
    filters: string[] = ["Content","Company","Expert"];
    companyFilters: string[] = ["Name","Type","Tag"];
    companyFilterToSet: string="All";
    key:string;
    filter:string;
    constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute){

    }
    ngOnInit(){
        this.route.queryParams.subscribe(params=>{
            this.key = params['key'];
            this.filter = params['filter1'];
            console.log(this.key);
            console.log(this.filter);
            if(this.key=="viewallcontent"){
                this.viewAllContent();
            }else if(this.key=="viewallcompanies"){
                this.viewAllCompanies();
            }else if(this.key=="viewallexperts"){
                this.viewAllExperts();
            }else if(this.key!=undefined && this.filter!=undefined) {
                this.search();
            }
        
        });

    }

    changeType(select){
        if(this.filterToSet == "Company"){
            this.companyFilterOn=true;
        }else{
            this.companyFilterOn=false;
        }
      }

      changeCompanyFilter(select){
        console.log(this.companyFilterToSet);
      }

    hide(){
        var x = document.getElementById("getHide");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    showFilter(){
        this.filterOn = !this.filterOn;
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

    search() {
        console.log("filterToSet" + this.filterToSet);
        console.log("filterToSet" + this.companyFilterToSet)
        this.searchResult = true;
        this.Items = [];
        this.contentElasticSearch = [];
        this.companyElasticSearch = [];
        this.userElasticSearch = [];
        if (this.key == undefined || this.nameortype != undefined) {
            this.key = this.nameortype;
        }
        //this.filter = "all";
        console.log(this.key);
        console.log(this.filterToSet);
        if (this.filterToSet == "All") {
            console.log("da5al");
            this.http.get(environment.apiUrl + '/search/getTagbyKeyword/' + this.key).subscribe
            (res => {
                console.log("entered res");
                if (this.Items = []) {
                    this.Items = res['data'];
                }
                console.log(res['data']);

                this.http.get(environment.apiUrl + '/search/getContentbyTitle/' + this.key).subscribe(
                    res => {
                        if (this.Items.length == 0) {
                            this.Items = res['data'];
                        }
                        else {
                            this.Items.concat(res['data']);

                        }
                        console.log(res['data'])

                        this.Items.forEach(element => {
                            if (element._source.type == 'Company') {
                                this.companyElasticSearch.push(element._source.object);
                                element._source.object.tags = element._source.object.tags.split(",");


                            }

                            if (element._source.type == 'Content') {
                                this.contentElasticSearch.push(element._source.object);
                                element._source.object.tags = element._source.object.tags.split(",");

                            }
                            console.log(this.contentElasticSearch);
                            if (element._source.type == 'User' && element._source.object.expert) {
                                this.userElasticSearch.push(element._source.object);
                                element._source.object.tags = element._source.object.tags.split(",");

                            }


                        });
                        console.log("param is :" + this.key);
                        console.log("filter is" + this.filter);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + this.filter);
                    }
                )

            });
        }
        else
            {
                if (this.filterToSet == "Company" && this.companyFilterToSet == "All") {

                    console.log("entered");
                    this.http.get(environment.apiUrl + '/search/getCompanyTagsOrNameOrType/' + this.nameortype).subscribe(res => {
                        if (this.companyElasticSearch = []) {
                            this.companyElasticSearch = res['data'];
                            this.companyElasticSearch.forEach(item => {
                                item.tags = item.tags.split(",");
                            });
                        }
                        console.log(res['data']);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + "Company"+"&filter2="+ this.companyFilterToSet);
                    });
                }
                if (this.filterToSet == "Company" && this.companyFilterToSet == "Name") {
                    console.log("entered name");
                    this.http.get(environment.apiUrl + '/search/getCompanyByName/' + this.nameortype).subscribe(res => {
                        if (this.companyElasticSearch = []) {
                            this.companyElasticSearch = res['data'];
                            this.companyElasticSearch.forEach(item => {
                                item.tags = item.tags.split(",");
                            });
                        }
                        console.log(res['data']);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + "Company"+"&filter2="+ this.companyFilterToSet);
                    });
                }
                if (this.filterToSet == "Company" && this.companyFilterToSet == "Type") {
                    this.http.get(environment.apiUrl + '/search/getCompanyByType/' + this.nameortype).subscribe(res => {
                        if (this.companyElasticSearch = []) {
                            this.companyElasticSearch = res['data'];
                            this.companyElasticSearch.forEach(item => {
                                item.tags = item.tags.split(",");
                            });
                        }
                        console.log(res['data']);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + "Company"+"&filter2="+ this.companyFilterToSet);
                    });
                }
                if (this.filterToSet == "Company" && this.companyFilterToSet == "Tag") {
                    this.http.get(environment.apiUrl + '/search/getCompanyTags/' + this.nameortype).subscribe(res => {
                        if (this.companyElasticSearch = []) {
                            this.companyElasticSearch = res['data'];
                            this.companyElasticSearch.forEach(item => {
                                item.tags = item.tags.split(",");
                            });
                        }
                        console.log(res['data']);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + "Company"+"&filter2="+ this.companyFilterToSet);
                    });
                }

            }

            if (this.filterToSet == "Content") {
                this.http.get(environment.apiUrl + '/search/getContentTags/' + this.nameortype).subscribe(res => {
                    if (this.contentElasticSearch = []) {
                        this.contentElasticSearch = res['data'];
                        this.contentElasticSearch.forEach(item => {
                            item.tags = item.tags.split(",");
                        });
                    }
                    this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + "Content");
                });
            }

            if (this.filterToSet == "Expert") {
                this.http.get(environment.apiUrl + '/search/getExpertTags/' + this.nameortype).subscribe(res => {
                    if (this.userElasticSearch = []) {
                        this.userElasticSearch = res['data'];
                        this.userElasticSearch.forEach(item => {
                            item.tags = item.tags.split(",");
                        });
                    }
                    this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + "Expert");
                });

            }


        }
    viewCompany(id:string){
        this.router.navigateByUrl('/company/viewcompany/'+id);
    }
    viewExpert(username:string){
        this.router.navigateByUrl('/user/profile/'+username);
    }
    viewContent(id:string){
        this.router.navigateByUrl('/content/viewcontent/'+id);
    }


    viewAllContent(){
        this.companyElasticSearch =[];
        this.contentElasticSearch = [];
        this.userElasticSearch = [];
        this.http.get(environment.apiUrl+"Content/viewContents").subscribe(res =>{
            console.log(this.Items);
            this.contentElasticSearch= res['data'];
            this.contentElasticSearch.forEach(item => {
                item.tags=item.tags.split(",");
            });
            this.searchResult=true;
        });
    }
    viewAllCompanies(){
        this.companyElasticSearch =[];
        this.contentElasticSearch = [];
        this.userElasticSearch = [];
        this.http.get(environment.apiUrl+"/company/getCompanies").subscribe(res =>{
            this.companyElasticSearch= res['data'];
            this.companyElasticSearch.forEach(item => {
                item.tags=item.tags.split(",");
            });
            this.searchResult=true;
            console.log(this.companyElasticSearch);
        });
    }
    viewAllExperts(){
        this.companyElasticSearch =[];
        this.contentElasticSearch = [];
        this.userElasticSearch = [];
        this.http.get(environment.apiUrl+"/User/viewUsers").subscribe(res =>{
            this.userElasticSearch = res['data'];
            this.userElasticSearch.forEach(item => {
                item.tags=item.tags.split(",");
            });
            this.searchResult=true;
            console.log(this.userElasticSearch);

        });
    }
}

