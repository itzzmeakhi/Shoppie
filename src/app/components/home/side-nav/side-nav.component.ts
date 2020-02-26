import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { AuthenticatedUser } from 'src/app/shared/authenticated-user.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {

  userLoggedIn : AuthenticatedUser;
  userSubs : Subscription;

  constructor(private router : Router,
              private authService : AuthService) { }

  ngOnInit() {
    this.userSubs = this.authService.user.subscribe(userData => {
      this.userLoggedIn = userData;
    })
  }

  onViewUserProfile() {
    this.router.navigate(['/home/user', this.userLoggedIn.localId]);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

}
