import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn : 'root' })
export class AuthGuardService implements CanActivate {

    constructor(private authService : AuthService,
                private router : Router) {}

    canActivate(activatedRoute : ActivatedRouteSnapshot, routeState : RouterStateSnapshot) : 
    boolean |
    Promise<boolean | UrlTree> |
    Observable<boolean | UrlTree> |
    UrlTree {

        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = user ? true : false;

                if(isAuth) {
                    return true;
                }

                return this.router.createUrlTree(['/login']);
            })
        )



    }
}