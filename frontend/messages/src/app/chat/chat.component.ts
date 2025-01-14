import { Component, Input, ViewChild } from '@angular/core';
import { MessageListComponent } from '../message-list/message-list.component';
import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MessageListComponent, NgIf, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  @Input() conversationId: string | null = null; // Id of the selected conversation
  @ViewChild(MessageListComponent) messageListComponent!: MessageListComponent;
  newMessage: string = '';
  connectedUserId: string | null = null;
  convId: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.connectedUserId = this.route.snapshot.paramMap.get('username');
    // this.convId = this.route.snapshot.queryParamMap.get('conv');
  }

  selectConversation(conversationId: string): void {
    console.log('Conversation selected:', conversationId); // Log the selected conversation
    this.conversationId = conversationId;
    this.messageListComponent.updateMessages(conversationId);
  }

  getConversation(conversationId: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No JWT token found');
      return of(null);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`http://localhost:3000/messages/${conversationId}`, { headers }).pipe(
      map(response => response.participants),
      catchError(error => {
        console.error('Error fetching conversation', error);
        return of(null);
      })
    );
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      return; // Do not send empty messages
    }

    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No JWT token found');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.getConversation(this.conversationId!).subscribe(participants => {
      if (!participants) {
        console.error('No participants found');
        return;
      }

      console.log(this.connectedUserId);
      console.log(participants);
      const sender = participants.find((p: any) => p.username === this.connectedUserId);
      const receiver = participants.find((p: any) => p.username !== this.connectedUserId);

      if (!sender || !receiver) {
        console.error('Sender or receiver not found');
        return;
      }

      const body = {
        senderId: sender._id,
        receiverId: receiver._id,
        content: this.newMessage,
      };

      this.http.post('http://localhost:3000/messages', body, { headers }).subscribe(
        (response) => {
          console.log('Message sent successfully', response);
          this.newMessage = ''; // Reset the input field
          this.messageListComponent.updateMessages(this.conversationId!); // Update the message list
        },
        (error) => {
          console.error('Error sending message', error);
        }
      );
    });
  }
}
