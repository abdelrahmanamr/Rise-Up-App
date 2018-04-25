import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-home',
  
  template: `
  <ngx-main-layout >
  <router-outlet>
  <div class="rightbg">
  <div>
  <img src="/assets/grey.png"  width="80%" height="30px">
  
</div>
  <div>
  <img src="/assets/connect.png"  align="right" width="90px" height="400px">
  
</div>
<div>
  <img src="/assets/grey.png"  width="80%" height="65px">
  
</div>

  <div>
  
  <img  src="/assets/final.gif" style="width:55%;height:20%">

  

</div>
<div>
  <img src="/assets/grey.png"  width="80%" height="200">
  
</div>
<div>
  <iframe  width="80%" height="400px" src="https://www.youtube.com/embed/-fQQxIa7mDc">
</iframe>
 </div>
  </div>
  
 
  </router-outlet>
  </ngx-main-layout>
  `,
  styles: [``]

})
export class HomeComponent implements OnInit {

  ngOnInit() {
   
  }
  go(){
    window.location.replace("#/search")
  }
  go2(){
    window.location.replace("#/content")
  }
}
