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
  @Output() search = new EventEmitter<string>(); // Emmètre l'événement de recherche
  city: string = '';

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') { // Détecter la touche "Entrée"
      this.search.emit(this.city); // Émettre l'événement avec la ville
    }
  }
}
