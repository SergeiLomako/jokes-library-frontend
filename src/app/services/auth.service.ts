import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { AlertService } from "./alert.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl: string = environment.apiUrl;
    private authUserSubject: BehaviorSubject<User>;
    public authUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private alertService: AlertService,
        private router: Router,
    ) {
        this.authUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.authUser = this.authUserSubject.asObservable();
    }

    public get authUserData(): User {
        return this.authUserSubject.value;
    }

    register(user: User):Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, user);
    }

    login(email: string, password: string):Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, { email, password })
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
      this.router.navigate(['/']);
    }
}
