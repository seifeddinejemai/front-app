import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../shared/models/user';
import { Ijwt } from '../../shared/models/jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * UserService - Couche métier pour les utilisateurs
 * Responsabilité : Logique métier, gestion du token, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Authentifie un utilisateur
   * @param user - Identifiants de connexion
   * @returns Observable<Ijwt> - Token JWT
   */
  private readonly LOGIN_URL = "http://127.0.0.1:5000/login";

  constructor(private http: HttpClient,private router: Router) { }

  /**
   * Authentifie un utilisateur
   * @param user - Identifiants de connexion
   * @returns Observable<Ijwt> - Token JWT
   */
  login(user: User): Observable<Ijwt> {
    return this.http.post<Ijwt>(this.LOGIN_URL, user);
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login'])
  }

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns boolean
   */
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token; // Retourne true si token existe
  }

  /**
   * Récupère le token JWT
   * @returns string | null
   */
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
}