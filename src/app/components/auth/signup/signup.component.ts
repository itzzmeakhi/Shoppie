import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewUser } from './../../../shared/new-user.model';
import { AuthService } from '../auth.service';
import { BirthDateValidators } from '../../../validators/birthdate.validators';
import { PasswordValidators } from '../../../validators/password.validators';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  errorMessage : string = null;

  constructor(private authService : AuthService,
              private router : Router) { }

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
                                this.userPassword.value, 
                                [],
                                [],
                                null, 
                                null
                              );
    //console.log(newUserData);
    this.authService.onSignup(newUserData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/home']);
      }, errorRes => {
        this.errorMessage = errorRes;
      })
  }

  onCloseErrorAlert() {
    this.errorMessage = "";
  }

}