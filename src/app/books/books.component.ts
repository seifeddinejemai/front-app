import { ChangeDetectorRef, Component, OnDestroy, OnInit, model } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, throwError } from 'rxjs';
import { RouterLink } from "@angular/router";
import { BookFilter } from '../../models/filter';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-books',
  imports: [SearchBar, CommonModule, RouterLink, FormsModule],
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit, OnDestroy {


  books$!: Observable<Book[]>;
  count: number = 0;
  search_text: string = "";
  selectedFilter: string | undefined= ""
  bookfilter: BookFilter = { auteur: '', titre: '', annee: undefined }
  filter_keys = Object.keys(this.bookfilter)
  private searchFilterQuery$ = new BehaviorSubject<BookFilter>(this.bookfilter)

  constructor(
    private bookService: BookService, private cd: ChangeDetectorRef,private userService:UserService
  ) { }
  ngOnDestroy(): void {
    this.searchFilterQuery$.next({})
    this.searchFilterQuery$.complete()

  }
  ngOnInit(): void {
    this.getAllBooks();

    this.searchFilterQuery$
      .pipe(
        debounceTime(500),
  //       distinctUntilChanged((prev, curr) =>
  // JSON.stringify(prev) === JSON.stringify(curr)
// )
      )
      .subscribe(() => this.getAllBooks({ ...this.bookfilter }));
  }

  getAllBooks(book_filter?: BookFilter) {
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

searchChange(search_text: string=this.search_text) {
  this.search_text = search_text;

  if (!this.selectedFilter) return;

  this.bookfilter = {
    ...this.bookfilter,
    [this.selectedFilter]: this.search_text
  };

  this.searchFilterQuery$.next({ ...this.bookfilter });
}

  reset() {
    this.search_text = ""
    this.bookfilter = { auteur: '', titre: '', annee: undefined }
    this.searchFilterQuery$.next({ ...this.bookfilter });
    this.getAllBooks()
  }

  selectfilter() {
    if(this.search_text=="")
      return;
    
    this.bookfilter={ auteur: '', titre: '', annee: undefined }
    this.searchChange()

  }

  logout(){
    this.userService.logout()
  }

}
