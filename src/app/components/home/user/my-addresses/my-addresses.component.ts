import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

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
  userAddAddressSubs : Subscription;
  userEmitAfterAddressSubs : Subscription;
  userLoggedInDetails : NewUser;
  userAddressForm : FormGroup;
  isAddressAddRequest : boolean = false;

  @ViewChild('closeModal', { static : false }) closeModal : ElementRef;

  constructor(private userService : UserService,
              private activatedRoute : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    // this.userLoggedIn = this.activatedRoute.snapshot.params['id'];
    //console.log(this.userLoggedIn);
    // this.userDetailsSubs = this.userService.getUser(this.userLoggedIn)
    //   .subscribe(userData => {
    //     //console.log(userData);
    //     this.userLoggedInDetails = userData;
    //   })

    this.userDetailsSubs = this.userService.userDetails
      .subscribe(userData => {
        //console.log(userData);
        this.userLoggedInDetails = userData;
      })

    this.userAddressForm = new FormGroup({
      'addressSaveAs' : new FormControl('', [ Validators.required ]),
      'addressRecipientName' : new FormControl('', [ Validators.required ]),
      'addressRecipientContactNumber' : new FormControl('', [ Validators.required, Validators.pattern('[6-9][0-9]{9}') ]),
      'addressDescription' : new FormControl('', [ Validators.required ]),
      'addressPinCode' : new FormControl('', [ Validators.required, Validators.pattern('[1-9][0-9]{5}') ]),
      'addressCity' : new FormControl('', [ Validators.required ])
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
    // console.log(this.userAddressForm);
    this.closeModal.nativeElement.click();
    this.isAddressAddRequest = true;

    const newAddress = new Address(
      this.addressSaveAs.value,
      this.addressRecipientName.value,
      this.addressRecipientContactNumber.value,
      this.addressDescription.value,
      this.addressPinCode.value,
      this.addressCity.value,
      this.userLoggedInDetails.userSavedAddresses.length
    )

    const updatedAddressesList : Address[] = [...this.userLoggedInDetails.userSavedAddresses, newAddress];

    this.userAddAddressSubs = this.userService.onAddAddress(this.userLoggedInDetails.rowId, updatedAddressesList)
      .subscribe(addressesData => {
        //console.log(addressesData);
        console.log("Address Added!");
        this.userEmitAfterAddressSubs = this.userService.getUser(this.userLoggedInDetails.userId)
          .pipe(take(1))
          .subscribe(userDataResponse => {
            this.userAddressForm.reset();
            this.isAddressAddRequest = false;
            this.userService.userDetails.next(userDataResponse);
          })
      })

  }

  onSelectedAddress(id : number) {
    // console.log(id);
    this.router.navigate([id], { relativeTo : this.activatedRoute });
  }

  ngOnDestroy() {
    if(this.userDetailsSubs) {
      this.userDetailsSubs.unsubscribe();
    }

    if(this.userAddAddressSubs) {
      this.userAddAddressSubs.unsubscribe();
    }

    if(this.userEmitAfterAddressSubs) {
      this.userEmitAfterAddressSubs.unsubscribe();
    }
  }

}
