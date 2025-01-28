import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AuthentificationComponent } from '../authentification/authentification.component';

@Component({
  imports: [CommonModule, NxWelcomeComponent, AuthentificationComponent],
  selector: 'app-auth-entry',
  // template: `<app-nx-welcome></app-nx-welcome>`,
  template: `<app-authentification></app-authentification>`,
})
export class RemoteEntryComponent {}
