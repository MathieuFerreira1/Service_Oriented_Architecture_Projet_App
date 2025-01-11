import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserComponent } from '../user/user.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  imports: [SearchBarComponent, UserListComponent, HttpClientModule], // Ajouter HttpClientModule ici
})
export class UserPageComponent implements OnInit {
  user: any = null;
  users: any[] = [];
  city: string = '';
  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    localStorage.setItem(
      'jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOiI2NzgxNGFiMWE1ODMyZDQ1NmY0MTZlNTAiLCJpYXQiOjE3MzY2MDc1OTMsImV4cCI6MTczNjYxMTE5M30.H0GtgAs0V7Um8iajkbN5du-_to6HnTQ84mUR5w83Oto'
    );

    // Vérification du JWT pour s'assurer que l'utilisateur est connecté
    const token = localStorage.getItem('jwt');
    if (!token || !this.isValidToken(token)) {
      alert('Vous devez être connecté pour accéder à cette page');
      return; // Empêche l'accès à la page si le token est invalide
    }

    // Récupérer l'utilisateur à partir du token
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.getUserByUsername(username);
    }

    // Si la ville change, rechercher les utilisateurs
    if (this.city) {
      this.onSearch(this.city);
    }
  }

  onSearch(city: string): void {
    this.http.get<any[]>(`${this.apiUrl}/search?city=${city}`).subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  getUserByUsername(username: string): void {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any>(`${this.apiUrl}/${username}`, { headers }).subscribe((data) => {
      this.user = data;
    });
  }

  // Fonction pour vérifier la validité du JWT
  private isValidToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Vérifier si la date d'expiration est valide
      return payload.exp > Date.now() / 1000;
    } catch (e) {
      return false;
    }
  }
}
