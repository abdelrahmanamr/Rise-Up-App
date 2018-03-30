import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { ContentService } from './content.service';
import { CommonModule } from "@angular/common";
import {environment} from '../../../environments/environment';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard-content',
  template: `<form class="container" #contentForm="ngForm" (ngSubmit) = "postLink(contentForm.value)">
  Title :<br>
  <input type="text" name="title" ngModel>
  <br>
  Link :<br>
  <input type="text" name="body" ngModel>
  <br>
  Tags :<br>
  <input type="text" name="tags" ngModel>
  <br><br> 
  <input type="submit" value="Submit">
</form> `
})
export class ContentComponent implements OnInit{
  content:object =  {};
  constructor(private contentService: ContentService,private httpClient : HttpClient) {}
  ngOnInit() {

  }
 postLink(content){
 
  content = {
    "title": content.title,
    "type": "Link",
    "body": content.body,
    "tags":content.tags
  }
   this.contentService.postLink(content).subscribe(
res =>{
  console.log(res);
}
   )
 }

  
}