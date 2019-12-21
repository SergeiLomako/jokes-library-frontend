import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    redirectUrl = '/jokes';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
    ) {
        if (this.authService.getAuthUser()) {
            this.router.navigate([this.redirectUrl]);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get formFields() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.formFields.email.value, this.formFields.password.value);
    }
}
