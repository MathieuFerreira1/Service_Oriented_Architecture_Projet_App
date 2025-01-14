import { Routes } from '@angular/router';
import { AuthComponent } from '../../../auth/src/app/auth.component';
import { UsersComponent } from '../../../users/src/app/users.component';
import { MessagesComponent } from '../../../messages/src/app/messages.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'auth/#',
    component: AuthComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/:username',
    component: UsersComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
  },
  {
    path: 'messages/:username',
    component: MessagesComponent,
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];
