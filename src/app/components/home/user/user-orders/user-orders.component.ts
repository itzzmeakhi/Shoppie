import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserService } from '../../../../shared/user.service';
import { NewUser } from 'src/app/shared/new-user.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit, OnDestroy {

  userId : string;
  userData : NewUser;
  userOrders : any[];
  hasAnyOrders : boolean = false;
  getUserSubs : Subscription;

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.getUserSubs = this.userService.getUser(this.userId)
      .subscribe(userData => {
        this.userData = userData;
        this.userOrders = userData.userOrders;
        this.hasAnyOrders = this.userOrders.length > 0;
      })
  }

  ngOnDestroy() {
    if(this.getUserSubs) {
      this.getUserSubs.unsubscribe();
    }
  }

}
