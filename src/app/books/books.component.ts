import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [SearchBar, CommonModule],
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {

  books: Book[] = []
  count: number = 0;
  search: string = '';
  constructor(
    private bookService: BookService
  ) { }
  // ngOnDestroy(): void {
  // }
  ngOnInit(): void {
    this.bookService.getallLivres()
      .subscribe((livres) => {
        this.books = livres as Book[]
      })
  }



  searchLivres() {
  }



}
