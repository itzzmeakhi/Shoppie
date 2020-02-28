import { Address } from './address.model';

export class NewUser {
    public userName : string;
    public userEmail : string;
    public userContactNumber : number;
    public userGender : string;
    public userDOB : string;
    public userDisplayName : string;
    public userLocation : string;
    public userImageUrl : string;
    public userSavedAddresses : Address[];
    public userPassword? : string;
    public userId? : string;
    public rowId? : string;

    constructor(name : string,
                email : string,
                contact : number,
                gender : string,
                dob : string,
                displayname : string,
                location : string,
                url : string,
                addresses : Address[],
                password? : string,
                id? : string,
                rowid?: string) {

        this.userName = name;
        this.userEmail = email;
        this.userContactNumber = contact;
        this.userGender = gender;
        this.userDOB = dob;
        this.userDisplayName = displayname;
        this.userLocation = location;
        this.userImageUrl = url;
        this.userSavedAddresses = addresses;
        this.userPassword = password;
        this.userId = id;
        this.rowId = rowid;
    }
}

// Changes to be Made in these files
// i.e., NewUser Model is imported and used in those files.

// new-user.model.ts
// signup.component.ts
// auth.service.ts
// user.service.ts
// user.component.ts