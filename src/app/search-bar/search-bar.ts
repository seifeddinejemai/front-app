import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Pour ngModel

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  // model = liaison de données bidirectionnelle (comme [(ngModel)])
  search = model<string>('');
  
  // output = événement émis vers le parent quand on clique
  searchButtonClicked = output<void>();
  
  // Méthode appelée au clic sur le bouton
  searchClick() {
    this.searchButtonClicked.emit();  // Émet l'événement vers le parent
  }

  // Méthode appelée quand le texte change
  updateSearch(value: string) {
    this.search.set(value);  // Met à jour la valeur du modèle
  }
}