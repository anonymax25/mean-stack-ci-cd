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

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromSessionStorage();
  }

  getImageUrl() {
    return `${environment.apiUrl}/user/${this.user._id}/avatar`;
  }
}
