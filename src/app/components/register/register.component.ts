import { Component } from '@angular/core';
import { UsersServiceService } from '../../services/users-service/users-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private usersService: UsersServiceService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.user.name && this.user.email && this.user.password) {
      this.usersService.addUser(this.user).then(() => {
        console.log('Usuario registrado:', this.user);
        this.user = { name: '', email: '', password: '' };
      }).catch(error => {
        console.error('Error al registrar el usuario:', error);
      });
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
