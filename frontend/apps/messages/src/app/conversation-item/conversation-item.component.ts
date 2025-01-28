import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.css'],
})
export class ConversationItemComponent {
  @Input() conversation: any;
  @Input() connectedUserId: string = ''; // Initialize with a default value

  getParticipants(): string {
    return this.conversation.participants
      .filter((p: any) => p._id !== this.connectedUserId) // Filter out the connected user
      .map((p: any) => p.username) // Map to usernames
      .join(', ');
  }

  getLastMessage(): string {
    const lastMessage = this.conversation.messages[this.conversation.messages.length - 1];
    return lastMessage ? lastMessage.content : 'No messages';
  }
}
