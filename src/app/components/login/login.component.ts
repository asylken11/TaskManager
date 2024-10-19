import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.login(this.loginData.email, this.loginData.password)
        .subscribe(
          data => {
            this.router.navigate(['/profile']);
          },
          error => {
            alert("Email or Password is not correct ")
            console.error('Login failed', error);
          }
        );
    }
  }

  onRegister(): void {
    // Навигация на страницу регистрации
    this.router.navigate(['/register']);
  }
}
