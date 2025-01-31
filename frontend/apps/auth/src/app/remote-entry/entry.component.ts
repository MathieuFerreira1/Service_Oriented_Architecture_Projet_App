import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationComponent } from '../authentification/authentification.component';

@Component({
  imports: [CommonModule, AuthentificationComponent],
  selector: 'app-auth-entry',
  // template: `<app-nx-welcome></app-nx-welcome>`,
  template: `<app-authentification></app-authentification>`,
})
export class RemoteEntryComponent {}
