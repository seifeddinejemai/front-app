import { Component, model, output,} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {

  
    search = model<string>('');
    searchButtonClicked = output<void>({alias: 'submit'});
  
  searchClick() {
		this.searchButtonClicked.emit() ;
  }

  updateSearch(value: string) {
		this.search.set(value);
	}


}