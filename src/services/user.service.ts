import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Ijwt } from '../models/jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService{

  constructor(private http:HttpClient,private router:Router){}
  login(user:User): Observable<Ijwt>{
    return this.http.post("http://127.0.0.1:5000/login",user) as Observable<Ijwt>
  }
  logout(){
    this.router.navigate(['/login'])
    localStorage.removeItem('jwt')
  }
  
}
