import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take, map } from 'rxjs/operators';

import { UserService } from './user.service';
import { NewUser } from 'src/app/shared/new-user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId : string;
  userLoggedInData : NewUser;

  constructor(private activatedRoute : ActivatedRoute,
              private userService : UserService) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.userId)
      .pipe(
        take(1),
        map(userData => {
          for(const key in userData) {
            if(userData.hasOwnProperty(key)) {
              // const userData = new NewUser(userData.userName)
            }
          }
        })
      )
      .subscribe(userData => {
        // this.userLoggedInData = userData;
        // console.log(this.userLoggedInData);
      })

    
  }

}
