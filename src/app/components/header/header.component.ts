import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated : boolean;
  isAuthSubs : Subscription;


  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.isAuthSubs = this.authService.user.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        console.log("Authenticated");
        console.log(this.isAuthenticated);     
      } else {
        this.isAuthenticated = false;
        console.log("Not Authenticated");
        console.log(this.isAuthenticated);
      }
    })
  }

  onLogout() {
    this.authService.onLogout();
  }

  ngOnDestroy() {
    this.isAuthSubs.unsubscribe();
  }

}
