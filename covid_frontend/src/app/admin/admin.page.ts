import { Component, OnInit } from "@angular/core";
import { AuthenticateService } from "../services/authenticate.service";
import { Router } from "@angular/router";
import { Usuario } from "../model/Usuario";
@Component({
    selector: "app-admin",
    templateUrl: "./admin.page.html",
    styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {
    admin: any;
    private _usuario: Usuario;
    constructor(
        private authService: AuthenticateService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        //llamamos a la funcion getPost de nuestro servicio.
        this.authService.getAdmin().then((data) => {
            //   console.log(data);
            this.admin = data;
        });
    }

    editarUsuario(id) {
        console.log(id);
    }
}
