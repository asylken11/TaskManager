import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.authService.getMockUsers();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.authService.register(this.registerData.username, this.registerData.email, this.registerData.password);
  }
}
