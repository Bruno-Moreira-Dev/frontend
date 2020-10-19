import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { TokenService } from '../Services/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req, next): any {
    const token = this.tokenService.getToken();
    if (token) {
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenService.getToken()}`
          // Authorization: `Bearer xx.yy.zz`

        }
      });

      return next.handle(tokenizedReq);
    } else {


      return next.handle(req);
    }
  }

}
