import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { AuthenticateService } from '../services/authenticate.service';
@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  constructor(private authService:AuthenticateService ,private router: Router) {}

  canActivate(
   
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated() ) {
      if (this.isTokenExpirado()) {
        this.authService.logout();
        this.router.navigate(['/']);
        alert("no autorizado");
        return false;
      //  this.router.navigateByUrl("/login");
      }
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  isTokenExpirado(): boolean {
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
   
 
  
}

