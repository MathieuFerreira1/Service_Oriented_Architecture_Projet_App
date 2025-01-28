import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MessagePageComponent } from '../message-page/message-page.component';

@Component({
  imports: [CommonModule, NxWelcomeComponent, MessagePageComponent],
  selector: 'app-messages-entry',
  // template: `<app-nx-welcome></app-nx-welcome>`,
  template: `<app-message-page></app-message-page>`,
})
export class RemoteEntryComponent {}
