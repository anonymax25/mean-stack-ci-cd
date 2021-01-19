import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
  })
  export class AccountComponent implements OnInit {
  user: User;
  isEditable = false;
  code: number;
  error = false;
  pwd: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromSessionStorage();
  }

  getImageUrl() {
    return `${environment.apiUrl}/user/${this.user._id}/avatar`;
  }

  submit() {
    this.error = false;
    const data = {
      verificationCode: this.code,
      email: this.authService.currentUser.email
    };
    this.authService.verifyCode(data).subscribe(() => {
      if (this.authService.errorMessage.length === 0) {
        const user = {
          _id: this.authService.currentUser._id,
          email: this.authService.currentUser.email,
          password: this.authService.currentUser.password,
          firstName: this.authService.currentUser.firstName,
          lastName: this.authService.currentUser.lastName,
          gender: this.authService.currentUser.gender,
          createDate: this.authService.currentUser.createDate,
          verifiedEmail: true,
          verificationCode: this.authService.currentUser.verificationCode,
          avatarKey: this.authService.currentUser.avatarKey
        };
        this.authService.setUserToSessionStorage(user);
        window.location.reload();
      } else {
        this.error = true;
      }
    });
  }

  deleteAccount() {
    this.error = false;
    if (this.pwd !== null && this.pwd !== undefined && this.pwd !== '') {
      this.authService.deleteAccount(this.pwd).subscribe(() => {
        if (this.authService.errorMessage.length === 0) {
          this.authService.logout();
          window.location.reload();
        } else {
          this.error = true;
        }
      });
    } else  {
      this.error = true;
    }
  }
}
