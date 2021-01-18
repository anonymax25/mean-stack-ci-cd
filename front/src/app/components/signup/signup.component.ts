import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  error = false;
  constructor(public authService: AuthService,
              private router: Router) { }

  submit() {
    const data = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    };
    const credentials = {
      email : this.email,
      password : this.password
    };

    this.authService.signUpCall(data).subscribe(() => {
      if (this.authService.errorMessage.length === 0) {
        this.authService.signInCall(credentials).subscribe(user => {
            this.authService.setUserToSessionStorage(user);
            this.router.navigate(['todo']);
        });
      } else {
        this.error = true;
      }
    });
  }
}
