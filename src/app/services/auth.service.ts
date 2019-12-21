import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authUserSubject: BehaviorSubject<User>;
    public authUser: Observable<User>;

    constructor(
        private apiService: ApiService,
    ) {
        this.authUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.authUser = this.authUserSubject.asObservable();
    }

    public get authUserData(): User {
      return this.authUserSubject.value;
    }

    register(user: User) {
        return this.apiService.register(user);
    }

    login(email: string, password: string) {
        return this.apiService.login(email, password)
          .pipe(map((user: User) => {
            if (user && user.hasOwnProperty('access_token')) {
              localStorage.setItem('user', JSON.stringify(user));
              this.authUserSubject.next(user);
            }

            return user;
          }));
    }

    logout() {
      localStorage.removeItem('user');
      this.authUserSubject.next(null);
    }
}
