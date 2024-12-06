import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() { }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get currentUserValue$(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(value: User | null): void {
    this.currentUserSubject.next(value);
  }
}
