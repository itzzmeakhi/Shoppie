import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm : FormGroup;
  errorMessage : string = null;
  userDetailsSubs : Subscription;
  userLoginSubs : Subscription;

  constructor(private authService : AuthService,
              private router : Router,
              private userService : UserService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userEmail' : new FormControl('', [ Validators.required, Validators.email ]),
      'userPassword' : new FormControl('', [ Validators.required ])
    });
  }

  get userEmail() {
    return this.loginForm.get('userEmail');
  }

  get userPassword() {
    return this.loginForm.get('userPassword');
  }

  onFormSubmit() {
    this.userLoginSubs = this.authService.onLogin(this.userEmail.value, this.userPassword.value)
      .subscribe(responseData => {
        console.log("Login Successfull");
        // console.log(responseData);
        this.loginForm.reset();
        this.userDetailsSubs = this.userService.getUser(responseData.localId)
          .subscribe(responseData => {
            // console.log(responseData);
            this.userService.userDetails.next(responseData);
            this.router.navigate(['/home']);
          })
      }, errorRes => {
        this.errorMessage = errorRes;
      })
  }

  onCloseErrorAlert() {
    this.errorMessage = "";
  }

  ngOnDestroy() {
    if(this.userLoginSubs) {
      this.userLoginSubs.unsubscribe();
    }

    if(this.userDetailsSubs) {
      this.userDetailsSubs.unsubscribe();
    }
  }

}
