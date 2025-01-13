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
  // @ViewChild(MessageListComponent) messageListComponent!: MessageListComponent;
  @ViewChild(ChatComponent) chatComponent!: ChatComponent;
  selectedConversationId: string | null = null; // Id de la conversation sélectionnée
  user: any = null;
  apiUrlUsers = 'http://localhost:3000/users';
  apiUrlMessages = 'http://localhost:3000/messages';

  constructor(private http: HttpClient, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    localStorage.setItem(
      'jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOiI2NzgxNGFiMWE1ODMyZDQ1NmY0MTZlNTAiLCJpYXQiOjE3MzY3OTMwNDQsImV4cCI6MTczNjc5NjY0NH0.FE06ewqtgbzd07vyTDDqS_4p680CHqRB5mx7wXfo_a4'
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
  }

  getUserByUsername(username: string): void {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any>(`${this.apiUrlUsers}/${username}`, { headers }).subscribe((data) => {
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

  // Méthode appelée lorsqu'une conversation est sélectionnée
  onConversationSelected(conversationId: string): void {
    this.selectedConversationId = conversationId;
    if (this.chatComponent) {
      this.chatComponent.selectConversation(conversationId);
      this.cdr.markForCheck(); // Mark for check to ensure change detection
      this.cdr.detectChanges(); // Force change detection
    }
  }
}
