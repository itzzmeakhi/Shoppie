import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { UserService } from '../../shared/user.service';

@Injectable({ providedIn : 'root' })
export class IsBuyerGuardService implements CanActivate {

    constructor(private userService : UserService,
                private router : Router) {}

    canActivate(activatedRouteSnapshot : ActivatedRouteSnapshot, routerStateSnapshot : RouterStateSnapshot) : 
    boolean |
    Promise<boolean | UrlTree> |
    Observable<boolean | UrlTree> |
    UrlTree {

        return this.userService.userDetails.pipe(
            take(1),
            map(userDetails => {
                const isBuyer = userDetails.userType === "buyer";
                
                if(isBuyer) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/home']);
                }
            })
        )

        

        return true;
    }
}