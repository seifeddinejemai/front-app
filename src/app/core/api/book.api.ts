import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book } from '../../shared/models/book';
import { BookFilter } from '../../shared/models/filter';
import { BookService } from '../services/book.service';

/**
 * BookService - Couche métier pour les livres
 * Responsabilité : Logique métier, transformations, validations
 * Utilise bookService pour les appels HTTP
 */
@Injectable({
  providedIn: 'root'
})
export class BookApi {
  constructor(private bookService: BookService) { }

  /**
   * Récupère tous les livres
   * Peut ajouter des transformations ici si nécessaire
   * @param filter - Filtres optionnels
   * @returns Observable<Book[]>
   */
  getAllBooks(filter?: BookFilter): Observable<Book[]> {
    // Appel à l'API
    return this.bookService.getAll(filter).pipe(
      // Transformation possible : formater les données, ajouter des propriétés, etc.
      map(books => {
        // Exemple de transformation : s'assurer que chaque livre a un titre en majuscule
        // return books.map(book => ({
        //   ...book,
        //   titre: book.titre.toUpperCase()
        // }));
        
        // Pour l'instant, on retourne les données telles quelles
        return books;
      })
    );
  }

  /**
   * Récupère un livre par son ID
   * @param id - Identifiant du livre
   * @returns Observable<Book>
   */
  getOneBook(id: number): Observable<Book> {
    return this.bookService.getOne(id);
  }

  /**
   * Ajoute un nouveau livre
   * @param book - Livre à ajouter
   * @returns Observable<any>
   */
  addBook(book: Book): Observable<any> {
    // Validation avant envoi
    if (!book.titre || !book.auteur) {
      throw new Error('Le titre et l\'auteur sont obligatoires');
    }
    
    // On peut ajouter des informations supplémentaires
    const bookToAdd = {
      ...book,
      // dateCreation: new Date() // Ajouter une date de création si besoin
    };
    
    return this.bookService.add(bookToAdd);
  }

  /**
   * Met à jour un livre
   * @param book - Livre à modifier
   * @returns Observable<any>
   */
  updateBook(book: Book): Observable<any> {
    // Validation avant mise à jour
    if (!book.id) {
      throw new Error('ID requis pour la mise à jour');
    }
    
    return this.bookService.update(book);
  }

  /**
   * Supprime un livre
   * @param id - Identifiant du livre à supprimer
   * @returns Observable<any>
   */
  deleteBook(id: number): Observable<any> {
    return this.bookService.delete(id);
  }
}