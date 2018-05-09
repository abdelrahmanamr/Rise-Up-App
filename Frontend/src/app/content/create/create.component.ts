
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);
/*  Contributers : Karim Elghandour , Khaled Aboelnaga , Ahmed Hossam , Ali Amr
    Methods : onTagsChanged , ChangeType , ngOnInit , uploadImage , onSelectFile , setFocus , onSubmit
    Date Edited : 5/5/2018
 */
@Component({
	selector: 'app-content-create',
	templateUrl: 'create.html',
	styleUrls: ['style.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  modules = {};
  types: string[] = ["Post", "Link"];
  typeToSet: string = "Post";
  user = null;
  post: Number;
  url = "";
  errorHandle = "";
  editor: any;
  editor_text = "";
  quill: any;
  tags: any = [];
  text = "";
  isSubmitted = false;




  constructor(private http: HttpClient, private router: Router, fb: FormBuilder, private elem: ElementRef,
    private toastr: ToastrService) {
      this.user = JSON.parse(localStorage.getItem("userProps"));
      if (this.user == null) {
        this.router.navigate(["/user"]);
      }
    this.form = fb.group({
      editor: ['']
    });




  }
  onTagsChanged($event) {



  }
  changeType(select) {
    if (this.typeToSet == "Link") {
      this.post = 1;
    } else {
      this.post = 0;
    }
  }

  ngOnInit() {



    this.post = 0;
    this.quill = new Quill("#editor", {
      theme: "snow",

      modules: {
        toolbar: '#toolbar-container',
        blotFormatter: {}
      },

    });
    


  }

  uploadImage() {
    let images = this.elem.nativeElement.querySelector('#selectImage').images;
    let formdata = new FormData();
    let image = images[0];
    formdata.append('selectImage', image, image.name);
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.http.post(environment.apiUrl + 'content/uploadImage/' + formdata, config).subscribe(res =>
      this.dataLoaded(res));
  }

  private dataLoaded(data: any): void {
    this.elem.nativeElement.querySelector('#spinner').sytle.visibility = 'hidden';
  }

  onSelectFile(event) { // called each time file input changes

    var reader: any,
      target: EventTarget;
    if (event.target.files && event.target.files[0]) {
      reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }


  setFocus($event) {
    $event.focus();
  }

  onSubmit = function (content) {

    var data: any;
    this.isSubmitted = true;
    var result = this.tags.map(function (val) {
      return val.displayValue;
    }).join(',');

    if (this.post == 2 && this.url == "") {
      this.text = "Please add a photo";
    } else {

      if (this.post == 0) {
        data = JSON.stringify({ title: content.title, type: "Post", body: this.quill.root.innerHTML, intro: content.intro, coverImage: this.url, tags: result, userid: this.user['_id'] })
      } else if (this.post == 1) {
        data = JSON.stringify({ title: content.title, type: "Link", body: content.link, tags: result, userid: this.user['_id'] })
      }
      var config = {
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('UserDoc')
        }
      }

      if (this.user['admin']) {//if this user is an admin content will be added
        this.http.post(environment.apiUrl + '/content/addContent', data, config)
          .subscribe(res => {
            var tags = res["data"]["tags"];
            var object = res["data"];
            var JSONtoIndex = {
              "tags": tags,
              "objectId": res["data"]._id,
              "title": res['data'].title
            }
            this.http.post(environment.apiUrl + 'search/addToContentIndex', JSONtoIndex, config)
              .subscribe(res => {
                var JSONtoContentIndex = {
                  "name": content.title,
                  "object": object,
                  "type": "Content"
                }
                this.http.post(environment.apiUrl + 'search/addToContentIndex', JSONtoContentIndex, config).subscribe(
                  res => {
                    this.router.navigateByUrl("/search/searchResult?key=AllContent");
                  }
                )

              },
                err => { });
          }, err => {
            this.toastr.error("", err['error']["msg"]);
            if (err.error["msg"] == "Login timed out, please login again." || err.error["msg"] == 'You have to login first before you can access this URL.') {
              localStorage.clear();
              this.router.navigateByUrl("/search/searchresults")
            }
          });
      }
      else {// If this user is not an admin the content will be suggested not added,calling add suggeted content in the backend
        this.http.post(environment.apiUrl + '/suggestedcontent/addSuggestedContent', data, config)
          .subscribe(res => {
            this.router.navigate(["/suggestedcontent/viewSuggestedContents/"])
          }, err => {
            this.toastr.error("", err['error']["msg"]);
            if (err.error["msg"] == "Login timed out, please login again." || err.error["msg"] == 'You have to login first before you can access this URL.') {
              localStorage.clear();
              this.router.navigateByUrl("/search/searchresults")
            }
          });
      }

    }
  }
}
