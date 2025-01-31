import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageComponent } from '../message/message.component';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageComponent, NgFor],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  @Input() conversationId: string = '';
  messages: any[] = [];
  connectedUser: any = {};
  convUser: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    const token = localStorage.getItem('jwt'); // Retrieve the token from localStorage
    const connectedUsername = this.route.snapshot.paramMap.get('username'); // Get the username from the URL

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http
        .get<any>(`http://localhost:3000/messages/${this.conversationId}`, { headers })
        .subscribe((data) => {
          if (data && Array.isArray(data.messages)) {
            this.messages = data.messages;
            this.setUsers(data.participants, connectedUsername);
          } else {
            console.error('Data is not in the expected format:', data);
          }
        });
    }
  }

  setUsers(participants: any[], connectedUsername: string | null): void {
    if (participants.length === 2 && connectedUsername) {
      this.connectedUser = participants.find(participant => participant.username === connectedUsername) || {};
      this.convUser = participants.find(participant => participant.username !== connectedUsername) || {};
      console.log('Connected user:', this.connectedUser);
      console.log('Conversation user:', this.convUser);
    }
  }

  updateMessages(conversationId: string): void {
    console.log('Updating messages for conversation:', conversationId);
    this.conversationId = conversationId;
    this.loadMessages();
  }
}
