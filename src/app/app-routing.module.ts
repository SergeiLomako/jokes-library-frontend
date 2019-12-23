import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JokesComponent } from './components/jokes/jokes.component';
import { JokeDetailComponent } from './components/joke-detail/joke-detail.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'jokes', component: JokesComponent },
  { path: 'jokes/:id', component: JokeDetailComponent },
  { path: '**', redirectTo: '' },
];

export const Routing = RouterModule.forRoot(appRoutes);
