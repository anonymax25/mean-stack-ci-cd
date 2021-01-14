import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(public authService: AuthService,
              private router: Router) { }

  submit() {
    const credentials = {
      email : this.email,
      password : this.password
    };
    this.authService.signInCall(credentials).subscribe(user => {
      if (this.authService.errorMessage.length === 0) {
        this.authService.setUserToSessionStorage(user);
        this.router.navigate(['todo']);
      } else {
        alert('Wrong email or password');
      }
    });
  }
}
