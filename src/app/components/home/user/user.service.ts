import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, take } from 'rxjs/operators';

import { NewUser } from 'src/app/shared/new-user.model';

@Injectable({ providedIn : 'root' })
export class UserService {

    constructor(private httpClient : HttpClient) {}

    getUser(userId : string) {
        return this.httpClient.get<NewUser>('https://shoppie-4c4f4.firebaseio.com/users.json?orderBy="userId"&equalTo="'+userId+'"')
        .pipe(
            take(1),
            map(userData => {
                for(const key in userData) {
                    if(userData.hasOwnProperty(key)) {
                        return new NewUser(
                            userData[key].userName,
                            userData[key].userEmail,
                            userData[key].userContactNumber,
                            userData[key].userGender,
                            userData[key].userDOB,
                            userData[key].userDisplayName,
                            userData[key].userLocation,
                            userData[key].userImageUrl,
                            null,
                            userData[key].userId,
                            key
                        )
                    }
                }
            })
        )
    }

    onUpdateUserDetails(userData : NewUser, rowId : string) {
        return this.httpClient.put('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'.json', userData)
    }

    
}