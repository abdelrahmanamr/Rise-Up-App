import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: `edit.html`
 
 
})
export class EditComponent {
    data = {};
    ID:any;
    tags= [];
    biography:String;
    url:any;
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService){
    this.ID=JSON.parse(localStorage.getItem("userProps"))["_id"];
    console.log(this.ID);
  }


  ngOnInit() 
  {
    var config = {
        headers : {
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('UserDoc')
        }
    }

    this.http.get(environment.apiUrl+'User/viewUser/'+this.ID,config).
    subscribe(res =>{
        // console.log(res['data']);
        this.data = res['data'];
        this.ID = this.data['_id'];
        this.biography=this.data['biography'];
        if(res['data'].tags!=null){
        // this.tags = res['data'].tags.split(",");
        res['data'].tags.split(",").forEach(element => {
            var el = JSON.parse(JSON.stringify({"displayValue":element}));
            console.log(el);
            this.tags.push(el);
        });

          this.data['tags']=this.data['tags'].split(",");
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
        });


    // this.flag = true;




}


onSelectFile(event) { // called each time file input changes

    var reader:any,
    target:EventTarget;
    if (event.target.files && event.target.files[0]) {
      reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

    onSubmit(user){
        var result = this.tags.map(function(val) {
            return val.displayValue;
        }).join(',');
        var config = {
            headers : {
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem('UserDoc')
            }
        }
        var data = JSON.stringify({biography:user.biography,tags:result,imageURL:this.url});
        this.http.patch(environment.apiUrl+'user/edit/'+this.ID,data, config)
        .subscribe(res=> {
            window.location.reload();
        },err=>{
            this.toastr.error("",err['error']["msg"]);
            if(err.error["msg"]=="Login timed out, please login again." ||err.error["msg"]=='You have to login first before you can access this URL.' ){
              localStorage.clear();
              this.router.navigateByUrl("/search/searchresults")
            }     
          });
    }
}