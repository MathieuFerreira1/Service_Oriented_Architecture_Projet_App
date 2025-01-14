import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component'; // Importez le composant standalone

const routes: Routes = [
  {
    path: '/users',
    component: UsersComponent, // Utilisez le composant standalone
  },
  {
    path: '/users/:username',
    component: UsersComponent, // Utilisez le composant standalone
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class UsersModule {}
