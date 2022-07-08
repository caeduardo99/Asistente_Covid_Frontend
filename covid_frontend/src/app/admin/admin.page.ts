import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  admin:any; 
  constructor(private authService: AuthenticateService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() { //llamamos a la funcion getPost de nuestro servicio.
    this.authService.getAdmin()
    .then(data => {
      this.admin = data;
    });
}
}
