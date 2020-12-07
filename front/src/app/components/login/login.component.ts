import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginSubmit() {
    this.authService.loginCall(this.login, this.password).subscribe(user => {
      if (this.authService.errorMessage.length === 0) {
        sessionStorage.setItem("user", JSON.stringify(user))
        this.router.navigate(['todolist']);
      } else {
        alert('Wrong login or password');
      }
    });
  }

}
