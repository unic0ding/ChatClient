import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatFrameComponent } from './chat/chat-frame/chat-frame.component';

export const router: Routes = [
    { path: '', redirectTo: 'chat', pathMatch: 'full' },
    { path: 'chat', component: ChatFrameComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
