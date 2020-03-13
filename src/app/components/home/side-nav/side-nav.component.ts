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
  isAdmin : boolean;

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
        if(userLoggedInDetails) {
          this.userLoggedInDetails = userLoggedInDetails;
          // console.log(this.userLoggedInDetails);
          this.isAdmin = this.userLoggedInDetails.userType === "admin";
          // console.log(this.isAdmin);
        }
      })
  }

  // Triggers when viewUserProfile button is clicked

  onViewUserProfile() {
    this.router.navigate(['/home/user', this.userLoggedInDetails.userId]);
  }

  // Triggers when viewUserAddress button is clicked

  onViewUserAddress() {
    console.log(this.userLoggedInDetails.rowId);
    this.router.navigate(['/home/user', this.userLoggedInDetails.rowId, 'addresses']);
  }

  // Triggers when viewUserOrders button is clicked

  onViewUserOrders() {
    this.router.navigate(['/home/user', this.userLoggedInDetails.userId, 'orders']);
  }

  // Triggers when filterProducts button is clicked

  onFilterProducts() {
    this.router.navigate(['/home/products/filter']);
  }

  onViewUsersInsights() {
    this.router.navigate(['/home/admin']);
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
