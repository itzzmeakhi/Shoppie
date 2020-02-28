import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { environment } from './../../../environments/environment';
import { NewUser } from './../../shared/new-user.model';
import { AuthenticatedUser } from './../../shared/authenticated-user.model';
import { AuthResponseData } from './auth-response-data.interface';



@Injectable({ providedIn : 'root' })
export class AuthService {

    user = new BehaviorSubject<AuthenticatedUser>(null);
    private expirationTimer : any = null;

    constructor(private httpClient : HttpClient,
                private router : Router) {}

    // Handles Signup Feature

    onSignup(newUserData : NewUser) {
        // console.log(newUserData);
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseKey,
            {
                email : newUserData.userEmail,
                password : newUserData.userPassword,
                returnSecureToken : true
            }     
        )
        .pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }),
            switchMap(userData => {
                const newUser = new NewUser(
                   newUserData.userName,
                   newUserData.userEmail,
                   newUserData.userContactNumber,
                   newUserData.userGender,
                   newUserData.userDOB,
                   newUserData.userDisplayName,
                   newUserData.userLocation,
                   newUserData.userImageUrl,
                   newUserData.userSavedAddresses,
                   null,
                   userData.localId,
                   null
                );

                return this.httpClient.post('https://shoppie-4c4f4.firebaseio.com/users.json', newUser);
            })
        )
    }

    // Handles Login Feature

    onLogin(email : string, password : string) {
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseKey,
            {
                email : email,
                password : password,
                returnSecureToken : true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
        )

    }

    // To Handle Auto Login Feature

    onAutoLogin() {
        const userDataStored : {
            email : string,
            localId : string,
            _idToken : string,
            _tokenExpirationDate : string
        } = JSON.parse(localStorage.getItem('userLoggedInShoppie'));

        // console.log("USER_DATA_STORED");
        // console.log(userDataStored);

        if(!userDataStored) {
            return;
        }

        const loggedInUser = new AuthenticatedUser(
            userDataStored.email,
            userDataStored.localId,
            userDataStored._idToken,
            new Date(userDataStored._tokenExpirationDate)
        );

        // console.log("LOGGED_IN_USER_DATA");
        // console.log(loggedInUser);

        if(loggedInUser.idToken) {
            console.log("Auto Login");
            // console.log(loggedInUser);
            this.user.next(loggedInUser);
            this.router.navigate(['/home']);
            const expiresIn : number = new Date(userDataStored._tokenExpirationDate).getTime() - new Date().getTime();
            this.onAutoLogout(expiresIn);
        } else {
            return;
        }
    }

    // To Handle Logout Feature

    onLogout() {
        this.user.next(null);
        localStorage.removeItem('userLoggedInShoppie');
        if(this.expirationTimer) {
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;
        this.router.navigate(['/login']);
    }

    // To Handle Auto Logout Feature
    // Time in Milli Seconds

    onAutoLogout(expiresIn : number) {
        this.expirationTimer = setTimeout(() => {
            this.onLogout();
        }, expiresIn);
    }

    // To Handle Authenticated User

    private handleAuthentication(email : string, id : string, token : string, expires : number) {
        const expirationDate = new Date(new Date().getTime() + (expires * 1000));

        const authUser = new AuthenticatedUser(
            email,
            id,
            token,
            expirationDate
        );

        localStorage.setItem('userLoggedInShoppie', JSON.stringify(authUser));
        this.onAutoLogout(expires * 1000);
        this.user.next(authUser);
    }

    // To Handle Errors

    private handleError(errorResponse : HttpErrorResponse) {
        
        let errorMessage = "An Unknown error occurred!";

        if(!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "Email already exists..!!";
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = "Unable to Sign In. You are temporarily blocked from signing in.";
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = "Unusual activity detected! Try signing in after some time.";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "Hey! You\'re not registered";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Wrong Password!";
                break;
            case 'USER_DISABLED':
                errorMessage = "User has been blocked by the admin.";
                break;
            default:
                errorMessage = "An Unknown error occurred!";
                break;
        }

        return throwError(errorMessage);
        
    }

}
