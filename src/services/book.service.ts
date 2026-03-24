import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { BookFilter } from '../models/filter';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly BOOK_URL = "http://127.0.0.1:5000/livres"
  constructor(private http: HttpClient) { 
    
  }
  
  getallLivres(bookFilter?:BookFilter) {
    let params = new HttpParams() 
    if(bookFilter){
      if(bookFilter.page)
        params = params.append('page',bookFilter.page)
      if(bookFilter.per_page)
        params = params.append('per_page',bookFilter.per_page)
      if(bookFilter.auteur)
        params = params.append('auteur',bookFilter.auteur)
      if(bookFilter.annee)
        params = params.append('annee',bookFilter.annee)
    }

    
    return this.http.get<Book[]>(`${this.BOOK_URL}`,{headers:this.getHeaders(),params});
    
  }
  getOneLivre(id: number): Observable<Book> {
    return this.http.get(`${this.BOOK_URL}/${id}`,{headers:this.getHeaders()}) as Observable<Book>
  }
   
  addLivre(book: Book) {
    return this.http.post(`${this.BOOK_URL}`, book,{headers:this.getHeaders()})
  }
  
  updateLivre(book: Book) {
    return this.http.put(`${this.BOOK_URL}/${book.id}`, book,{headers:this.getHeaders()})
  }
  
  deleteLivre(id: number) {
    return this.http.delete(`${this.BOOK_URL}/${id}`,{headers:this.getHeaders()})
    
  }

  private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('jwt') || '';
  return new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
}
  

}
