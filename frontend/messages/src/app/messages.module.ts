import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component'; // Importez le composant standalone

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent, // Utilisez le composant standalone
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class MessagesModule {}
