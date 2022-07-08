import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-animated-splash',
  templateUrl: './animated-splash.page.html',
  styleUrls: ['./animated-splash.page.scss'],
})
export class AnimatedSplashPage implements OnInit {

  constructor(public router:Router) { 
    setTimeout(()=>{
      this.router.navigateByUrl('/admin');
    },2000);
  }

  ngOnInit() {
  }

}
