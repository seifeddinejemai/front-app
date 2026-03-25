import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';  // Formulaires réactifs
import { Router } from '@angular/router';                           // Navigation
import { UserService } from '../../services/user.service';          // Service utilisateur
import { User } from '../../models/user';                           // Modèle User
import { Ijwt } from '../../models/jwt';                            // Interface JWT
import { HttpErrorResponse } from '@angular/common/http';           // Gestion erreurs HTTP
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Formulaires réactifs : contrôle pour username et password
  username = new FormControl('', { nonNullable: true });  // nonNullable = ne peut pas être null
  pwd = new FormControl('', { nonNullable: true });
  error: HttpErrorResponse | null = null  // Stocke l'erreur si elle survient

  constructor(
    private router: Router,                 // Pour naviguer
    private userService: UserService,       // Pour appeler l'API de login
    private cd: ChangeDetectorRef           // Pour forcer l'affichage
  ) { }

  // Méthode de connexion
  login() {
    // Crée un objet User avec les valeurs des formulaires
    const user = new User(this.username.value, this.pwd.value)
    this.error = null  // Réinitialise l'erreur

    // Appelle le service de connexion
    this.userService.login(user)
      .subscribe({
        // Succès : récupère le token JWT
        next: (token: Ijwt) => {
          localStorage.setItem('jwt', token.access_token);  // Stocke le token
          this.router.navigate(['/books']);                 // Redirige vers la liste des livres
        },
        // Erreur : affiche le message d'erreur
        error: (err: HttpErrorResponse) => {
          this.error = {...err}           // Copie l'erreur
          console.log('Erreur login', err);
          this.cd.detectChanges();         // Force l'affichage du message d'erreur
        },
      })
  }
}