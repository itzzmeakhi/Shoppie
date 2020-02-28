export class Address {
    public addressSaveAs : string;
    public addressRecipientName : string;
    public addressRecipientContactNumber : number;
    public addressDescription : string;
    public addressPinCode : number;
    public addressCity : string;
    public addressId? : number;

    constructor(
        saveAs : string,
        recipient : string,
        contact : number,
        desc : string,
        pincode : number,
        city : string,
        id? : number
    ) {
        this.addressSaveAs = saveAs;
        this.addressRecipientName = recipient;
        this.addressRecipientContactNumber = contact;
        this.addressDescription = desc;
        this.addressPinCode = pincode;
        this.addressCity = city;
        this.addressId = id;
    }
}