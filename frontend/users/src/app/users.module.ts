import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component'; // Importez le composant standalone

const routes: Routes = [
  {
    path: '',
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
