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
    filter1:string;
    filter2:string;
    constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute){

    }
    ngOnInit(){
        this.route.queryParams.subscribe(params=>{
            this.key = params['key'];
            this.filter1 = params['filter1'];
            this.filter2 = params['filter2'];
            console.log(this.key);
            console.log(this.filter1);
            if(this.key!=undefined)
            {
                if (this.key.toLowerCase() == "allcontent")
                {
                    this.viewAllContent();

                } else if (this.key.toLowerCase() == "allcompanies")
                {
                    this.viewAllCompanies();

                } else if (this.key.toLowerCase() == "allexperts")
                {
                    this.viewAllExperts();

                } else
                    {
                        this.nameortype = this.key;
                        if(this.filter1 == undefined) {
                            this.filterToSet = "All";
                            console.log("et8ayar")
                            console.log(this.filterToSet);
                        }
                        else{
                            this.filterToSet = this.filter1;
                        }
                        if(this.filter2!=undefined)
                        {
                            if(this.filter2.toLowerCase()=="type"){
                                this.companyFilterToSet = "Type";
                            }else if(this.filter2.toLowerCase()=="name"){
                                this.companyFilterToSet = "Name";
                            }else if(this.filter2.toLowerCase()=="tag"){
                                this.companyFilterToSet = "Tag";
                            }
                            else{
                                this.companyFilterToSet = "All";
                            }
                            this.companyFilterOn = true;
                        }
                        this.filterOn = true;
                        this.search();
                    }
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

    searchByButton(){
        this.key = this.nameortype;
        this.filter1 = this.filterToSet;
        this.filter2 = this.companyFilterToSet;
        this.search();
    }
    search() {
        this.searchResult = true;
        this.Items = [];
        this.contentElasticSearch = [];
        this.companyElasticSearch = [];
        this.userElasticSearch = [];
        //this.filter = "all";
        console.log(this.key);
        console.log(this.filterToSet);
        if (this.filterToSet.toLowerCase() == "all" ) {
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
                                element._source.object.tags = element._source.object.tags.split(",");
                                this.companyElasticSearch.push(element._source.object);


                            }

                            if (element._source.type == 'Content') {
                                element._source.object.tags = element._source.object.tags.split(",");
                                this.contentElasticSearch.push(element._source.object);

                            }
                            //console.log(this.contentElasticSearch);
                            if (element._source.type == 'User' && element._source.object.expert) {
                                element._source.object.tags = element._source.object.tags.split(",");
                                this.userElasticSearch.push(element._source.object);
                            }


                        });
                        console.log("param is :" + this.key);
                        console.log("filter is" + this.filter1);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + this.filterToSet);
                    }
                )

            });
        }
        else
            {
                if (this.filterToSet.toLowerCase() == "company" && this.companyFilterToSet.toLowerCase() == "all") {

                    console.log("entered");
                    this.http.get(environment.apiUrl + '/search/getCompanyTagsOrNameOrType/' + this.key).subscribe(res => {
                        if (this.companyElasticSearch = []) {
                            this.companyElasticSearch = res['data'];
                            this.companyElasticSearch.forEach(item => {
                                item.tags = item.tags.split(",");
                            });
                        }
                        console.log(res['data']);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + this.filterToSet+"&filter2="+ this.companyFilterToSet);
                    });
                }
                if (this.filterToSet.toLowerCase() == "company" && this.companyFilterToSet.toLowerCase() == "name") {
                    console.log("entered name");
                    this.http.get(environment.apiUrl + '/search/getCompanyByName/' + this.key).subscribe(res => {
                        if (this.companyElasticSearch = []) {
                            this.companyElasticSearch = res['data'];
                            this.companyElasticSearch.forEach(item => {
                                item.tags = item.tags.split(",");
                            });
                        }
                        console.log(res['data']);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + this.filterToSet+"&filter2="+ this.companyFilterToSet);
                    });
                }
                if (this.filterToSet.toLowerCase() == "company" && this.companyFilterToSet.toLowerCase() == "type") {
                    this.http.get(environment.apiUrl + '/search/getCompanyByType/' + this.key).subscribe(res => {
                        if (this.companyElasticSearch = []) {
                            this.companyElasticSearch = res['data'];
                            this.companyElasticSearch.forEach(item => {
                                item.tags = item.tags.split(",");
                            });
                        }
                        console.log(res['data']);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + this.filterToSet+"&filter2="+ this.companyFilterToSet);
                    });
                }
                if (this.filterToSet.toLowerCase() == "company" && this.companyFilterToSet.toLowerCase() == "tag") {
                    this.http.get(environment.apiUrl + '/search/getCompanyTags/' + this.key).subscribe(res => {
                        if (this.companyElasticSearch = []) {
                            this.companyElasticSearch = res['data'];
                            this.companyElasticSearch.forEach(item => {
                                item.tags = item.tags.split(",");
                            });
                        }
                        console.log(res['data']);
                        this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + this.filterToSet+"&filter2="+ this.companyFilterToSet);
                    });
                }

            }

            if (this.filterToSet.toLowerCase() == "content") {
                this.http.get(environment.apiUrl + '/search/getContentTags/' + this.key).subscribe(res => {
                    if (this.contentElasticSearch = []) {
                        this.contentElasticSearch = res['data'];
                        this.contentElasticSearch.forEach(item => {
                            item.tags = item.tags.split(",");
                        });
                    }
                    this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + this.filterToSet);
                });
            }

            if (this.filterToSet.toLowerCase() == "expert") {
                this.http.get(environment.apiUrl + '/search/getExpertTags/' + this.key).subscribe(res => {
                    if (this.userElasticSearch = []) {
                        this.userElasticSearch = res['data'];
                        this.userElasticSearch.forEach(item => {
                            item.tags = item.tags.split(",");
                        });
                    }
                    this.router.navigateByUrl("/search/searchResult?key=" + this.key + "&filter1=" + this.filterToSet);
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
        this.nameortype = "";
        this.http.get(environment.apiUrl+"Content/viewContents").subscribe(res =>{
            console.log(this.Items);
            this.contentElasticSearch= this.sortPreferedContent(res['data']);
            this.contentElasticSearch.forEach(item => {
                item.tags=item.tags.split(",");
            });
            this.filterToSet = "All";
            this.searchResult=true;
            this.filterOn=false;
            this.router.navigateByUrl("/search/searchResult?key=" + "AllContent");
        });
    }
    viewAllCompanies(){
        this.companyElasticSearch =[];
        this.contentElasticSearch = [];
        this.userElasticSearch = [];
        this.nameortype = "";
        this.http.get(environment.apiUrl+"/company/getCompanies").subscribe(res =>{
            this.companyElasticSearch= res['data'];
            this.companyElasticSearch.forEach(item => {
                item.tags=item.tags.split(",");
            });
            this.filterToSet = "All";
            this.searchResult=true;
            this.filterOn = false;
            this.router.navigateByUrl("/search/searchResult?key=" + "AllCompanies");
            console.log(this.companyElasticSearch);
        });
    }
    viewAllExperts(){
        this.companyElasticSearch =[];
        this.contentElasticSearch = [];
        this.userElasticSearch = [];
        this.nameortype = "";
        this.http.get(environment.apiUrl+"/User/viewUsers").subscribe(res =>{
            this.userElasticSearch = res['data'];
            this.userElasticSearch.forEach(item => {
                item.tags=item.tags.split(",");
            });
            this.searchResult=true;
            this.filterToSet = "All";
            this.filterOn = false;
            this.router.navigateByUrl("/search/searchResult?key=" + "Allexperts");
            console.log(this.userElasticSearch);

        });
    }
    sortPreferedContent(contentResult:any[]){
        console.log(JSON.parse(localStorage.getItem('userProps'))['tags']);
        var userTags = (JSON.parse(localStorage.getItem('userProps'))['tags']).split(',');
        var counterContent;
        var counterUserTags;
        var result = [];
        var loopBreak = false;
        var finalResult =[];
        var notPreferedContent =[];
        for(counterContent=0; counterContent<contentResult.length ; counterContent++){
            for(counterUserTags=0; counterUserTags<userTags.length &&loopBreak ==false; counterUserTags++){
                if(contentResult[counterContent]['tags'].match(new RegExp("(?:^|,)"+userTags[counterUserTags]+"(?:,|$)"))){
              result.push(contentResult[counterContent]);
              contentResult.splice(counterContent,1);
              counterContent--;
              loopBreak = true;
            }
        }
            loopBreak =false;
        }
        notPreferedContent = contentResult;
        finalResult = result.concat(notPreferedContent);
        return finalResult;
    }
}

