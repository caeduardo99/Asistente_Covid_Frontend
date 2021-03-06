
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController } from '@ionic/angular';
import { NavController } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { AuthenticateService } from ".././services/authenticate.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})


export class MenuPage implements OnInit {
  areSideMenusInteractive :true;
  constructor(private menu:MenuController, private navCtrl: NavController,private storage:Storage,private auth_service:AuthenticateService, private router:Router ) { }

  ngOnInit() {
  }
 closeMenu(){
   this.menu.close()
 }

 
  salir(){
  var email = this.auth_service.usuario.email;
  this.auth_service.logout();
  this.router.navigate(['/inicio']);

}

}
