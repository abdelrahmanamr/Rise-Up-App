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
       this.user = JSON.parse(localStorage.getItem("userProps"));
       this.adminStatus =JSON.parse(localStorage.getItem('userProps'))['admin'];
    }
    else{
      this.loggedin = false;
    }
    

    this.userMenu = [{title:"Edit Profile"},{title:"Change password"},{title:"Apply to be an Expert"},{title:"Suggest Company"},{ title: 'Logout' }];
    this.sidebarService.toggle(false, 'menu-sidebar');

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.router.navigateByUrl("/");
  }

  logOut(){
    localStorage.clear();
    localStorage.removeItem('userProps');
    this.loggedin = false;
    this.user = null;
    this.adminStatus = false;
    window.location.reload();
  }

}
