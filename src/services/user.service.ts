import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Ijwt } from '../models/jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  // Envoie les identifiants pour se connecter
  login(user: User): Observable<Ijwt> {
    return this.http.post("http://127.0.0.1:5000/login", user) as Observable<Ijwt>
  }
}