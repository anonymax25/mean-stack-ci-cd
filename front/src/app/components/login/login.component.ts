import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string;
  password: string;

  constructor(public authService: AuthService,
              private router: Router) { }

  loginSubmit() {
    this.authService.loginCall(this.login, this.password).subscribe(user => {
      if (this.authService.errorMessage.length === 0) {
        this.authService.setUserToSessionStorage(user);
        this.router.navigate(['todo']);
      } else {
        alert('Wrong login or password');
      }
    });
  }

}
