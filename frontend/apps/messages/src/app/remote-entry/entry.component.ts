import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageComponent } from '../message-page/message-page.component';

@Component({
  imports: [CommonModule, MessagePageComponent],
  selector: 'app-messages-entry',
  // template: `<app-nx-welcome></app-nx-welcome>`,
  template: `<app-message-page></app-message-page>`,
})
export class RemoteEntryComponent {}
