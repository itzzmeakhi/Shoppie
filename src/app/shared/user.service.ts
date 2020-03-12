import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, take } from 'rxjs/operators';

import { NewUser, UserCart } from 'src/app/shared/new-user.model';
import { Address } from './address.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn : 'root' })
export class UserService {

    userDetails = new BehaviorSubject<NewUser>(null);

    constructor(private httpClient : HttpClient) {}

    // To get user using userId

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
                            userData[key].userType,
                            null,
                            userData[key].userCartItems ? userData[key].userCartItems : [],
                            userData[key].userOrders ? userData[key].userOrders : [],
                            userData[key].userId,
                            key
                        )
                    }
                }
            })
        )
    }

    // To get all user details 

    getUsers() {
        const userType : string = "buyer";
        return this.httpClient.get<NewUser>('https://shoppie-4c4f4.firebaseio.com/users.json?orderBy="userType"&equalTo="'+userType+'"')
        .pipe(
            map(userData => {
                const usersData = [];
                for(const key in userData) {
                    if(userData.hasOwnProperty(key)) {           
                        const user = {
                            'userName' : userData[key].userName,
                            'userEmail' : userData[key].userEmail,
                            'userImageUrl' : userData[key].userImageUrl,
                            'userId' : userData[key].userId,
                            'rowId' : key
                        };
                        usersData.push(user);
                    }
                }
                return usersData;
            })
        )
    }

    // To Update User Details using rowId

    onUpdateUserDetails(userData : NewUser, rowId : string) {
        return this.httpClient.put('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'.json', userData)
    }

    // To Add Address using rowId

    onAddAddress(rowId : string, address : Address[]) {
        return this.httpClient.put('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userSavedAddresses.json', address)
    }

    // To Delete Address using rowId

    onDeleteAddress(rowId : string, modifiedAddresses : Address[]) {
        return this.httpClient.put('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userSavedAddresses.json', modifiedAddresses)
    }

    // To get Address using rowId

    getAddress(rowId : string, index : string) {
        return this.httpClient.get<Address>('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userSavedAddresses/'+index+'.json');
    }

    // To Update Address using rowId

    onUpdateAddress(rowId : string, index : string, updatedAddress : Address) {
        return this.httpClient.patch('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userSavedAddresses/'+index+'.json', updatedAddress)
    }

    // To get userId using rowId

    getUserId(rowId : string) {
        return this.httpClient.get<string>('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userId.json')
    }

    // To Add an item to the cart using rowId

    saveProductToCart(cartItems : UserCart[], rowId : string) {
        return this.httpClient.put('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userCartItems.json', cartItems)
    }

    // To add an order using rowId

    placeAnOrder(updatedOrders : any[], rowId : string) {
        return this.httpClient.put('https://shoppie-4c4f4.firebaseio.com/users/'+rowId+'/userOrders.json', updatedOrders)
    }
    
}