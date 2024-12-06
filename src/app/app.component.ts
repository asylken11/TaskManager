import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CurrentUserService} from "./services/current-user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'taskmanager';

  constructor(
    private currentUserService: CurrentUserService,
  ) {
  }

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    const user = localStorage.getItem('currentUser');

    if (user) {
      this.currentUserService.setCurrentUser(JSON.parse(user));
    }
  }
}
