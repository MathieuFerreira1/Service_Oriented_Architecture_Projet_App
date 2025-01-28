import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageComponent } from '../message/message.component';
import { NgFor } from '@angular/common';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    const token = localStorage.getItem('jwt'); // Retrieve the token from localStorage

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http
        .get<any>(`http://localhost:3000/messages/${this.conversationId}`, { headers })
        .subscribe((data) => {
          if (data && Array.isArray(data.messages)) {
            this.messages = data.messages;
            // console.log('Messages:', this.messages);
          } else {
            console.error('Data is not in the expected format:', data);
          }
        });
    }
  }

  updateMessages(conversationId: string): void {
    console.log('Updating messages for conversation:', conversationId);
    this.conversationId = conversationId;
    this.loadMessages();
  }
}
