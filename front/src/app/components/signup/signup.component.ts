import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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

  signupSubmit() {
    this.authService.signupCall(this.login, this.password).subscribe(user => {
      if (this.authService.errorMessage.length === 0) {
        this.router.navigate(['login']);
      } else {
        alert('Couldn\'t sign up');
      }
    });

  }

}
