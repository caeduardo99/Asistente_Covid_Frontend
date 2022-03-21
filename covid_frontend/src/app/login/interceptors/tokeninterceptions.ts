import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticateService } from "../../services/authenticate.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService:AuthenticateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let token = this.authService.token;

    if (token != null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}