import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from '../../services/users-service/users-service.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.email, this.password).then(success => {
      if (success) {
        this.router.navigate(['/comics']);
      } else {
        console.error('Credenciales incorrectas');
      }
    });
  }
}
