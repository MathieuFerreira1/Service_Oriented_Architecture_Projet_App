import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadMessages(conversationId: string): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http
        .get<any>(`http://localhost:3000/messages/${conversationId}`, { headers })
        .subscribe((data) => {
          if (data && Array.isArray(data.messages)) {
            this.messagesSubject.next(data.messages);
          } else {
            console.error('Data is not in the expected format:', data);
          }
        });
    }
  }
}
