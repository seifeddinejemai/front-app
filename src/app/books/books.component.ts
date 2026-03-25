

// Imports nécessaires
import { ChangeDetectorRef, Component, OnDestroy, OnInit, model } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";        // Composant barre de recherche
import { BookService } from '../../services/book.service';   // Service pour les livres
import { Book } from '../../models/book';                    // Modèle Book
import { CommonModule } from '@angular/common';              // Fonctionnalités communes Angular
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, throwError } from 'rxjs';
import { RouterLink } from "@angular/router";                // Pour la navigation
import { BookFilter } from '../../models/filter';            // Interface de filtrage

// Décorateur @Component : définit ce fichier comme un composant Angular
@Component({
  selector: 'app-books',           // Nom du sélecteur HTML : <app-books>
  imports: [SearchBar, CommonModule, RouterLink], // Composants et modules importés
  standalone: true,                // Composant autonome (pas besoin de module parent)
  templateUrl: './books.component.html',  // Fichier HTML associé
  styleUrl: './books.component.scss',     // Fichier SCSS associé
})
export class BooksComponent implements OnInit, OnDestroy {
  // Propriétés du composant
  books$!: Observable<Book[]>;      // Observable contenant la liste des livres (avec $ pour convention)
  count: number = 0;                 // Compteur (non utilisé)
  search: string = "";               // Texte de recherche actuel
  private searchFilterQuery$ = new BehaviorSubject<string>("") // Subject pour gérer la recherche avec délai

  // Constructeur : injecte les dépendances nécessaires
  constructor(
    private bookService: BookService,    // Service pour les opérations CRUD
    private cd: ChangeDetectorRef         // Pour forcer la détection de changements
  ) { }

  // ngOnDestroy : appelé quand le composant est détruit (nettoyage)
  ngOnDestroy(): void {
    this.searchFilterQuery$.next("")      // Vide le subject
    this.searchFilterQuery$.complete()    // Termine le subject (évite les fuites mémoire)
  }

  // ngOnInit : appelé après l'initialisation du composant
  ngOnInit(): void {
    this.getAllBooks();   // Charge tous les livres au démarrage

    // S'abonne aux changements de la barre de recherche
    this.searchFilterQuery$
      .pipe(
        debounceTime(500),    // Attend 500ms après la dernière frappe avant d'exécuter
        // distinctUntilChanged((prev, curr) => prev === curr) // Optionnel : ignore si valeur identique
      )
      .subscribe((search_filter: string) => 
        this.getAllBooks({"auteur": search_filter}) // Filtre les livres par auteur
      );
  }

  // Récupère tous les livres (avec filtre optionnel)
  getAllBooks(book_filter?: BookFilter) {
    // Appelle le service et stocke l'Observable
    this.books$ = this.bookService.getallLivres(book_filter);
  }

  // Supprime un livre par son ID
  deleteLivre(id: number) {
    this.bookService.deleteLivre(id).subscribe({
      next: () => {
        // Une fois supprimé, recharge tous les livres
        this.bookService.getallLivres().subscribe((books) => {
          this.books$ = of(books)        // Convertit le tableau en Observable
          this.cd.detectChanges();        // Force la mise à jour de l'affichage
        });
      },
      error: err => console.error(err)    // Affiche l'erreur en console
    });
  }

  // Méthode appelée quand le texte de recherche change
  searchChange(search_text: string) {  
    this.search = search_text                    // Met à jour la propriété search
    const bookfilter: BookFilter = {auteur: search_text}  // Crée un filtre
    this.searchFilterQuery$.next(this.search)     // Envoie la nouvelle valeur au subject
  }

  // Réinitialise la recherche
  reset(){
    this.search = ""          // Vide le texte de recherche
    this.getAllBooks()        // Recharge tous les livres (sans filtre)
  }
}