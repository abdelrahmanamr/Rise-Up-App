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
  loggedin:boolean;
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router
  ) {}

  ngOnInit() {
    if(localStorage.getItem("UserDoc")!=null){
      console.log("HERE");
      this.loggedin = true;
       this.user = JSON.parse(localStorage.getItem("user"))["username"];
       console.log(this.user);
    }
    else{
      this.loggedin = false;
    }
    this.userMenu = [{ title: 'Logout' }];
    this.onMenuItemClick();
    this.sidebarService.toggle(false, 'menu-sidebar');

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    return false;
  }

  goToHome() {
    console.log("HERasdE")
    localStorage.clear();
    window.location.reload();
   // this.router.navigateByUrl("/");
  }

  onMenuItemClick() {
    this.menuService.onItemClick().subscribe((bag: NbMenuBag) => {
      if (bag.item.title === 'Logout') {
        localStorage.clear();
    window.location.reload();
      }
    });
  }
}
