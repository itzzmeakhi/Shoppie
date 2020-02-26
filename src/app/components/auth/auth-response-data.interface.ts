export interface AuthResponseData {
    kind : string;
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    displayName? : string;
    registered? : boolean;
}