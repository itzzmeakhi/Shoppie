import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserService } from '../../../shared/user.service';
import { NewUser } from 'src/app/shared/new-user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  userLoggedInData : NewUser;
  userSubscription : Subscription;
  userDetailsUpdatedSubs : Subscription;
  userUpdatedReadSubs : Subscription;
  userDetailsForm : FormGroup;
  userDetailsEditMode : boolean = false;

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService,
              private router : Router) { }

  ngOnInit() {
    
    // this.userId = this.activatedRoute.snapshot.params['id'];
    
    this.userSubscription = this.userService.userDetails
      .subscribe(userData => {
        this.userLoggedInData = userData;

        if(this.userLoggedInData) {
          this.userDetailsForm = new FormGroup({
            'userName' : new FormControl(this.userLoggedInData.userName, [ Validators.required ]),
            'userDisplayName' : new FormControl(this.userLoggedInData.userDisplayName, [ Validators.required ]),
            'userEmail' : new FormControl(this.userLoggedInData.userEmail),
            'userContactNumber' : new FormControl(this.userLoggedInData.userContactNumber, [ Validators.required, Validators.pattern('[6-9][0-9]{9}')]),
            'userGender' : new FormControl(this.userLoggedInData.userGender),
            'userLocation' : new FormControl(this.userLoggedInData.userLocation, [ Validators.required ]),
            'userImageUrl' : new FormControl(this.userLoggedInData.userImageUrl, [ Validators.required ]),
            'userDOB' : new FormControl(this.userLoggedInData.userDOB),
            'userProfilePicture' : new FormControl('')
          })
        }
      });

  }

  get userName() {
    return this.userDetailsForm.get('userName');
  }

  get userDisplayName() {
    return this.userDetailsForm.get('userDisplayName');
  }

  get userEmail() {
    return this.userDetailsForm.get('userEmail');
  }

  get userContactNumber() {
    return this.userDetailsForm.get('userContactNumber');
  }

  get userGender() {
    return this.userDetailsForm.get('userGender');
  }

  get userLocation() {
    return this.userDetailsForm.get('userLocation');
  }

  get userImageUrl() {
    return this.userDetailsForm.get('userImageUrl');
  }

  get userDOB() {
    return this.userDetailsForm.get('userDOB');
  }

  onEditUserDetails() {
    this.userDetailsEditMode = true;
  }

  onFormSubmit() {

    const updatedUserDetails = new NewUser(
      this.userName.value,
      this.userEmail.value,
      this.userContactNumber.value,
      this.userGender.value,
      this.userDOB.value,
      this.userDisplayName.value,
      this.userLocation.value,
      this.userImageUrl.value,
      this.userLoggedInData.userSavedAddresses,
      null,
      this.userLoggedInData.userId,
      null
    )

    this.userDetailsUpdatedSubs = this.userService.onUpdateUserDetails(updatedUserDetails, this.userLoggedInData.rowId)
      .subscribe((updatedResponse : NewUser) => {
        console.log("User Data Updated");
        //console.log(updatedResponse);
        this.userUpdatedReadSubs = this.userService.getUser(this.userLoggedInData.rowId)
          .subscribe(userData => {
            // this.userService.userDetails.next(userData);
          })
        this.userService.userDetails.next(updatedResponse)
        this.userDetailsEditMode = false;
      })

  }

  ngOnDestroy() {
    if(this.userDetailsUpdatedSubs) {
      this.userDetailsUpdatedSubs.unsubscribe();
    }

    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if(this.userUpdatedReadSubs) {
      this.userUpdatedReadSubs.unsubscribe();
    }
  }

}
