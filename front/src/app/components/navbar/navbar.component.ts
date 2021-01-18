import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService,
              private router: Router) {
    this.authService.currentUser = this.authService.getUserFromSessionStorage();
  }

  goToAccount() {
    this.router.navigate([`account/${this.authService.getUserFromSessionStorage()._id}`]);
  }

  goToResetPassword() {
    this.router.navigate(['reset-password']);
  }

  getImageUrl() {
    return `${environment.apiUrl}/user/${this.authService.currentUser._id}/avatar`;
  }
}
