import { Component } from '@angular/core';
import { UserPageComponent } from './user-page/user-page.component';

@Component({
  selector: 'app-users',
  template: `
    <app-user-page></app-user-page>`,
  imports: [
    UserPageComponent,
  ],
})
export class UsersComponent {}
