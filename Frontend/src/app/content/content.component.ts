import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './content-menu';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-content',
  template: `
    <ngx-main-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-main-layout>

    <button>akram</button>
  `
})
export class ContentComponent implements OnInit {
  menu: NbMenuItem[];

  ngOnInit() {
    this.menu = MENU_ITEMS;
  }
}
