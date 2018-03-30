import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
=======
import { MENU_ITEMS } from './expert-menu';

>>>>>>> ReadingContent
import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-expert',
  template: `
    <ngx-main-layout>
<<<<<<< HEAD
=======
      <nb-menu [items]="menu"></nb-menu>
>>>>>>> ReadingContent
      <router-outlet></router-outlet>
    </ngx-main-layout>
  `
})
export class ExpertComponent implements OnInit {
  menu: NbMenuItem[];

  ngOnInit() {
<<<<<<< HEAD
   
  }
}
=======
    this.menu = MENU_ITEMS;
  }
}
>>>>>>> ReadingContent
