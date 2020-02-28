import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { AuthenticatedUser } from 'src/app/shared/authenticated-user.model';
import { UserService } from '../../../shared/user.service';
import { NewUser } from 'src/app/shared/new-user.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {

  userLoggedIn : AuthenticatedUser;
  userSubs : Subscription;
  userDetailsSubs : Subscription;
  userLoggedInDetails : NewUser;

  constructor(private router : Router,
              private authService : AuthService,
              private userService : UserService) { }

  // ngOnInit() {
  //   this.userSubs = this.authService.user.subscribe(userData => {
  //     this.userLoggedIn = userData;
  //     this.fetchUserData();
  //   })
  // }

  // private fetchUserData() {
  //   if(this.userLoggedIn) {
  //     this.userDetailsSubs = this.userService.getUser(this.userLoggedIn.localId)
  //       .subscribe(userData => {
  //         this.userLoggedInDetails = userData;
  //       })
  //   }
  // }

  ngOnInit() {
    this.userService.userDetails
      .subscribe(userLoggedInDetails => {
        this.userLoggedInDetails = userLoggedInDetails;
        //console.log(this.userLoggedInDetails);
      })
  }

  onViewUserProfile() {
    this.router.navigate(['/home/user', this.userLoggedInDetails.userId]);
  }

  onViewUserAddress() {
    this.router.navigate(['/home/user', this.userLoggedInDetails.userId, 'addresses']);
  }

  ngOnDestroy() {

    if(this.userSubs) {
      this.userSubs.unsubscribe();
    }

    if(this.userDetailsSubs) {
      this.userDetailsSubs.unsubscribe();
    }

  }

}
