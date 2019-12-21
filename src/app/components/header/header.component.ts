import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { AuthService } from '../../services/index';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    authUser: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.authUser.subscribe(user => this.authUser = user);
  }

    logout() {
      this.authService.logout();
      this.router.navigate(['/']);
    }
}
