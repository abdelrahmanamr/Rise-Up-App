import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-company',
  template: `
    <ngx-main-layout>
      <router-outlet></router-outlet>
    </ngx-main-layout>
  `
})
export class CompanyComponent implements OnInit {
  menu: NbMenuItem[];

  ngOnInit() {
   
  }
}