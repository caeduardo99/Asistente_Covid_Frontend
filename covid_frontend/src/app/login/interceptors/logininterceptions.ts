import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { AuthService } from "../auth.service";
import swal from "sweetalert2";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e) => {
        if (e.status == 401) {
          alert("ERRO 401");
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
        //  alert("ERRO 401");
          this.router.navigate(["/"]);
        }

        if (e.status == 403) {
          swal.fire(
            "Acceso denegado",
            `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`,
            "warning"
          );
          alert("ERRO 403");
          this.router.navigate(["/inicio"]);
        }
        return throwError(e);
      })
    );
  }
}
