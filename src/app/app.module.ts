import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ChatCardComponent } from './chat/chat-card/chat-card.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { MessageComponent } from './chat/message/message.component';
import { HashStringPipe } from './share/pipes/hash-string.pipe';
import { UrlStringPipe } from './share/pipes/url-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactListComponent,
    ChatCardComponent,
    ChatWindowComponent,
    MessageComponent,
    HashStringPipe,
    UrlStringPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
