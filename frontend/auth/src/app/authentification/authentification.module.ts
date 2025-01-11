import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthentificationComponent } from './authentification.component';

@NgModule({
  declarations: [], // Déclarez le composant ici
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthentificationComponent,
  ],
  exports: [AuthentificationComponent], // Exportez-le si besoin
})
export class AuthentificationModule {}
