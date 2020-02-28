import { Component, OnInit } from '@angular/core';

import { AuthService } from './components/auth/auth.service';
import { UserService } from './shared/user.service';
import { NewUser } from './shared/new-user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService : AuthService,
              private userService : UserService) {}

  ngOnInit() {
    if(this.authService.onAutoLogin()) {
      this.authService.user.subscribe(userData => {
        //console.log(userData);
        if(userData) {
          //console.log("IN FUNCTION");
          this.userService.getUser(userData.localId)
            .subscribe(userData => {
              //console.log(userData);
              this.userService.userDetails.next(userData);
            })
        }
      })
    }
  }
  
}
