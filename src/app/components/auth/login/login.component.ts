import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  errorMessage : string = null;

  constructor(private authService : AuthService,
              private router : Router) { }

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
    this.authService.onLogin(this.userEmail.value, this.userPassword.value)
      .subscribe(responseData => {
        console.log(responseData);
        this.loginForm.reset();
        this.router.navigate(['/home']);
      }, errorRes => {
        this.errorMessage = errorRes;
      })
  }

  onCloseErrorAlert() {
    this.errorMessage = "";
  }

}
