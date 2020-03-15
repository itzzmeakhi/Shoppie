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

  userData : NewUser;
  userSubscription : Subscription;
  userDetailsUpdatedSubs : Subscription;
  userUpdatedReadSubs : Subscription;
  userDetailsForm : FormGroup;
  userDetailsEditMode : boolean = false;
  userId : string;
  isAdmin : boolean = false;
  isUserDataLoading : boolean = false;

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService,
              private router : Router) { }

  ngOnInit() {
    this.isUserDataLoading = true;
    if(this.activatedRoute.routeConfig.path === "user/:mode/:id") {
      // console.log("Admin");
      this.isAdmin = true;
      this.userId = this.activatedRoute.snapshot.params['id'];
      this.userService.getUser(this.userId)
        .subscribe(userData => {
          this.userData = userData;
          if(this.userData) {
            this.userDetailsForm = new FormGroup({
              'userName' : new FormControl(this.userData.userName, [ Validators.required ]),
              'userDisplayName' : new FormControl(this.userData.userDisplayName, [ Validators.required ]),
              'userEmail' : new FormControl(this.userData.userEmail),
              'userContactNumber' : new FormControl(this.userData.userContactNumber, [ Validators.required, Validators.pattern('[6-9][0-9]{9}')]),
              'userGender' : new FormControl(this.userData.userGender),
              'userLocation' : new FormControl(this.userData.userLocation, [ Validators.required ]),
              'userImageUrl' : new FormControl(this.userData.userImageUrl, [ Validators.required ]),
              'userDOB' : new FormControl(this.userData.userDOB)
            })
          }
          this.isUserDataLoading = false;
        })
    } else if(this.activatedRoute.routeConfig.path === "user/:id") {
      // console.log("Buyer");
      // this.userId = this.activatedRoute.snapshot.params['id'];
      this.userSubscription = this.userService.userDetails
        .subscribe(userData => {
          this.userData = userData;
          if(this.userData) {
            this.userDetailsForm = new FormGroup({
              'userName' : new FormControl(this.userData.userName, [ Validators.required ]),
              'userDisplayName' : new FormControl(this.userData.userDisplayName, [ Validators.required ]),
              'userEmail' : new FormControl(this.userData.userEmail),
              'userContactNumber' : new FormControl(this.userData.userContactNumber, [ Validators.required, Validators.pattern('[6-9][0-9]{9}')]),
              'userGender' : new FormControl(this.userData.userGender),
              'userLocation' : new FormControl(this.userData.userLocation, [ Validators.required ]),
              'userImageUrl' : new FormControl(this.userData.userImageUrl, [ Validators.required ]),
              'userDOB' : new FormControl(this.userData.userDOB)
            })
          }
          this.isUserDataLoading = false;
        });
    }

    // if(this.userData) {
    //   this.userDetailsForm = new FormGroup({
    //     'userName' : new FormControl(this.userData.userName, [ Validators.required ]),
    //     'userDisplayName' : new FormControl(this.userData.userDisplayName, [ Validators.required ]),
    //     'userEmail' : new FormControl(this.userData.userEmail),
    //     'userContactNumber' : new FormControl(this.userData.userContactNumber, [ Validators.required, Validators.pattern('[6-9][0-9]{9}')]),
    //     'userGender' : new FormControl(this.userData.userGender),
    //     'userLocation' : new FormControl(this.userData.userLocation, [ Validators.required ]),
    //     'userImageUrl' : new FormControl(this.userData.userImageUrl, [ Validators.required ]),
    //     'userDOB' : new FormControl(this.userData.userDOB)
    //   })
    // }
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

  // Triggers when editMode button is clicked

  onEditUserDetails() {
    if(!this.isAdmin) {
      this.userDetailsEditMode = true;
    }
  }

  // Triggers when userDetailsForm is submitted

  onFormSubmit() {
    if(!this.isAdmin) {
      const updatedUserDetails = new NewUser(
        this.userName.value,
        this.userEmail.value,
        this.userContactNumber.value,
        this.userGender.value,
        this.userDOB.value,
        this.userDisplayName.value,
        this.userLocation.value,
        this.userImageUrl.value,
        this.userData.userSavedAddresses,
        this.userData.userType,
        null,
        this.userData.userCartItems,
        this.userData.userOrders,
        this.userData.userId,
        this.userData.rowId
      )

      this.userDetailsUpdatedSubs = this.userService.onUpdateUserDetails(updatedUserDetails, this.userData.rowId)
        .subscribe((updatedResponse : NewUser) => {
          console.log("User Data Updated");
          // //console.log(updatedResponse);
          // this.userUpdatedReadSubs = this.userService.getUser(this.userLoggedInData.userId)
          //   .subscribe(userData => {
          //     // this.userService.userDetails.next(userData);
          //   })
          this.userService.userDetails.next(updatedResponse)
          this.userDetailsEditMode = false;
          window.scrollTo(0, 0);
        })
    }
  }

  // Triggers when cancelEdit mode button is clicked

  onCancelEditMode() {
    if(!this.isAdmin) {
      this.userDetailsForm.setValue({
        'userName' : this.userData.userName,
        'userDisplayName' : this.userData.userDisplayName,
        'userEmail' : this.userData.userEmail,
        'userContactNumber' : this.userData.userContactNumber,
        'userGender' : this.userData.userGender,
        'userLocation' : this.userData.userLocation,
        'userImageUrl' : this.userData.userImageUrl,
        'userDOB' : this.userData.userDOB
      });
      this.userDetailsEditMode = false;
      window.scrollTo(0, 0);
    }
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
