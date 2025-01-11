import { Component } from '@angular/core';
import { AuthentificationComponent } from './authentification/authentification.component';

@Component({
  selector: 'app-auth',
  // template: `<h1>Auth Module</h1>`,
  template: '<app-authentification></app-authentification>',
  imports: [
    AuthentificationComponent,
  ],
})
export class AuthComponent {}
