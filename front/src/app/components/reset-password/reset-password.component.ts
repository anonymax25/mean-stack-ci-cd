import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  nb = 1;
  email: string;
  code: number;
  password: string;
  pwd: string;
  errorMatching = false;
  errorCall = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  setNumber(n) {
    this.nb = n;
  }

  sendCodeToEmail(n) {
    this.errorMatching = false;
    if (this.email !== null && this.email !== undefined && this.email.length > 0) {
      const data = {
        email: this.email
      };
      this.authService.sendCode(data).subscribe(() => {
        this.setNumber(n);
      });
    } else {
      this.errorMatching = true;
    }
  }

  verifyCodeEmail(n) {
    this.errorMatching = false;
    this.errorCall = false;
    if (this.code) {
      const data = {
        email: this.email,
        verificationCode: this.code
      };
      this.authService.verifyCode(data).subscribe(() => {
        if (this.authService.errorMessage.length === 0) {
          this.setNumber(n);
        } else {
          this.errorCall = true;
        }
      });
    } else {
      this.errorMatching = true;
    }
  }

  savePassword(n) {
    this.errorMatching = false;
    this.errorCall = false;
    if (this.password === this.pwd && this.password !== '' && this.password.length > 0) {
      const data = {
        email: this.email,
        password: this.password,
        verificationCode: this.code
      };
      this.authService.resetPassword(data).subscribe(() => {
        if (this.authService.errorMessage.length === 0) {
          this.setNumber(n);
        } else {
          this.errorCall = true;
        }
      });
    } else {
      this.errorMatching = true;
    }
  }

  goToSignIn() {
    this.router.navigate(['sign-in']);
  }
}
