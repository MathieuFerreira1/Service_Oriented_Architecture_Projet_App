import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports: [
    FormsModule,
  ],
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  city: string = '';

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search.emit(this.city);
    }
  }
}
