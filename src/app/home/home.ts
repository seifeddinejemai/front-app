import { Component } from '@angular/core';
import { Router } from '@angular/router';    // Pour la navigation entre pages
import { NgIf } from '@angular/common';      // Pour la directive *ngIf

@Component({
  selector: 'app-home',           // Sélecteur : <app-home>
  imports: [NgIf],                // Importe NgIf pour utiliser *ngIf
  templateUrl: './home.html',     // Fichier HTML
  styleUrl: './home.scss',        // Fichier SCSS
})
export class Home {
  showAbout = false ;              // Contrôle l'affichage de la fenêtre modale

  constructor (private router:Router){}  // Injecte Router pour la navigation

  // Navigue vers la page de connexion
  goToLogin(){
    this.router.navigate(['/login']) ;
  }

  // Ouvre la fenêtre modale
  openAbout(){
    this.showAbout = true;
  }

  // Ferme la fenêtre modale
  closeAbout(){
    this.showAbout = false;
  }
}