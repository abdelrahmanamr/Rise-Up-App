import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { MENU_ITEMS } from './search-menu';
import { HttpClient } from "@angular/common/http";
import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';
@Component({
    selector: 'app-search',
    template: `
    <ngx-main-layout >
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet>
      </router-outlet>
    </ngx-main-layout>

  `,

})
export class SearchComponent {
    menu: NbMenuItem[];

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.menu = MENU_ITEMS;
    }
}