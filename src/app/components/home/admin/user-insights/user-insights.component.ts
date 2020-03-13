import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserService } from '../../../../shared/user.service';


@Component({
  selector: 'app-user-insights',
  templateUrl: './user-insights.component.html',
  styleUrls: ['./user-insights.component.css']
})
export class UserInsightsComponent implements OnInit, OnDestroy {

  registeredUsers : {'userName' : string, 
                    'userEmail' : string, 
                    'userImageUrl' : string, 
                    'userId' : string, 
                    'rowId' : string
                  }[] = [];

  getUsersSubs : Subscription;

  constructor(private userService : UserService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.getUsersSubs = this.userService.getUsers()
      .subscribe(usersData => {
        // console.log(usersData);
        this.registeredUsers = usersData;
      })
  }

  // Triggers when clicked on a particular user to view his/her details

  onViewUser(userId : string) {
    this.router.navigate(['user', 'view', userId], { relativeTo : this.activatedRoute });
  }

  ngOnDestroy() {
    if(this.getUsersSubs) {
      this.getUsersSubs.unsubscribe();
    }
  }

}
