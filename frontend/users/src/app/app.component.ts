import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'users';
}
