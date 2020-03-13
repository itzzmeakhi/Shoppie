import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserService } from '../../../../../shared/user.service';
import { Address } from 'src/app/shared/address.model';

@Component({
  selector: 'app-address-view-edit',
  templateUrl: './address-view-edit.component.html',
  styleUrls: ['./address-view-edit.component.css']
})
export class AddressViewEditComponent implements OnInit, OnDestroy {

  userRowId : string;
  addressId : string;
  userId : string;
  addressSelected : Address;
  isEditMode : boolean = false;
  addressDataReceived : boolean = false;
  isLoadingData : boolean = false;
  userAddressForm : FormGroup;
  updateAddressSubs : Subscription;
  updateAddressReloadDataSubs : Subscription;
  userIdSubs : Subscription;
  getAddressSubs : Subscription;

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService) { }

  ngOnInit() {
    this.isLoadingData = true;
    this.userRowId = this.activatedRoute.snapshot.params['rowid'];
    this.addressId = this.activatedRoute.snapshot.params['addrId'];

    this.userIdSubs = this.userService.getUserId(this.userRowId)
      .subscribe(userIdData => {
        this.userId = userIdData;
      })

    this.getAddressSubs = this.userService.getAddress(this.userRowId, this.addressId)
      .subscribe(addressData => {
        this.addressDataReceived = true;
        this.addressSelected = addressData;
        // console.log(addressData);
    
        this.userAddressForm = new FormGroup({
          'addressSaveAs' : new FormControl(this.addressSelected.addressSaveAs, [ Validators.required ]),
          'addressRecipientName' : new FormControl(this.addressSelected.addressRecipientName, [ Validators.required ]),
          'addressRecipientContactNumber' : new FormControl(this.addressSelected.addressRecipientContactNumber, [ Validators.required, Validators.pattern('[6-9][0-9]{9}') ]),
          'addressDescription' : new FormControl(this.addressSelected.addressDescription, [ Validators.required ]),
          'addressPinCode' : new FormControl(this.addressSelected.addressPinCode, [ Validators.required, Validators.pattern('[1-9][0-9]{5}') ]),
          'addressCity' : new FormControl(this.addressSelected.addressCity, [ Validators.required ])
        })
        this.isLoadingData = false;
      })

  }

  get addressSaveAs() {
    return this.userAddressForm.get('addressSaveAs');
  }

  get addressRecipientName() {
    return this.userAddressForm.get('addressRecipientName');
  }

  get addressRecipientContactNumber() {
    return this.userAddressForm.get('addressRecipientContactNumber');
  }

  get addressDescription() {
    return this.userAddressForm.get('addressDescription');
  }

  get addressPinCode() {
    return this.userAddressForm.get('addressPinCode');
  }

  get addressCity() {
    return this.userAddressForm.get('addressCity');
  }

  // Triggers when editAddress button is clicked

  onEditAddress() {
    this.isEditMode = true;
  }

  // Triggers when editAddress form is submitted

  onFormSubmit() {

    const updatedAddress = new Address(
      this.addressSaveAs.value,
      this.addressRecipientName.value,
      this.addressRecipientContactNumber.value,
      this.addressDescription.value,
      this.addressPinCode.value,
      this.addressCity.value,
      this.addressSelected.addressId
    );

    this.updateAddressSubs = this.userService.onUpdateAddress(this.userRowId, this.addressId, updatedAddress)
      .subscribe(responseData => {
        // console.log(responseData);
        console.log("Address Updated");
        this.updateAddressReloadDataSubs = this.userService.getUser(this.userId)
          .subscribe(userDataResponse => {
            // console.log(userDataResponse);
            this.userService.userDetails.next(userDataResponse);
          })
        this.isEditMode = false;
      })

  }

  // Triggers when editAddress is cancelled by user

  onCancelEditMode() {
    this.userAddressForm.setValue({
      'addressSaveAs' : this.addressSelected.addressSaveAs,
      'addressRecipientName' : this.addressSelected.addressRecipientName,
      'addressRecipientContactNumber' : this.addressSelected.addressRecipientContactNumber,
      'addressDescription' : this.addressSelected.addressDescription,
      'addressPinCode' : this.addressSelected.addressPinCode,
      'addressCity' : this.addressSelected.addressCity
    });

    this.isEditMode = false;
  }

  ngOnDestroy() {
    if(this.updateAddressSubs) {
      this.updateAddressSubs.unsubscribe();
    }

    if(this.updateAddressReloadDataSubs) {
      this.updateAddressReloadDataSubs.unsubscribe();
    }

    if(this.userIdSubs) {
      this.userIdSubs.unsubscribe();
    }

    if(this.getAddressSubs) {
      this.getAddressSubs.unsubscribe();
    }
  }

}
