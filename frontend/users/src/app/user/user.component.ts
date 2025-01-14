import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: any;
  username: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    // Récupérez le nom d'utilisateur à partir de l'URL
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
    });
  }

  navigateToMessages() {
    this.router.navigate([`/messages/${this.username}`]);
  }
}
