import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-authentification',
  standalone: true, // Le composant est standalone
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Ajout de HttpClientModule ici
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent {
  authForm!: FormGroup;
  isLoginMode = true; // Par défaut, mode connexion
  apiUrl = 'http://localhost:3000'; // Remplacez par l'URL de votre backend API

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.initForm();
  }

  // Initialisation du formulaire
  initForm() {
    this.authForm = this.isLoginMode
        ? this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
        })
        : this.fb.group({
          username: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          city: ['', [Validators.required]],
          bio: ['', [Validators.required, Validators.maxLength(200)]],
        });
  }

  // Basculer entre connexion et création de compte
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.initForm(); // Réinitialiser le formulaire pour le nouveau mode
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    if (this.isLoginMode) {
      // Connexion
      const { email, password } = this.authForm.value;

      this.http
          .post(
              `${this.apiUrl}/auth/login`, // URL de l'API pour la connexion
              { email, password }, // Corps de la requête
              { headers: { 'Content-Type': 'application/json' } } // En-têtes HTTP
          )
          .subscribe({
            next: (response: any) => {
              console.log('Réponse de connexion :', response.access_token);
              localStorage.setItem('token', response.access_token); // Stocker le JWT
              alert('Connexion réussie !');
              this.router.navigate(['/']); // Rediriger après connexion
            },
            error: (error) => {
              console.error('Erreur de connexion :', error);
              alert('Échec de la connexion. Veuillez vérifier vos informations.');
            },
          });
    } else {
      // Création de compte
      const { username, email, password, city, bio } = this.authForm.value;

      this.http
          .post(
              `${this.apiUrl}/auth/register`, // URL de l'API pour l'inscription
              { username, email, password, city, bio }, // Corps de la requête
              { headers: { 'Content-Type': 'application/json' } } // En-têtes HTTP
          )
          .subscribe({
            next: () => {
              alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
              this.toggleMode(); // Revenir au mode connexion
            },
            error: (error) => {
              console.error('Erreur lors de la création de compte :', error);
              alert('Échec de la création du compte. Veuillez réessayer.');
            },
          });
    }
  }
}
