import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthenticateService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/menu/home"]);
      return false;
    }

    let role = next.data["role"] as string;
    console.log(role);
    if (this.authService.hasRole(role)) {
      return true;
    }
    // swal.fire(
    //   "Acceso denegado",
    //   `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`,
    //   "warning"
    // );
    this.router.navigate(["/login"]);
    return false;
  }
}