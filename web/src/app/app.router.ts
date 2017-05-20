import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatFrameComponent} from './chat/chat-frame/chat-frame.component';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {SettingsMainComponent} from './settings/settings-main/settings-main.component';
import {AuthGuard} from './auth/auth-login/authguard.service';

export const router: Routes = [
    { path: '', redirectTo: 'auth-login', pathMatch: 'full' },
    { path: 'chat', component: ChatFrameComponent, canActivate: [AuthGuard]},
    { path: 'auth-login', component: AuthLoginComponent },
    { path: 'settings', component: SettingsMainComponent, canActivate: [AuthGuard]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
