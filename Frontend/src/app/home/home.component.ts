import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';
import { Slider } from 'ngx-slider';

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
  
  <img  src="/assets/final.gif" style="width:55%;height:20%">

  

</div>
<div>
  <img src="/assets/grey.png"  width="80%" height="150px">
  
</div>
<h1>SNEAK PEEK OF OUR EVENTS</h1>


<div style="height: 400px;width:80%">
  <ngx-slider [init]="slider" ></ngx-slider>
</div>
<div>
  <img src="/assets/grey.png"  width="80%" height="300px">
  
</div>
<div>
  <iframe  width="65%" height="450"  src="https://www.youtube.com/embed/-fQQxIa7mDc">
</iframe>
 </div>
  </div>
  <style>
  

h1 {
    color: #DB0C18;
   font-weight:bolder;
   align:center;
   font-family: helvetica;
   font-size: 35;
   position: relative;
    left: 16.2%;
}
iframe{
  position: relative;
    left: 85px;
}

  </style>

 
  </router-outlet>
  </ngx-main-layout>
  `,
  styles: ["../node_modules/font-awesome/css/font-awesome.min.css"]

})
export class HomeComponent implements OnInit {
  public slider = new Slider();
 
  constructor() {
    this.slider.config.loop = true;
    this.slider.config.showPreview = false;
    this.slider.config.showDots = true;
    this.slider.config.showTitle = false;

  }
  ngOnInit() {
    const slideItems = [
      { src: '/assets/rise12.png' },
      { src: '/assets/rise10.png' },
      { src: '/assets/rise7.png' },
      { src: '/assets/rise9.png' },
      { src: '/assets/rise2.png' },
      { src: '/assets/rise11.png' },
      { src: '/assets/rise1.png' },
      { src: '/assets/rise5.png' },
      { src: '/assets/rise3.png' },
      { src: '/assets/rise8.png' },
      { src: '/assets/rise15.png' },
      { src: '/assets/rise14.png' },
      { src: '/assets/rise13.png' },
      { src: '/assets/rise4.png' },
      { src: '/assets/rise6.png' },
      { src: '/assets/rise16.png' }
    ];
 
    this.slider.items = slideItems;
  }
  
}
