import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-popup',
  templateUrl: './contact-popup.component.html',
  imports: [
    FormsModule,
  ],
  styleUrls: ['./contact-popup.component.css'],
})
export class ContactPopupComponent {
  @Input() contactName: string = '';
  @Output() sendMessage = new EventEmitter<string>();
  @Output() closePopupEvent = new EventEmitter<void>();
  messageContent: string = '';

  onSend() {
    this.sendMessage.emit(this.messageContent);
  }

  closePopup() {
    this.closePopupEvent.emit();
  }
}
