import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'jokes', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
