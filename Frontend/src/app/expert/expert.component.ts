import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './expert-menu';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-expert',
  template: `
    <ngx-main-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-main-layout>
  `
})
export class ExpertComponent implements OnInit {
  menu: NbMenuItem[];

  ngOnInit() {
    this.menu = MENU_ITEMS;
  }
}
