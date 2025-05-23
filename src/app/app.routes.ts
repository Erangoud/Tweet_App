import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { GlobalTweetsComponent } from './pages/global-tweets/global-tweets.component';
export const routes: Routes = [
    { path : '', redirectTo: 'login',pathMatch:'full'},
    { path : 'login', component: LoginComponent},
    { path : 'register', component:RegisterComponent},
    { path : 'home', component:HomeComponent},
    { path : 'global', component:GlobalTweetsComponent}
];
