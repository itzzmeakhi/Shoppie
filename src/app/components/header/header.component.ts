import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { AuthenticatedUser } from '../../shared/authenticated-user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated : boolean;
  isAuthSubs : Subscription;
  userLoggedInDetails : AuthenticatedUser;


  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.isAuthSubs = this.authService.user.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        console.log("Authenticated");
        this.userLoggedInDetails = user;
        // console.log(this.isAuthenticated);     
      } else {
        this.isAuthenticated = false;
        console.log("Not Authenticated");
        // console.log(this.isAuthenticated);
      }
    })
  }

  // Triggers when user loggedOut

  onLogout() {
    this.authService.onLogout();
  }

  ngOnDestroy() {
    this.isAuthSubs.unsubscribe();
  }

}
