
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule, MdButtonModule, MdCardModule, MdInputModule, MdToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {routes} from './app.router';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {ContactDetailComponent} from './contact/contact-detail/contact-detail.component';
import {ContactListComponent} from './contact/contact-list/contact-list.component';
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


@NgModule({
  declarations: [
    AppComponent,
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
    AuthLoginComponent

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
    MdToolbarModule
  ],
  providers: [ChatService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
