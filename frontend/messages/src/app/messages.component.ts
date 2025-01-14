import { Component } from '@angular/core';
import { MessagePageComponent } from './message-page/message-page.component';

@Component({
  selector: 'app-messages',
  template: `
    <app-message-page></app-message-page>`,
  imports: [
    MessagePageComponent,
  ],
})
export class MessagesComponent {}
