export class NewUser {
    public userName : string;
    public userEmail : string;
    public userContactNumber : number;
    public userGender : string;
    public userDOB : string;
    public userPassword? : string;
    public userId? : string;

    constructor(name : string,
                email : string,
                contact : number,
                gender : string,
                dob : string,
                password? : string,
                id? : string) {

        this.userName = name;
        this.userEmail = email;
        this.userContactNumber = contact;
        this.userGender = gender;
        this.userDOB = dob;
        this.userPassword = password;
        this.userId = id;
    }
}