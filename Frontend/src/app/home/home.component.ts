import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-home',
  
  template: `
  <ngx-main-layout >
  <router-outlet>
  <div class="rightbg">
  <!DOCTYPE html>
  <html>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <body>
  <div id="slider">

  <div class="w3-content w3-section" style="max-width:400px">
  
    <img class="mySlides w3-animate-fading" src="/assets/1.jpg" style="width:50%">

    </div>
    <button type="button" class="btn btn-default" (click)="go()">Click To Try</button>

  </div>
  
  <script>
  var myIndex = 0;
  carousel();
  
  function carousel() {
      var i;
      var x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
         x[i].style.display = "none";  
      }
      myIndex++;
      if (myIndex > x.length) {myIndex = 1}    
      x[myIndex-1].style.display = "block";  
      setTimeout(carousel, 15000);    
  }
  </script>
  <div id="slider">

  <div class="w3-content w3-section" style="max-width:400px">
  
    <img class="mySlides w3-animate-fading" src="/assets/2.jpg" style="width:50%">

    </div>
    <button type="button" class="btn btn-default" (click)="go()">Click To Try</button>

  </div>
  
  <script>
  var myIndex = 0;
  carousel();
  
  function carousel() {
      var i;
      var x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
         x[i].style.display = "none";  
      }
      myIndex++;
      if (myIndex > x.length) {myIndex = 1}    
      x[myIndex-1].style.display = "block";  
      setTimeout(carousel, 15000);    
  }
  </script>
  <div id="slider">

  <div class="w3-content w3-section" style="max-width:400px">
  
    <img class="mySlides w3-animate-fading" src="/assets/3.jpg" style="width:50%">

    </div>
    <button type="button" class="btn btn-default" (click)="go2()">Click To Try</button>

  </div>
  
  <script>
  var myIndex = 0;
  carousel();
  
  function carousel() {
      var i;
      var x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
         x[i].style.display = "none";  
      }
      myIndex++;
      if (myIndex > x.length) {myIndex = 1}    
      x[myIndex-1].style.display = "block";  
      setTimeout(carousel, 15000);    
  }
  </script>
  
  
  
  <style>
  .btn {
    background-color: #DB0C18;
    border: red;
    color: white;
    padding: 10px 10px;
    font-size: 14px;
    cursor: pointer;
    position:absolute;    
}
#slider{
 width:500px;
 height:200px;
 margin:20px auto;
 border:10px solid white;
 box-shadow: 0px 0px 5px 2px #ccc;
 position:relative;
}



/* Darker background on mouse-over */
.btn:hover {
    background-color: #FFE200;
}

  </style>

  </body>

  </html>
  </div>
  </router-outlet>
  </ngx-main-layout>
  `
})
export class HomeComponent implements OnInit {
  menu: NbMenuItem[];

  ngOnInit() {
   
  }
  go(){
    window.location.replace("#/search")
  }
  go2(){
    window.location.replace("#/content")
  }
}
