import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../shared/models/user';
import { Ijwt } from '../../shared/models/jwt';
import { UserApi } from '../api/user.api';

/**
 * UserService - Couche métier pour les utilisateurs
 * Responsabilité : Logique métier, gestion du token, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userApi: UserApi) { }

  /**
   * Authentifie un utilisateur
   * @param user - Identifiants de connexion
   * @returns Observable<Ijwt> - Token JWT
   */
  login(user: User): Observable<Ijwt> {
    // Validation avant envoi
    if (!user.username || !user.password) {
      throw new Error('Nom d\'utilisateur et mot de passe requis');
    }
    return this.userApi.login(user)
    // Appel à l'API
    // return this.userApi.login(user).pipe(
    //   // Transformation possible du token avant stockage
    //   map(response => {
    //     // On pourrait déchiffrer le token ici, vérifier son contenu, etc.
    //     console.log('Connexion réussie pour :', user.username);
    //     return response;
    //   })
    // );
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    this.userApi.logout()
  }

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns boolean
   */
  isLoggedIn(): boolean {
     return this.userApi.isLoggedIn()
  }

  /**
   * Récupère le token JWT
   * @returns string | null
   */
  getToken(): string | null {
    return this.userApi.getToken()
  }
}