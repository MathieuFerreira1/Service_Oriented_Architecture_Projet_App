import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('auth/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'auth/#',
    loadChildren: () => import('auth/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'users',
    loadChildren: () => import('users/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'users/:username',
    loadChildren: () => import('users/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'messages',
    loadChildren: () => import('messages/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'messages/:username',
    loadChildren: () => import('messages/Routes').then((m) => m!.remoteRoutes),
  },
  // {
  //   path: '',
  //   component: NxWelcomeComponent,
  // },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];
