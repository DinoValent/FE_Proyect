import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    name: '',
    email: '',
    phone: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  registerContact() {
    this.userService.register(this.user).subscribe({
      complete: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Oopss ocurrio un error al registrarte, intentelo de nuevo');
      },
    });
  }
}
