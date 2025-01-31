import { Component, Input } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  imports: [NgClass, DatePipe],
})
export class MessageComponent {
  @Input() message: any;
  @Input() connectedUser: any;
  @Input() convUser: any;
}
