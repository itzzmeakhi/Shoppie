import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { NewUser } from 'src/app/shared/new-user.model';

@Injectable({ providedIn : 'root' })
export class UserService {

    constructor(private httpClient : HttpClient) {}

    getUser(userId : string) {
        return this.httpClient.get<NewUser>('https://shoppie-4c4f4.firebaseio.com/users.json?orderBy="userId"&equalTo="'+userId+'"')
        .pipe(
            map(userData => {
                for(const key in userData) {
                    if(userData.hasOwnProperty(key)) {
                        return {
                            id : key,
                            ...userData[key]
                        }
                    }
                }
            })
        )
    }
}