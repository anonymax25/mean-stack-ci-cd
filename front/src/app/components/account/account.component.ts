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

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromSessionStorage();
  }

  getImageUrl() {
    return `${environment.apiUrl}/user/${this.user._id}/avatar`;
  }

  submit() {
    const data = {
      verificationCode: this.code,
      email: this.authService.currentUser.email
    };
    this.authService.verifyCode(data).subscribe(() => {
      if (this.authService.errorMessage.length === 0) {
        window.location.reload();
      } else {
        this.error = true;
      }
    });
  }
}
