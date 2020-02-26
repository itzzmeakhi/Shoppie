import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';

import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';


@Injectable({ providedIn : 'root' })
export class IsAuthenticatedInterceptorService implements HttpInterceptor {

    constructor(private authService : AuthService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) {
                    return next.handle(request);
                }

                const modifiedReq = request.clone({
                    params : new HttpParams().set('auth', user.idToken)
                });

                return next.handle(modifiedReq);
            })
        )
    }
}