import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../shared/models/book';
import { BookApi } from '../../core/api/book.api';

@Component({
  selector: 'app-book-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BookUpsertComponent implements OnInit {
  book = new Book('', '', '', undefined);
  isEditMode = false;
  
  @ViewChild('bookForm') bookForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookApi: BookApi,  // Utilise le service métier
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.queryParamMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      const id = +idParam;

      // Utilise le service métier
      this.bookApi.getOneBook(id).subscribe({
        next: (data) => {
          console.log('Livre récupéré', data);
          this.book = new Book(
            data.titre,
            data.auteur,
            data.pays,
            data.annee,
            data.id
          );
          this.cd.detectChanges();
        },
        error: (err) => console.error('Erreur chargement livre', err)
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.isEditMode) {
      // Utilise le service métier
      this.bookApi.updateBook(this.book).subscribe({
        next: () => this.goToBooks(),
        error: (err) => console.error('Erreur mise à jour', err)
      });
    } else {
      // Utilise le service métier
      this.bookApi.addBook(this.book).subscribe({
        next: () => this.goToBooks(),
        error: (err) => console.error('Erreur ajout', err)
      });
    }
  }

  onCancel(): void {
    this.goToBooks();
  }

  goToBooks(): void {
    this.router.navigate(['/books']);
  }
}