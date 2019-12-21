import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private apiService: ApiService) {}

    register(user: User) {
        return this.apiService.register(user);
    }

    async login(email: string, password: string) {
        return this.apiService.login(email, password)
            .subscribe(user => {
                if (user && user.hasOwnProperty('access_token')) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
            });
    }

    getAuthUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        localStorage.removeItem('user');
    }
}
