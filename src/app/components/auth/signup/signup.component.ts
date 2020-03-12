import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { NewUser } from './../../../shared/new-user.model';
import { AuthService } from '../auth.service';
import { UserService } from '../../../shared/user.service';
import { BirthDateValidators } from '../../../validators/birthdate.validators';
import { PasswordValidators } from '../../../validators/password.validators';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm : FormGroup;
  errorMessage : string = null;
  signUpSubs : Subscription;
  getUserIdSubs : Subscription;
  getUserDetailsSubs : Subscription;

  constructor(private authService : AuthService,
              private router : Router,
              private userService : UserService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userName' : new FormControl('', [ Validators.required ]),
      'userEmail' : new FormControl('', [ Validators.required, Validators.email ]),
      'userPassword' : new FormControl('', [ Validators.required, PasswordValidators.passwordHasNoNumber, PasswordValidators.passwordHasNoUppercase, PasswordValidators.passwordHasNoLowercase, 
        PasswordValidators.passwordHasNoSpecialCharacters, PasswordValidators.passwordHasNoMinimumLength ]),
      'userContactNumber' : new FormControl('', [ Validators.required, Validators.pattern('[6-9][0-9]{9}') ]),
      'userGender' : new FormControl('', [ Validators.required ]),
      'userDOB' : new FormControl('', [ Validators.required, Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}'), BirthDateValidators.notValidBirthDate ])
    })
  }

  get userName() {
    return this.signupForm.get('userName');
  }

  get userEmail() {
    return this.signupForm.get('userEmail');
  }

  get userPassword() {
    return this.signupForm.get('userPassword');
  }

  get userContactNumber() {
    return this.signupForm.get('userContactNumber');
  }

  get userGender() {
    return this.signupForm.get('userGender');
  }

  get userDOB() {
    return this.signupForm.get('userDOB');
  }

  // Triggers when user form is submitted

  onFormSubmit() {
    const newUserData = new NewUser(
                                this.userName.value, 
                                this.userEmail.value, 
                                this.userContactNumber.value, 
                                this.userGender.value, 
                                this.userDOB.value, 
                                'User', 
                                'Somewhere in the World', 
                                'https://firebasestorage.googleapis.com/v0/b/shoppie-4c4f4.appspot.com/o/account.png?alt=media&token=8dc5bea1-855c-47e9-b258-dd06eb9a10c4',
                                [],
                                'buyer', 
                                this.userPassword.value,
                                [],
                                [],
                                null, 
                                null
                              );
    //console.log(newUserData);
    this.signUpSubs = this.authService.onSignup(newUserData)
      .subscribe(response => {
        console.log(response.rowId);
        this.getUserIdSubs = this.userService.getUserId(response.rowId)
          .subscribe(userIdData => {
            this.getUserDetailsSubs = this.userService.getUser(userIdData)
              .subscribe(userData => {
                this.userService.userDetails.next(userData);
                if(userData.userType === "admin") {
                  this.router.navigate(['/home/admin']);
                } else {
                  this.router.navigate(['/home']);
                }
              })
          })
      }, errorRes => {
        this.errorMessage = errorRes;
      })
  }

  // Triggers when a close alert button is clicked

  onCloseErrorAlert() {
    this.errorMessage = "";
  }

  ngOnDestroy() {
    if(this.signUpSubs) {
      this.signUpSubs.unsubscribe();
    }

    if(this.getUserIdSubs) {
      this.getUserIdSubs.unsubscribe();
    }

    if(this.getUserDetailsSubs) {
      this.getUserDetailsSubs.unsubscribe();
    }
  }

}