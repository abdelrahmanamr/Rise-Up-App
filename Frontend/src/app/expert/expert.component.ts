import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-expert',
  template: `
    <ngx-main-layout>
      <router-outlet></router-outlet>
    </ngx-main-layout>
  `
})
export class ExpertComponent implements OnInit {
  menu: NbMenuItem[];

  ngOnInit() {
   
  }
}
