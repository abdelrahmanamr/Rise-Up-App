import { Component, OnInit } from '@angular/core';

import {MENU_ITEMS} from "./admin-menu";

import {NbMenuItem} from "@nebular/theme/components/menu/menu.service";

import {Router} from "@angular/router";
@Component({
    selector: 'app-admin',
    template: `
    <ngx-main-layout>
      <nb-menu [items]="menu">
      </nb-menu>
        <router-outlet></router-outlet>
    </ngx-main-layout>
  `
})

export class AdminComponent implements OnInit {
    menu: NbMenuItem[];
    constructor(private router: Router){}


    ngOnInit() {
        this.menu = MENU_ITEMS;
        var y =   JSON.parse(localStorage.getItem('userProps'));
        console.log(y['admin']);
        if(y['admin']!=true){
            this.router.navigate(['/search']);
        }
    }
}