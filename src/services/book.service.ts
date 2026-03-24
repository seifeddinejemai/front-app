import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) { }
  readonly BOOK_URL = "http://127.0.0.1:5000/livres"
  
  increaseCount(count: number = 0) {
    count++;
  }
  getallLivres() {
    return this.http.get<Book[]>(`${this.BOOK_URL}`);
    
  }
  getOneLivre(id: number): Observable<Book> {
    return this.http.get(`${this.BOOK_URL}/${id}`, {}) as Observable<Book>
  }
  
  addLivre(book: Book) {
    return this.http.post(`${this.BOOK_URL}`, book)
  }
  
  updateLivre(book: Book) {
    return this.http.put(`${this.BOOK_URL}/${book.id}`, book)
  }
  
  deleteLivre(id: number) {
    return this.http.delete(`${this.BOOK_URL}/${id}`)
    
  }
  

}
