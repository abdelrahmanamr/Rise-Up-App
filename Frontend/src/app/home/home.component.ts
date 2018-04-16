import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-home',
  template: `<head>
  <title>HTML Reference</title>
</head>
   
  `
})
export class HomeComponent implements OnInit {
  menu: NbMenuItem[];

  ngOnInit() {
   
  }
}
