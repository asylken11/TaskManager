import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.register(this.registerData.username, this.registerData.email, this.registerData.password)
        .subscribe(
          data => {
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Registration failed', error);
          }
        );
    }
  }
}
