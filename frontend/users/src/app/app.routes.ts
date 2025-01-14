import { Routes } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';

export const routes: Routes = [
  { path: '/users/:username', component: UserPageComponent }
];
