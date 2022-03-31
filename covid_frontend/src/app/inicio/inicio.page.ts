import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavController,AlertController } from "@ionic/angular";
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }
  goToLogin(){
    this.router.navigate(['/login'], { skipLocationChange: true });
  }
  gotoRegister() {
    this.router.navigate(['/register'], { skipLocationChange: true });
  }
}
