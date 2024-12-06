import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import {CurrentUserService} from "../../services/current-user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.apiService.put(`/users/${this.currentUser.id}`, this.userForm.value)
        .subscribe((user) => {
          console.log(user);
        })
    }
  }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.currentUserValue;
    this.updateProfile();
  }

  updateProfile() {
    this.userForm.patchValue({
      username: this.currentUser.username,
      email: this.currentUser.email,
    })
  }

  logout(): void {
    this.authService.logout();
  }

  deleteCurrentUser(): void {
    const userId = this.currentUserService.currentUserValue?.id;

    if (!userId) return;

    this.authService.deleteUser(userId);
  }
}
