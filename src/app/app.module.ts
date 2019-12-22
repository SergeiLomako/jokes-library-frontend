import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './interceptors';
import { NgModule } from '@angular/core';
import { Routing } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JokesComponent } from './components/jokes/jokes.component';
import { JokeItemComponent } from './components/joke-list-item/joke-item.component';
import { JokeDetailComponent } from './components/joke-detail/joke-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        JokesComponent,
        JokeItemComponent,
        JokeDetailComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        Routing,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
