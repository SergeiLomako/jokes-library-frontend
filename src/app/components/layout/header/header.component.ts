import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    loginUrl = '/';
    userData = '';

    constructor(private router: Router) { }

    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        localStorage.removeItem('user');
        this.userData = '';
        this.router.navigate([this.loginUrl]);
    }
}
