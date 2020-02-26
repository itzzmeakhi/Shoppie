import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { NewUser } from './new-user.model';

@Injectable({ providedIn : 'root' })
export class DataHandlingService {

    constructor(private httpClient : HttpClient) {}

    getUsers() {
        this.httpClient.get<NewUser[]>('https://shoppie-4c4f4.firebaseio.com/users.json?orderBy="userId"&equalTo="gZV7GtLaFCRZNmEEyMv4UzShlBs2"')
            .subscribe(usersData => {
                console.log(usersData);
            })
    }
}