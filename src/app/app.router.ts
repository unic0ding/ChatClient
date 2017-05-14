import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatFrameComponent } from './chat/chat-frame/chat-frame.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';

export const router: Routes = [
    { path: '', redirectTo: 'auth-login', pathMatch: 'full' },
    { path: 'chat', component: ChatFrameComponent },
    { path: 'auth-login', component: AuthLoginComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
