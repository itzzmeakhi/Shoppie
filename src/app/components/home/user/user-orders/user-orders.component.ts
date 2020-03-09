import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../shared/user.service';
import { NewUser } from 'src/app/shared/new-user.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  userId : string;
  userData : NewUser;
  userOrders : any[];
  hasAnyOrders : boolean = false;

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.userService.getUser(this.userId)
      .subscribe(userData => {
        this.userData = userData;
        this.userOrders = userData.userOrders;
        this.hasAnyOrders = this.userOrders.length > 0;
      })
  }

}
