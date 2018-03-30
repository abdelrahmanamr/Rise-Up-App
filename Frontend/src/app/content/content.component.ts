import { Component, OnInit, Injectable, ElementRef } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators,FormsModule} from "@angular/forms";
import { MENU_ITEMS } from './content-menu';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment' ;
import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-content',
  template: `
    
    <div class ="container">
    <form>
    <div class="form-group">
    <input type="file" id="selectFile" name="selectFile" class="btn btn-success" />
    <input type="button" class = "btn btn-primary" (click)="uploadImage()" value="Upload Image">
    </div>
    </form>          
    
  `
  ,
  styles : [`.spinner{
    visibility:hidden;
    position:absolute;
    margin-left:50%;
    margin-top:50%;
  }`]


})
@Injectable()
export class ContentComponent implements OnInit {
 
  constructor (private http: HttpClient,private router:Router,private elem : ElementRef){

  };
  ngOnInit() {
    
  }

  uploadImage()
  {
    this.elem.nativeElement.querySelector('#spinner').style.visibility='visible';
    let images = this.elem.nativeElement.querySelector('#selectImage').images; 
    let formdata = new FormData();
    let image = images[0];
    formdata.append('selectImage',image,image.name);
    var config = {headers :{
      'Content-Type' : 'application/json'
    }}
    this.http.post(environment.apiUrl+'content/uploadImage/'+formdata,config).subscribe(res=> 
      this.dataLoaded(res));
  }

  private dataLoaded(data:any):void{
    this.elem.nativeElement.querySelector('#spinner').sytle.visibility='hidden';
  }


}
