import { Component, OnInit } from '@angular/core';

import { AuthService } from './components/auth/auth.service';
import { DataHandlingService } from './shared/data-handling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService : AuthService,
              private dataHandlingService : DataHandlingService) {}

  ngOnInit() {
    this.authService.onAutoLogin();
    // this.dataHandlingService.getUsers();
  }
  
}
