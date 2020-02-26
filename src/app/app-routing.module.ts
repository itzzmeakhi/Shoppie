import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes : Routes = [
    { path : '', redirectTo : '/login', pathMatch : 'full' },
    { path : 'login', component : LoginComponent },
    { path : 'signup', component : SignupComponent },
    { path : 'home', component : HomeComponent }
];


@NgModule({
    imports : [ RouterModule.forRoot(appRoutes) ],
    exports : [ RouterModule ]
})
export class AppRoutingModule {}