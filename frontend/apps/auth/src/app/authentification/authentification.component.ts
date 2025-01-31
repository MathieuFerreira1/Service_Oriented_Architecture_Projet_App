import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-authentification',
  standalone: true, // The component is standalone
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Adding HttpClientModule here
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent {
  authForm!: FormGroup;
  isLoginMode = true; // Default to login mode
  apiUrl = 'http://localhost:3000'; // Replace with your backend API URL

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.initForm();
  }

  // Initialize the form
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

  // Toggle between login and signup mode
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.initForm(); // Reset the form for the new mode
  }

  // Form submission
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    if (this.isLoginMode) {
      // Login
      const { email, password } = this.authForm.value;

      this.http
        .post(
          `${this.apiUrl}/auth/login`, // API URL for login
          { email, password }, // Request body
          { headers: { 'Content-Type': 'application/json' } } // HTTP headers
        )
        .subscribe({
          next: (response: any) => {
            console.log('Login response:', response.access_token);
            localStorage.setItem('jwt', response.access_token); // Store the JWT
            alert('Login successful!');

            // Request to get the user by email
            this.http
              .get(`${this.apiUrl}/users/findByEmail?email=${email}`)
              .subscribe({
                next: (user: any) => {
                  this.router.navigate([`/users/${user.username}`]); // Redirect to the user's page
                },
                error: (error) => {
                  console.error('Error fetching user:', error);
                  alert('Error fetching user.');
                },
              });
          },
          error: (error) => {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
          },
        });
    } else {
      // Signup
      const { username, email, password, city, bio } = this.authForm.value;

      this.http
        .post(
          `${this.apiUrl}/auth/register`, // API URL for registration
          { username, email, password, city, bio }, // Request body
          { headers: { 'Content-Type': 'application/json' } } // HTTP headers
        )
        .subscribe({
          next: () => {
            alert('Account created successfully! You can now log in.');
            this.toggleMode(); // Switch back to login mode
          },
          error: (error) => {
            console.error('Signup error:', error);
            alert('Account creation failed. Please try again.');
          },
        });
    }
  }
}
