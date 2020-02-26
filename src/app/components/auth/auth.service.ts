import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { environment } from './../../../environments/environment';
import { NewUser } from './../../shared/new-user.model';
import { AuthenticatedUser } from './../../shared/authenticated-user.model';
import { AuthResponseData } from './auth-response-data.interface';



@Injectable({ providedIn : 'root' })
export class AuthService {

    user = new BehaviorSubject<AuthenticatedUser>(null);

    constructor(private httpClient : HttpClient) {}

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
                   null,
                   userData.localId
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
