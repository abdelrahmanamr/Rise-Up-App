import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

@Component({
  selector: 'app-home',
  
  template: `
  <ngx-main-layout >
  <router-outlet>
  <!DOCTYPE html>
  <html>
  <title>W3.CSS</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <body>
  <div class="container">
  <img src="/assets/rise.jpg"  width="100%" height="300">
</div>
<div id="salma" class="w3-content w3-section" style="max-width:500px">
  
    <img class="mySlides w3-animate-fading" src="/assets/white.jpg" style="width:600px;height:75px">

    

  </div>
  <div id="salma" class="w3-content w3-section" style="max-width:500px">
  
    <img class="mySlides w3-animate-fading" src="/assets/1.png" style="width:600px;height:264px">


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
      setTimeout(carousel, 9000);    
  }
  </script>
  <div id="salma" class="w3-content w3-section" style="max-width:500px">
  
    <img class="mySlides w3-animate-fading" src="/assets/white.jpg" style="width:600px;height:264px">


  </div>

  <div id="salma" class="w3-content w3-section" style="max-width:500px">
  
    <img class="mySlides w3-animate-fading" src="/assets/2.png" style="width:600px;height:264px">

    

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
      setTimeout(carousel, 9000);    
  }
  </script>
  <div id="salma" class="w3-content w3-section" style="max-width:500px">
  
    <img class="mySlides w3-animate-fading" src="/assets/white.jpg" style="width:600px;height:264px">


  </div>
  <div id="access" class="w3-content w3-section" style="max-width:500px">
  
    <img class="mySlides w3-animate-fading" src="/assets/3.png" style="width:600px;height:264px">

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
      setTimeout(carousel, 9000);    
  }
  </script>
  <div id="salma" class="w3-content w3-section" style="max-width:500px">
  
    <img class="mySlides w3-animate-fading" src="/assets/white.jpg" style="width:600px;height:264px">


  </div>
  <div class="container">
  <iframe  width="1000" height="600" src="https://www.youtube.com/embed/-fQQxIa7mDc">
</iframe>
 </div>

  </body>
  <style>
  #vid{
    position:relative;
  }
  .container {
    position: relative;
}



img { 
    width: 100%;
    height: auto;
}
  
  </style>

  </html>
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
