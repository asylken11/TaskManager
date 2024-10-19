import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private mockUsers: User[] = [
    { id: 1, email: 'test1@example.com', name: 'Test User 1', password: 'password1', token: 'mock-token-1' },
    { id: 2, email: 'test2@example.com', name: 'Test User 2', password: 'password2', token: 'mock-token-2' },
  ];

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    console.log('Login data:', { email, password });

    const user = this.mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['profile']);
      return of(user);
    } else {
      console.error('Invalid login credentials');
      return of(null as any);
    }
  }

  logout(): Observable<void> {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    return of(undefined);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  register(username: string, email: string, password: string): Observable<any> {
    const newUser: User = {
      id: this.mockUsers.length + 1,
      email,
      name: username,
      password,
      token: 'mock-token-' + (this.mockUsers.length + 1)
    };
    this.mockUsers.push(newUser);
    console.log('Registered new user:', newUser);
    return of(newUser);
  }

  updateUser(user: User): Observable<User> {
    const existingUser = this.mockUsers.find(u => u.id === user.id);
    if (existingUser) {
      Object.assign(existingUser, user);
      localStorage.setItem('currentUser', JSON.stringify(existingUser));
      this.currentUserSubject.next(existingUser);
      return of(existingUser);
    }
    return of(null as any);
  }

  deleteUser(id: number): Observable<void> {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.mockUsers.splice(userIndex, 1);
      console.log('Deleted user with id:', id);
      if (this.currentUserValue && this.currentUserValue.id === id) {
        this.logout();
      }
    }
    return of(undefined);
  }
}
