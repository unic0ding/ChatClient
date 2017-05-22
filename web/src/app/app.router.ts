import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatFrameComponent} from './chat/chat-frame/chat-frame.component';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {SettingsMainComponent} from './settings/settings-main/settings-main.component';
import {AuthGuard} from './auth/auth-login/authguard.service';
import {NotFoundComponent} from './share/components/not-found/not-found.component';
import {LoggedInGuard} from './auth/auth-login/logged-in-guard.service';

export const router: Routes = [
  {path: '', redirectTo: 'chat', pathMatch: 'full'},
  {path: 'chat', component: ChatFrameComponent, canActivate: [AuthGuard]},
  {path: 'auth-login', component: AuthLoginComponent, canActivate: [LoggedInGuard]},
  {path: 'settings', component: SettingsMainComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
