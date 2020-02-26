import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class AuthenticatedUser {
    public email : string;
    public localId : string;
    private _idToken : string;
    private _tokenExpirationDate : Date;

    constructor(email : string, id : string, token : string, expires : Date) {
        this.email = email;
        this.localId = id;
        this._idToken = token;
        this._tokenExpirationDate = expires;
    }

    get idToken() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._idToken;
    }
}