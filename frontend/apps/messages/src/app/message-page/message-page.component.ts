import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ConversationListComponent } from '../conversation-list/conversation-list.component';
import { ChatComponent } from '../chat/chat.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MessageListComponent } from '../message-list/message-list.component';

@Component({
  selector: 'app-message-page',
  standalone: true,
  imports: [ConversationListComponent, ChatComponent, HttpClientModule],
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css'],
})
export class MessagePageComponent implements OnInit {
  @ViewChild(ChatComponent) chatComponent!: ChatComponent;
  selectedConversationId: string | null = null;
  user: any = null;
  apiUrlUsers = 'http://localhost:3000/users';
  apiUrlMessages = 'http://localhost:3000/messages';

  constructor(private http: HttpClient, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    if (!token || !this.isValidToken(token)) {
      alert('Vous devez être connecté pour accéder à cette page');
      window.location.href = '/';
      return;
    }

    const username = this.route.snapshot.paramMap.get('username');
    const convId = this.route.snapshot.queryParamMap.get('conv');
    if (username) {
      this.getUserByUsername(username);
    }
    if (convId) {
      this.onConversationSelected(convId);
    }
  }

  getUserByUsername(username: string): void {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any>(`${this.apiUrlUsers}/${username}`, { headers }).subscribe((data) => {
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

  onConversationSelected(conversationId: string): void {
    this.selectedConversationId = conversationId;
    if (this.chatComponent) {
      this.chatComponent.selectConversation(conversationId);
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }
  }
}
