import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, take } from 'rxjs/operators';

import { NewUser } from 'src/app/shared/new-user.model';
import { Address } from './address.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn : 'root' })
export class UserService {

    userDetails = new BehaviorSubject<NewUser>(null);

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
                            userData[key].userSavedAddresses ? userData[key].userSavedAddresses : [],
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

    onAddAddress(rowId : string, address : Address[]) {
        return this.httpClient.put('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userSavedAddresses.json', address)
    }

    onDeleteAddress(rowId : string, modifiedAddresses : Address[]) {
        return this.httpClient.put('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userSavedAddresses.json', modifiedAddresses)
    }

    getAddress(rowId : string, index : string) {
        return this.httpClient.get<Address>('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userSavedAddresses/'+index+'.json');
    }

    onUpdateAddress(rowId : string, index : string, updatedAddress : Address) {
        return this.httpClient.patch('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userSavedAddresses/'+index+'.json', updatedAddress)
    }

    getUserId(rowId : string) {
        return this.httpClient.get<string>('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userId.json')
    }

    
}