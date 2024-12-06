import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";


@Component({
  selector: 'app-user',
  //standalone: true,
  //imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
  ) { }

  ngOnInit(): void {
    // Здесь мы загружаем пользователей с сервера
    this.userService.getUsersFromServer().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  deleteUser(id: number): void {
    this.authService.deleteUser(id);
  }

  deleteCurrentUser(): void {
    const userId = this.currentUserService.currentUserValue?.id;

    if (userId) {
      this.authService.deleteUser(userId);
    } else {
      console.error('No user logged in');
    }
  }
}
