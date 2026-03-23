import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Ijwt } from '../../models/jwt';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService) {}
  username = new FormControl('', { nonNullable: true });
  pwd = new FormControl('', { nonNullable: true });
  error:HttpErrorResponse | null = null

login() {
  const user = new User(this.username.value, this.pwd.value)
  this.error=null

  this.userService.login(user)
    .subscribe({
      next: (token: Ijwt) => {
        localStorage.setItem('jwt',token.access_token)
      },
      error: (err:HttpErrorResponse) => {
        this.error= {...err}
        console.log('Erreur login', err)
      },
      complete :()=>{
        this.router.navigate(['/books'])
        
      }
    })
}


}


