import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: Partial<User> = {
    password: '',
    email: '',
  };

  constructor(private router: Router, private userService: UserService) {}

  verifyLogin() {
    const { password, email } = this.user;

    this.userService
      .verifyLogin(password as string, email as string)
      .subscribe({
        complete: () => {
          this.router.navigate(['/listado-contacto']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
