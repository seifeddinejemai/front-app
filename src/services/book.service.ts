import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
    constructor(private http:HttpClient){}

  increaseCount(count: number= 0) {
		count++;
	}
  getallLivres(){
    return this.http.get("http://127.0.0.1:5000/livres",{})
  }
  getOnelvre(id: number){
    return this.http.get(`http://127.0.0.1:5000/livres/${id}`,{})
  }

  addLivre(book: Book){
    return this.http.post(`http://127.0.0.1:5000/livres`,book)
  }

  putLivre(book:Book){
    return this.http.put(`http://127.0.0.1:5000/livres/${book.id}`,book)
  }

  deleteLivre(id:number){
    return this.http.delete(`http://127.0.0.1:5000/livres/${id}`)

  }

  filterLivre(){
    // return this.http.get(`http://127.0.0.1:5000/livres/${id}`)
  }
  
}
