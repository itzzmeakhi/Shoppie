import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserService } from '../../../../shared/user.service';
import { NewUser } from 'src/app/shared/new-user.model';
import { Address } from 'src/app/shared/address.model';


@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css']
})
export class MyAddressesComponent implements OnInit, OnDestroy {

  userLoggedIn : string;
  userDetailsSubs : Subscription;
  userLoggedInDetails : NewUser;
  userAddressForm : FormGroup;

  constructor(private userService : UserService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.userLoggedIn = this.activatedRoute.snapshot.params['id'];
    //console.log(this.userLoggedIn);
    this.userDetailsSubs = this.userService.getUser(this.userLoggedIn)
      .subscribe(userData => {
        //console.log(userData);
        this.userLoggedInDetails = userData;
      })

    this.userAddressForm = new FormGroup({
      'addressSaveAs' : new FormControl(''),
      'addressRecipientName' : new FormControl(''),
      'addressRecipientContactNumber' : new FormControl(''),
      'addressDescription' : new FormControl(''),
      'addressPinCode' : new FormControl(''),
      'addressCity' : new FormControl('')
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


  onFormSubmit() {
    console.log(this.userAddressForm);

    // const newAddressesSavedList : Address[] = [...this.userLoggedInDetails.userSavedAddresses, newAddress];

    // console.log(newAddressesSavedList);
  }

  ngOnDestroy() {
    if(this.userDetailsSubs) {
      this.userDetailsSubs.unsubscribe();
    }
  }

}
