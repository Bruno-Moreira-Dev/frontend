import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

import { TokenService } from '../Services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenService = this.injector.get(TokenService);

    if (tokenService.loggedIn()) {
      const authRequest = request.clone(
        {setHeaders: {Authorization: `Bearer ${tokenService.isValid}`}});
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }

    // obtendo-se o request ao fazer a requisição ao server
    console.log('intercepting', request);

  }
}
