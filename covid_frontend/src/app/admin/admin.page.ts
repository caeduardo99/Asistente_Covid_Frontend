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

    constructor(
        private authService: AuthenticateService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        this.authService.getUser().then((data) => {
            //   console.log(data);
            this.admin = data;
        });
    }

    editarUsuario(id) {
        // console.log(id);
        this.router.navigate(["editar", id]);
    }
}
