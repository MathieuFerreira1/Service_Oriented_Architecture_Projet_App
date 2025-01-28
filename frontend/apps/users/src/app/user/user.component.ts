import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ContactPopupComponent } from '../contact-popup/contact-popup.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [
    ContactPopupComponent,
    NgIf,
  ],
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input() user: any;
  username: string = '';
  usernameId: string = '';
  showPopup: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
    });
  }

  navigateToMessages() {
    this.showPopup = true;
  }

  async getUserByUsername(username: string): Promise<string> {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': `Bearer ${token}` };
    const apiUrl = 'http://localhost:3000/users';

    let data = await this.http.get<any>(`${apiUrl}/${username}`, { headers }).toPromise();
    this.usernameId = data._id;
    return this.usernameId;
  }

  async sendMessage(content: string) {
    const apiUrl = 'http://localhost:3000/messages';
    console.log(this.username);

    if (this.username) {
      await this.getUserByUsername(this.username);
    }

    const body = {
      senderId: this.usernameId,
      receiverId: this.user._id,
      content: content
    };
    console.log(body);
    const token = localStorage.getItem('jwt');

    this.http.post(apiUrl, body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe((response: any) => {
      const conversationId = response._id;
      this.router.navigate([`/messages/${this.username}`], { queryParams: { conv: conversationId } });
      this.showPopup = false;
    });
  }
}
