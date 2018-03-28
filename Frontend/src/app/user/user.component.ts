import { Component} from '@angular/core';



@Component({
  selector: 'app-user',
  template: `<ngx-main-layout>
  <nb-menu [items]="menu"></nb-menu>
  <router-outlet></router-outlet>
  </ngx-main-layout>
  `
})
export class UserComponent {
}
