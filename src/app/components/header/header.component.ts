import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../../shared/user.service';
import { AuthenticatedUser } from '../../shared/authenticated-user.model';
import { NewUser } from 'src/app/shared/new-user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated : boolean;
  isAuthSubs : Subscription;
  userDetailsSubs : Subscription;
  userLoggedInDetails : AuthenticatedUser;
  userDetails : NewUser;
  isAdmin : boolean = false;


  constructor(private authService : AuthService,
              private userService : UserService) { }

  ngOnInit() {
    this.isAuthSubs = this.authService.user.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        console.log("Authenticated");
        this.userLoggedInDetails = user;
        // console.log(this.isAuthenticated);   
        this.userDetailsSubs = this.userService.userDetails
          .subscribe(userData => {
            if(userData) {
              this.userDetails = userData;
              this.isAdmin = this.userDetails.userType === "admin";
            }
          })  
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
    if(this.isAuthSubs) {
      this.isAuthSubs.unsubscribe();
    }

    if(this.userDetailsSubs) {
      this.userDetailsSubs.unsubscribe();
    }
  }

}
