import { ChangeDetectorRef, Component, OnDestroy, OnInit,model } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, throwError } from 'rxjs';
import { RouterLink } from "@angular/router";
import { BookFilter } from '../../models/filter';

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
  search :string="";
  private searchFilterQuery$ = new BehaviorSubject<string>("")
  constructor(
    private bookService: BookService,private cd: ChangeDetectorRef
  ) { }
  ngOnDestroy(): void {
    this.searchFilterQuery$.next("")
    this.searchFilterQuery$.complete()

  }
ngOnInit(): void {
  this.getAllBooks();

  this.searchFilterQuery$
    .pipe(
      debounceTime(500), 
      // distinctUntilChanged((prev, curr) => prev === curr)
    )
    .subscribe((search_filter: string) => this.getAllBooks({"auteur":search_filter}));
}

  getAllBooks(book_filter?:BookFilter) {
    this.books$ = this.bookService.getallLivres(book_filter);
  }

deleteLivre(id: number) {
  this.bookService.deleteLivre(id).subscribe({
    next: () => {
      this.bookService.getallLivres().subscribe((books) => {
        this.books$ = of(books)
      this.cd.detectChanges(); 
      });
    },
    error: err => console.error(err)
  });
}

searchChange(search_text:string){  
  this.search=search_text
  const bookfilter: BookFilter = {auteur:search_text}
  this.searchFilterQuery$.next(this.search) 
}

reset(){
  this.search=""
  this.getAllBooks()
}




}
