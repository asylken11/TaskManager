import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import {catchError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.authService.getMockUsers();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.authService.login(this.loginData.email, this.loginData.password);
  }
}
