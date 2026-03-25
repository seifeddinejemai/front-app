import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { BookFilter } from '../models/filter';

@Injectable({
  providedIn: 'root',  // Service disponible dans toute l'application
})
export class BookService {
  // URL de base de l'API
  private readonly BOOK_URL = "http://127.0.0.1:5000/livres"
  
  constructor(private http: HttpClient) { }
  
  // Récupère tous les livres avec filtres optionnels
  getallLivres(bookFilter?: BookFilter) {
    let params = new HttpParams()  // Paramètres de requête HTTP
    
    // Ajoute les filtres s'ils sont présents
    if(bookFilter){
      if(bookFilter.page)
        params = params.append('page', bookFilter.page)
      if(bookFilter.per_page)
        params = params.append('per_page', bookFilter.per_page)
      if(bookFilter.auteur)
        params = params.append('auteur', bookFilter.auteur)
      if(bookFilter.annee)
        params = params.append('annee', bookFilter.annee)
    }
    
    // Requête GET avec headers d'authentification et paramètres
    return this.http.get<Book[]>(`${this.BOOK_URL}`, {
      headers: this.getHeaders(),
      params
    });
  }
  
  // Récupère un livre par son ID
  getOneLivre(id: number): Observable<Book> {
    return this.http.get(`${this.BOOK_URL}/${id}`, {
      headers: this.getHeaders()
    }) as Observable<Book>
  }
   
  // Ajoute un nouveau livre
  addLivre(book: Book) {
    return this.http.post(`${this.BOOK_URL}`, book, {
      headers: this.getHeaders()
    })
  }
  
  // Met à jour un livre existant
  updateLivre(book: Book) {
    return this.http.put(`${this.BOOK_URL}/${book.id}`, book, {
      headers: this.getHeaders()
    })
  }
  
  // Supprime un livre
  deleteLivre(id: number) {
    return this.http.delete(`${this.BOOK_URL}/${id}`, {
      headers: this.getHeaders()
    })
  }

  // Construit les headers avec le token JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt') || '';  // Récupère le token stocké
    return new HttpHeaders({
      Authorization: `Bearer ${token}`  // Format standard pour JWT
    });
  }
}