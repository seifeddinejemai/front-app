import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, throwError } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-books',
  imports: [SearchBar, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit, OnDestroy {


  books$!: Observable<Book[]>;
  count: number = 0;
  search: string = '';
  constructor(
    private bookService: BookService
  ) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.getAllBooks()
  }


  filterLivres() {
    // this.books$ = this.bookService.filterLivres();
  }

  getAllBooks() {
    this.books$ = this.bookService.getallLivres();

  }

deleteLivre(id: number) {
  this.bookService.deleteLivre(id).subscribe({
    next: () => {
      this.bookService.getallLivres().subscribe(books => this.books$ = of(books));
    },
    error: err => console.error(err)
  });
}



}
