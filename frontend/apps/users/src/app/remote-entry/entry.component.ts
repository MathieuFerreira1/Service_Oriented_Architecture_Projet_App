import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from '../user-page/user-page.component';

@Component({
  imports: [CommonModule, UserPageComponent],
  selector: 'app-users-entry',
  // template: `<app-nx-welcome></app-nx-welcome>`,
  template: `<app-user-page></app-user-page>`,
})
export class RemoteEntryComponent {}
