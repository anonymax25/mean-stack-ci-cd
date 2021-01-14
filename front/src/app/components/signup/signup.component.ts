import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  login: string;
  password: string;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  signUpSubmit() {
    this.authService.signUpCall(this.login, this.password).subscribe(() => {
      if (this.authService.errorMessage.length === 0) {
        this.authService.signInCall(this.login).subscribe(user => {
            this.authService.setUserToSessionStorage(user);
            this.router.navigate(['todo']);
        });
      } else {
        alert('Couldn\'t sign up !');
      }
    });
  }
}
