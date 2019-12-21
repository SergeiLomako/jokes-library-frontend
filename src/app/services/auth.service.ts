import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AlertService } from './alert.service';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    redirectUrl = '/jokes';

    constructor(
        private apiService: ApiService,
        private alertService: AlertService,
        private router: Router,
    ) {}

    register(user: User) {
        return this.apiService.register(user);
    }

    async login(email: string, password: string) {
        return this.apiService.login(email, password)
            .subscribe(
                user => {
                    if (user && user.hasOwnProperty('access_token')) {
                        localStorage.setItem('user', JSON.stringify(user));
                        this.router.navigate([this.redirectUrl]);
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }

    getAuthUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        localStorage.removeItem('user');
    }
}
