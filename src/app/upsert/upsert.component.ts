import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-book-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule] // importe les modules pour les formulaires
})
export class BookUpsertComponent implements OnInit {

  // Crée un nouveau livre vide avec des valeurs par défaut
  book = new Book ('','','',undefined);
  book$!: Observable<Book>;

  isEditMode = false;  // true = mode modification, false = mode ajout
  
  // Récupère une référence vers le formulaire HTML pour pouvoir vérifier son état
  @ViewChild('bookForm') bookForm!: NgForm;

  constructor(
    private route: ActivatedRoute,      // pour lire les paramètres de l'URL (ex: ?id=5)
    private router: Router,            // pour naviguer entre les pages
    private bookService: BookService,  // pour appeler l'API
    private cd: ChangeDetectorRef      // pour forcer la mise à jour de l'affichage
  ) {}

  ngOnInit(): void {
    // Récupère le paramètre 'id' dans l'URL (ex: /upsert?id=5)
    const idParam = this.route.snapshot.queryParamMap.get('id');

    if (idParam) {
      // Si un id est présent, on est en mode édition
      this.isEditMode = true;
      const id = +idParam;  // le + convertit la chaîne en nombre

      // Charge les données du livre à modifier
      this.bookService.getOneLivre(id).subscribe({
        next: (data) => {
          console.log('Livre récupéré', data);
          // Remplit le formulaire avec les données du livre
          this.book = new Book(
            data.titre,
            data.auteur,
            data.pays,
            data.annee,
            data.id 
          );
          this.cd.detectChanges(); // force l'affichage des nouvelles données
        },
        error: (err) => console.error('Erreur chargement livre', err)
      });
    }
  }

  onSubmit(form: NgForm): void {
    // Si le formulaire est invalide (champs obligatoires vides), on arrête
    if (form.invalid) return;

    if (this.isEditMode) {
      // Mode modification : on met à jour le livre existant
      this.bookService.updateLivre(this.book).subscribe({
        next: () => this.goToBooks(),  // succès : retour à la liste
        error: (err: any) => console.error('Erreur mise à jour', err)
      });
    } else {
      // Mode ajout : on crée un nouveau livre
      this.bookService.addLivre(this.book).subscribe({
        next: () => this.goToBooks(),  // succès : retour à la liste
        error: (err: any) => console.error('Erreur ajout', err)
      });
    }
  }

  onCancel(): void {
    // Annuler : retour à la liste des livres
    this.goToBooks();
  }
  
  goToBooks(){
    this.router.navigate(['/books'])  // navigation vers la page des livres
  }
}