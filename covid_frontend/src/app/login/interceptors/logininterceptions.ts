import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { AuthenticateService } from "../../services/authenticate.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService:AuthenticateService, private router: Router) {}

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
          this.router.navigate(["/menu/home"]);
        }

        if (e.status == 403) {
          // Swal.fire(
          //   "Acceso denegado",
          //   `Hola ${this.authService.usuario.email} no tienes acceso a este recurso!`,
          //   "warning"
          // );

          alert("ERRO 403");
          this.router.navigate(["/login"]);
        }
        return throwError(e);
      })
    );
  }
}
