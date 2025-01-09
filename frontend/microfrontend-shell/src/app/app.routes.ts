import { Routes } from '@angular/router';

// Assurez-vous que ces chemins correspondent aux bons fichiers et noms de modules
import { AuthComponent } from '../../../auth/src/app/auth.component';
import { UsersComponent } from '../../../users/src/app/users.component';
import { MessagesComponent } from '../../../messages/src/app/messages.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,  // Assurez-vous que le composant est bien importé
  },
  {
    path: 'users',
    component: UsersComponent,  // Assurez-vous que le composant est bien importé
  },
  {
    path: 'messages',
    component: MessagesComponent,  // Assurez-vous que le composant est bien importé
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];
