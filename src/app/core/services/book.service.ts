import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../shared/models/book';
import { BookFilter } from '../../shared/models/filter';

/**
 * BookService - Couche métier pour les livres
 * Responsabilité : Logique métier, transformations, validations
 * Utilise BookApi pour les appels HTTP
 */
@Injectable({
  providedIn: 'root'
})
export class BookService {
 private readonly BOOK_URL = "http://127.0.0.1:5000/livres";

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les livres avec filtres optionnels
   * @param bookFilter - Filtres de recherche (optionnel)
   * @returns Observable<Book[]> - Liste des livres
   */
  getAll(bookFilter?: BookFilter): Observable<Book[]> {
    let params = new HttpParams();
    
    if (bookFilter) {
      if (bookFilter.page) params = params.append('page', bookFilter.page);
      if (bookFilter.per_page) params = params.append('per_page', bookFilter.per_page);
      if (bookFilter.auteur) params = params.append('auteur', bookFilter.auteur);
      if (bookFilter.annee) params = params.append('annee', bookFilter.annee);
    }

    return this.http.get<Book[]>(`${this.BOOK_URL}`, {
      headers: this.getHeaders(),
      params
    });
  }

  /**
   * Récupère un livre par son ID
   * @param id - Identifiant du livre
   * @returns Observable<Book>
   */
  getOne(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.BOOK_URL}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Ajoute un nouveau livre
   * @param book - Livre à ajouter
   * @returns Observable<any>
   */
  add(book: Book): Observable<any> {
    return this.http.post(`${this.BOOK_URL}`, book, {
      headers: this.getHeaders()
    });
  }

  /**
   * Met à jour un livre existant
   * @param book - Livre avec les modifications
   * @returns Observable<any>
   */
  update(book: Book): Observable<any> {
    return this.http.put(`${this.BOOK_URL}/${book.id}`, book, {
      headers: this.getHeaders()
    });
  }

  /**
   * Supprime un livre
   * @param id - Identifiant du livre à supprimer
   * @returns Observable<any>
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.BOOK_URL}/${id}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Construit les headers avec le token JWT
   * @returns HttpHeaders
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}