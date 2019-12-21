import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, AlertService } from '../../services';
import { first } from 'rxjs/operators';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    redirectUrl = '/jokes';
    loading:boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
    ) {
        if (this.authService.authUserData) {
            this.router.navigate([this.redirectUrl]);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
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

        const { email, password } = this.formFields;
        this.loading = true;

        this.authService.login(email.value, password.value)
          .pipe(first())
          .subscribe(
            () => {
              this.router.navigate([this.redirectUrl]);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
    }
}
