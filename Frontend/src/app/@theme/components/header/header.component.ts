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
  adminStatus:boolean = false;
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router
  ) {}

  searchPage(){

      this.router.navigateByUrl("/search/searchResult");


  }
  ngOnInit() {
    if(localStorage.getItem("UserDoc")!=null){
      this.loggedin = true;
       this.user = JSON.parse(localStorage.getItem("userProps"))["username"];
       this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
    }
    else{
      this.loggedin = false;
    }
    

    this.userMenu = [{title:"Edit Profile"},{title:"Change password"},{title:"Apply to be an Expert"},{ title: 'Logout' }];
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
        localStorage.clear();
        localStorage.removeItem('userProps');
        this.loggedin = false;
        this.user = null;
        this.adminStatus = false;
        window.location.reload();
      }else if (bag.item.title === 'Change password') {
        this.router.navigateByUrl('/user/changePassword');
        window.location.reload();
      }else if (bag.item.title === 'Edit Profile'){
        this.router.navigateByUrl('/user/editProfile');
      }else if (bag.item.title === 'Apply to be an Expert') {
          this.router.navigateByUrl("/user/applyExpert");
      }
      
     
    });
  }

}
