import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(public authService: AuthService,
              private router: Router) {
    this.getUserInfo();
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.user = this.authService.getUserFromSessionStorage();
  }
  goToAccount() {
    this.router.navigate([`account/${this.authService.getUserFromSessionStorage()._id}`]);
  }

  getImageUrl() {
    return `${environment.apiUrl}/user/${this.user._id}/avatar`;
  }
}
