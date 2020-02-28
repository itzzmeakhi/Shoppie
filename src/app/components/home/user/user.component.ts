import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserService } from '../../../shared/user.service';
import { NewUser } from 'src/app/shared/new-user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  userId : string;
  userLoggedInData : NewUser;
  userSubscription : Subscription;
  userDetailsUpdatedSubs : Subscription;
  userDetailsForm : FormGroup;
  userDetailsEditMode : boolean = false;

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService,
              private router : Router) { }

  ngOnInit() {
    
    this.userId = this.activatedRoute.snapshot.params['id'];
    
    this.userSubscription = this.userService.getUser(this.userId)
      .subscribe(userData => {
        this.userLoggedInData = userData;
        //console.log(this.userLoggedInData);

        this.userDetailsForm = new FormGroup({
          'userName' : new FormControl(this.userLoggedInData.userName),
          'userDisplayName' : new FormControl(this.userLoggedInData.userDisplayName),
          'userEmail' : new FormControl(this.userLoggedInData.userEmail),
          'userContactNumber' : new FormControl(this.userLoggedInData.userContactNumber),
          'userGender' : new FormControl(this.userLoggedInData.userGender),
          'userLocation' : new FormControl(this.userLoggedInData.userLocation),
          'userImageUrl' : new FormControl(this.userLoggedInData.userImageUrl),
          'userDOB' : new FormControl(this.userLoggedInData.userDOB),
          'userProfilePicture' : new FormControl('')
        })
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
      .subscribe(updatedResponse => {
        console.log("User Data Updated");
        //console.log(updatedResponse);
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
  }

}
