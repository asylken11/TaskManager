import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, email: 'user1@example.com', username: 'User One', password: 'password1' },
    { id: 2, email: 'user2@example.com', username: 'User Two', password: 'password2' },
  ];

  constructor() { }

  // Simulates fetching users from the server
  getUsersFromServer(): Observable<User[]> {
    return of(this.users);
  }

  // Adds a new user to the local list
  createUser(user: User): void {
    user.id = this.users.length + 1; // Automatically assign ID
    this.users.push(user);
    console.log('Created user:', user);
  }

  // Updates an existing user in the local list
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      console.log('Updated user:', updatedUser);
    } else {
      console.error('User not found:', updatedUser);
    }
  }

  // Deletes a user from the local list
  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    console.log('Deleted user with id:', id);
  }
}
