import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-user-insights',
  templateUrl: './user-insights.component.html',
  styleUrls: ['./user-insights.component.css']
})
export class UserInsightsComponent implements OnInit {

  registeredUsers : {'userName' : string, 
                    'userEmail' : string, 
                    'userImageUrl' : string, 
                    'userId' : string, 
                    'rowId' : string
                  }[] = [];

  constructor(private userService : UserService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(usersData => {
        // console.log(usersData);
        this.registeredUsers = usersData;
      })
  }

  onViewUser(userId : string) {
    this.router.navigate(['user', 'view', userId], { relativeTo : this.activatedRoute });
  }

}
