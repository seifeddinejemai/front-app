import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule] // <-- pour ngIf, ngFor et ngModel
})
export class BookUpsertComponent implements OnInit {

  book=new Book ('','','',undefined);

  isEditMode = false;
  @ViewChild('bookForm') bookForm!: NgForm;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.queryParamMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      const id = +idParam;

      this.bookService.getOneLivre(id).subscribe({
        next: (data: Book) => this.book = {...data},
        error: (err: HttpErrorResponse) => console.error('Erreur chargement livre', err)
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return; // sécurité côté TS

    if (this.isEditMode) {
      this.bookService.updateLivre(this.book).subscribe({
        next: () => this.goToBooks(),
        error: (err: any) => console.error('Erreur mise à jour', err)
      });
    } else {
      this.bookService.addLivre(this.book).subscribe({
        next: () => this.goToBooks(),
        error: (err: any) => console.error('Erreur ajout', err)
      });
    }
  }

  onCancel(): void {
    this.goToBooks();
  }
  goToBooks(){
    this.router.navigate(['/books'])
  }
}