import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
  MdButtonModule,
  MdCardModule,
  MdChipsModule, MdDialogModule,
  MdIconModule,
  MdInputModule, MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {routes} from './app.router';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {SettingsMainComponent} from './settings/settings-main/settings-main.component';
import {ContactDetailComponent} from './contact/contact-list/contact-list-detail/contact-list-detail.component';
import {ContactListComponent} from './contact/contact-list/contact-list/contact-list.component';
import {ChatFrameComponent} from './chat/chat-frame/chat-frame.component';
import {ChatCardComponent} from './chat/chat-card/chat-card.component';
import {ChatWindowComponent} from './chat/chat-window/chat-window.component';
import {MessageComponent} from './chat/message/message.component';
import {HashStringPipe} from './share/pipes/hash-string.pipe';
import {UrlStringPipe} from './share/pipes/url-string.pipe';
import {ChatService} from './share/services/chat.service';
import {WebsocketService} from './share/services/websocket.service';
import {TimePipe} from './share/pipes/time.pipe';
import {ChannelListComponent} from './channel/channel-list/channel-list.component';
import {ChannelListDetailComponent} from './channel/channel-list-detail/channel-list-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './share/services/auth.service';
import {RoomService} from './share/services/room.service';
import {ContactService} from './share/services/contact.service';
import {AuthGuard} from './auth/auth-login/authguard.service';
import { ChatInfoDialogComponent } from './chat/chat-info-dialog/chat-info-dialog.component';
import { ContactDetailDialogComponent } from './contact/contact-detail-dialog/contact-detail-dialog.component';
import { InitialsPipe } from './share/pipes/initials.pipe';
import { NotFoundComponent } from './share/components/not-found/not-found.component';
import { UserSettingsComponent } from './settings/user-settings/user-settings.component';
import {LoggedInGuard} from './auth/auth-login/logged-in-guard.service';
import { RegisterComponent } from './auth/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    SettingsMainComponent,
    ContactDetailComponent,
    ContactListComponent,
    ChatFrameComponent,
    ChatCardComponent,
    ChatWindowComponent,
    MessageComponent,
    HashStringPipe,
    UrlStringPipe,
    TimePipe,
    ChannelListComponent,
    ChannelListDetailComponent,
    AuthLoginComponent,
    ChatInfoDialogComponent,
    ContactDetailDialogComponent,
    InitialsPipe,
    NotFoundComponent,
    UserSettingsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routes,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdToolbarModule,
    MdTabsModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdTooltipModule,
    MdIconModule,
    MdChipsModule,
    MdMenuModule,
    MdSnackBarModule,
    MdListModule,
    MdDialogModule
  ],
  providers: [ContactService, AuthService, RoomService, ChatService, WebsocketService, AuthGuard, LoggedInGuard],
  bootstrap: [AppComponent],
  entryComponents: [ChatInfoDialogComponent, ContactDetailDialogComponent]
})
export class AppModule {}
