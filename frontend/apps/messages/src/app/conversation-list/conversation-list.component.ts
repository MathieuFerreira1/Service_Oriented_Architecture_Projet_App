import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConversationItemComponent } from '../conversation-item/conversation-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [ConversationItemComponent, NgFor],
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'],
})
export class ConversationListComponent implements OnInit {
  conversations: any[] = []; // Liste des conversations
  connectedUserId!: string; // Add a property for the connected user's ID
  @Output() selectConversation = new EventEmitter<string>(); // Émet l'ID de la conversation sélectionnée

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    const token = localStorage.getItem('jwt'); // Retrieve the token from localStorage

    if (username && token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any>(`http://localhost:3000/users/${username}`, { headers }).subscribe((user) => {
        this.connectedUserId = user._id; // Set the connected user's ID
        const userId = user._id;
        this.http.get<any[]>(`http://localhost:3000/messages?userId=${userId}`, { headers }).subscribe((data) => {
          this.conversations = data;
          console.log('Conversations:', this.conversations); // Log the conversations
        });
      });
    }
  }

  onSelect(conversationId: string): void {
    this.selectConversation.emit(conversationId);
    console.log('Conversation selected:', conversationId); // Log the selected conversation`
  }
}
