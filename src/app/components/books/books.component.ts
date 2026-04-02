import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BehaviorSubject, debounceTime, Observable, Subscription } from 'rxjs';
import { Book } from '../../shared/models/book';
import { BookFilter } from '../../shared/models/filter';
import { SearchBar } from '../../shared/search-bar/search-bar';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../core/service/book.service';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-books',
  imports: [SearchBar, CommonModule, RouterLink,FormsModule],
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit, OnDestroy {
search_text: string | undefined="";
selectedFilter: string | undefined= ""
bookfilter: BookFilter = { auteur: '', titre: '', annee: undefined }
filter_keys = Object.keys(this.bookfilter)
private searchFilterQuery$ = new BehaviorSubject<BookFilter>(this.bookfilter)
books$!: Observable<Book[]>;
search: string | undefined= "";
private subscriptions = new Subscription();

constructor(
  private bookService: BookService,
  private userService: UserService,
) { }


ngOnInit(): void {
  // Charge tous les livres au démarrage
  this.loadBooks();
  
  // S'abonne aux changements de recherche
  this.subscriptions.add(
    this.searchFilterQuery$
    .pipe(debounceTime(500))
    .subscribe((filter: BookFilter) => {
      this.loadBooks(filter);
    })
  );
  }
  
  ngOnDestroy(): void {
    // Nettoie le Subject
    this.searchFilterQuery$.next({});
    this.searchFilterQuery$.complete();
    
    // Désabonne toutes les subscriptions
    this.subscriptions.unsubscribe();
  }
  
  /**
   * Charge les livres via le service métier
   * @param filter - Filtre optionnel
  */
 loadBooks(filter?: BookFilter): void {
   this.books$ = this.bookService.getAllBooks(filter);
  }
  
  /**
   * Supprime un livre
   * @param id - ID du livre à supprimer
  */
 deleteLivre(id: number): void {
   this.bookService.deleteBook(id).subscribe({
     next: () => {
       // Recharge la liste avec le filtre actuel
       this.loadBooks(this.search ? { auteur: this.search } : {});
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
      }
    });
  }
  
  /**
   * Méthode appelée quand le texte de recherche change
   * @param search_text - Nouveau texte de recherche
  */
 searchChange(search_text: string|undefined): void {
   this.search = search_text;
   this.searchFilterQuery$.next({ auteur: search_text });
  }
  
  /**
   * Méthode appelée quand on clique sur le bouton de recherche
  */
 onSearchButtonClicked(): void {
   // Déclenche immédiatement la recherche (sans attendre le debounce)
   this.searchFilterQuery$.next({ auteur: this.search });
  }
  
  /**
   * Réinitialise la recherche
  */
 reset(): void {
   this.search = "";
   this.searchFilterQuery$.next({});  // Filtre vide
  }
  logout() {
    this.userService.logout()
  }
}