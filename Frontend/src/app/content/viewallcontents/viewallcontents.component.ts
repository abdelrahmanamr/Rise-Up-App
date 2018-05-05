import { ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
/*  Contributers : Ahmed Akram
    Methods : ngOnInit ,  ViewContents , views , ViewContent , EditContent
    Date Edited : 5/5/2018
*/
@Component({
  selector: 'app-dashboard-items',
  templateUrl: `viewallcontents.html`
})
export class ViewAllContentsComponent {
  public contents: any[] = [];
  adminStatus: boolean = false;
  View: number;

  constructor(private http: HttpClient, private httpClient: HttpClient, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {


    if (localStorage.getItem("UserDoc") != null) {
      this.adminStatus = JSON.parse(localStorage.getItem('userProps'))['admin'];
    }

    this.ViewContents();
  }

  ViewContents() {
    this.httpClient.get(environment.apiUrl + 'Content/viewContents').subscribe(
      res => {
        this.contents = res['data'];
        this.contents.forEach(content => {
          content.tags = content.tags.split(",");
        });

      }
    );
  }



  views(ID: string) { // this method calls a patch request to the method "views" in the ContentController in the backend 

    var config = {
      headers:
        {
          'Content-Type': 'application/json'
        }
    }

    this.httpClient.patch(environment.apiUrl + '/Content/views/' + ID, config).subscribe(
      res => {
      }
    )

  }


  ViewContent(ID: string) {
    this.views(ID);
    this.router.navigate(['/content/viewcontent/' + ID]);


  }


  EditContent(ID: string) {
    var editContent = {
      "id": ID,
      "type": "content"
    }
    localStorage.setItem("editContent", JSON.stringify(editContent));
    this.router.navigateByUrl('/content/edit');

  }


}
