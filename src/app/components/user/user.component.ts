import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user',
  //standalone: true,
  //imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService,
    private authService: AuthService
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
    this.authService.deleteUser(id).subscribe(
      () => {
        // Refresh user list or update UI as needed
        this.users = this.users.filter(user => user.id !== id);
      },
      error => {
        console.error('Delete user failed', error);
      }
    );
  }

  deleteCurrentUser(): void {
    const userId = this.authService.currentUserValue?.id;
  
    if (userId) {
      this.authService.deleteUser(userId).subscribe(
        () => {
          // After successful deletion, redirect to login or handle accordingly
          this.authService.logout(); // or navigate to another page
        },
        error => {
          console.error('Delete current user failed', error);
        }
      );
    } else {
      console.error('No user logged in');
    }
  }

  


}
