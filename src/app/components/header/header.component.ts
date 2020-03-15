import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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

  @ViewChild('closeNavbarToggle', { static : false }) closeNavbarToggle : ElementRef;


  constructor(private authService : AuthService,
              private userService : UserService,
              private router : Router) { }

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
              this.isAdmin = this.userDetails.userType === "admin" ? true : false;
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
    //this.closeNavbarToggle.nativeElement.click();
    this.authService.onLogout();
  }

  // Triggers when navigate to home button is clicked

  onNavigateToHome() {
    //this.closeNavbarToggle.nativeElement.click();
    this.router.navigate(['/home']);
  }

  // Triggers when navigate to addProduct button is clicked

  onNavigateToAddProduct() {
    var isMobile = /iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.closeNavbarToggle.nativeElement.click();
    }
    //this.closeNavbarToggle.nativeElement.click();
    if(this.isAdmin) {
      this.router.navigate(['/home/admin/add/product']);
    }
  }

  // Triggers when navigate to addBrand button is clicked

  onNavigateToAddBrand() {
    //this.closeNavbarToggle.nativeElement.click();
    if(this.isAdmin) {
      this.router.navigate(['/home/admin/add/brand']);
    }
  }

  // Triggers when navigate to addCategory button is clicked

  onNavigateToAddCategory() {
    //this.closeNavbarToggle.nativeElement.click();
    if(this.isAdmin) {
      this.router.navigate(['/home/admin/add/category']);
    }
  }

  // Triggers when navigate to addSeller button is clicked

  onNavigateToAddSeller() {
    //this.closeNavbarToggle.nativeElement.click();
    if(this.isAdmin) {
      this.router.navigate(['/home/admin/add/seller']);
    }
  }

  // Triggers when navigate to cart button is clicked

  onNavigateToCart() {
    //this.closeNavbarToggle.nativeElement.click();
    if(!this.isAdmin) {
      this.router.navigate(['/home/user', this.userLoggedInDetails.localId, 'cart']);
    }
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
