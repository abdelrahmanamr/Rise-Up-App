import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { NbMenuBag } from '@nebular/theme/components/menu/menu.service';
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';
  user: any;
  userMenu: any[];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userMenu = [{ title: 'Logout' }];
    this.onMenuItemClick();
    this.sidebarService.toggle(false, 'menu-sidebar');

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.router.navigateByUrl("/");
  }

  onMenuItemClick() {
    this.menuService.onItemClick().subscribe((bag: NbMenuBag) => {
      if (bag.item.title === 'Logout') {
        //Think about what to do ;)
      }
    });
  }
}
