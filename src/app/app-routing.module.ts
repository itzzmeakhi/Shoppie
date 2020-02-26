import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuardService } from './components/auth/auth-guard.service';
import { ProductsComponent } from './components/home/products/products.component';
import { UserComponent } from './components/home/user/user.component';

const appRoutes : Routes = [
    { path : '', redirectTo : '/home', pathMatch : 'full' },
    { path : 'login', component : LoginComponent },
    { path : 'signup', component : SignupComponent },
    { path : 'home', component : HomeComponent, canActivate : [AuthGuardService], children : [
        { path : '', component : ProductsComponent },
        { path : 'user/:id', component : UserComponent}
    ] }
];


@NgModule({
    imports : [ RouterModule.forRoot(appRoutes) ],
    exports : [ RouterModule ]
})
export class AppRoutingModule {}