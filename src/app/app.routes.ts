import {Routes} from '@angular/router';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { SearchPageComponent } from '../pages/search-page/search-page.component';
import { ProfilePageComponent } from '../pages/profile-page/profile-page.component';
import { MainLayoutComponent } from '../components/layouts/main-layout/main-layout.component';
import { canActivateAuth } from '../api/auth/access.guard';


export const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {path: '', component: SearchPageComponent},
            {path: 'profile', component: ProfilePageComponent}
        ], 
        canActivate: [canActivateAuth]
    },
    {path: 'login', component: LoginPageComponent}
];
