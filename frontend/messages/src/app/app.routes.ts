import { Routes } from '@angular/router';
import { MessagePageComponent } from './message-page/message-page.component';

export const routes: Routes = [
  { path: ':username', component: MessagePageComponent }
];
