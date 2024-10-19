import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {},
      error => {
        console.error('Logout failed', error);
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
