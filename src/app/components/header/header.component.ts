import { Component } from '@angular/core';
import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    authUser: User;

  constructor(private authService: AuthService) {
    this.authService.authUser.subscribe(user => this.authUser = user);
  }

    logout() {
      this.authService.logout();
    }
}
