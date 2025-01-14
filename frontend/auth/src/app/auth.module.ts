import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthentificationComponent } from './authentification/authentification.component'; // Assurez-vous du chemin correct
import { AuthentificationModule } from './authentification/authentification.module'; // Importez le module

const routes: Routes = [
  {
    path: '/auth',
    component: AuthentificationComponent, // Ajoutez cette route
  },
];

@NgModule({
  imports: [
    CommonModule,
    AuthentificationModule, // Importez le module
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
