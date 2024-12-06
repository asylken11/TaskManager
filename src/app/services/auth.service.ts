import {Injectable} from '@angular/core';
import {Observable, of, take} from 'rxjs';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {ApiService} from "./api.service";
import {CurrentUserService} from "./current-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private currentUserService: CurrentUserService
  ) {}

  getMockUsers() {
    this.apiService.get('/users')
      .pipe(
        take(1)
      )
      .subscribe((users: User[]) => {
        this.mockUsers = users;
      })
  }

  login(email: string, password: string) {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);

    if (!user) throw ('Данного пользователя не существует!');

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserService.setCurrentUser(user);
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserService.setCurrentUser(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  register(username: string, email: string, password: string) {
    const newUser: User = {
      id: this.getLastUserId(),
      email,
      username,
      password
    };
    this.apiService.post(`/users`, newUser)
      .pipe(
        take(1)
      )
      .subscribe((user: User) => {
        console.log('Registered new user:', user);
        this.router.navigate(['/login'])
      });
  }

  getLastUserId() {
    return this.mockUsers[this.mockUsers.length - 1].id + 1;
  }

  updateUser(user: User): Observable<User> {
    const existingUser = this.mockUsers.find(u => u.id === user.id);
    if (existingUser) {
      Object.assign(existingUser, user);
      localStorage.setItem('currentUser', JSON.stringify(existingUser));
      this.currentUserService.setCurrentUser(existingUser);
      return of(existingUser);
    }
    return of(null as any);
  }

  deleteUser(id: number) {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) return;

    this.apiService.delete(`/users/${id}`)
      .subscribe((_) => {
        console.log(_);
        this.logout();
      });
  }
}
