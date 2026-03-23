import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  imports: [SearchBar, CommonModule],
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit, OnDestroy {

  books: Book[] = []
  books$!: Observable<Book[]>;
  count: number = 0;
  search: string = '';
  constructor(
    private bookService: BookService
  ) { }
  ngOnDestroy(): void {
  }
ngOnInit(): void {
      this.books$ = this.bookService.getallLivres();

}


  searchLivres() {
  }


  



}
