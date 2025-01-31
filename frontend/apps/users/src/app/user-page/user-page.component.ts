import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserComponent } from '../user/user.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  imports: [SearchBarComponent, UserListComponent, HttpClientModule],
})
export class UserPageComponent implements OnInit {
  user: any = null;
  users: any[] = [];
  city: string = '';
  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // localStorage.setItem(
    //   'jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOiI2NzgxNGFiMWE1ODMyZDQ1NmY0MTZlNTAiLCJpYXQiOjE3MzY2MDc1OTMsImV4cCI6MTczNjYxMTE5M30.H0GtgAs0V7Um8iajkbN5du-_to6HnTQ84mUR5w83Oto'
    // );

    const token = localStorage.getItem('jwt');
    if (!token || !this.isValidToken(token)) {
      alert('You must be logged in to access this page');
      window.location.href = '/';
      return;
    }


    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.getUserByUsername(username);
    }


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


  private isValidToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch (e) {
      return false;
    }
  }

  goToMessages(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.router.navigate([`/messages/${username}`]);
    }
  }

}
