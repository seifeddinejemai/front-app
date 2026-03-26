import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { UserApi } from '../../core/api/user.api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = new FormControl('', { nonNullable: true });
  pwd = new FormControl('', { nonNullable: true });
  error: HttpErrorResponse | null = null;

  constructor(
    private router: Router,
    private userApi: UserApi,  // Utilise le service métier
    private cd: ChangeDetectorRef
  ) { }

  login(): void {
    const user = new User(this.username.value, this.pwd.value);
    this.error = null;

    // Utilise le service métier
    this.userApi.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('jwt', token.access_token);
        this.router.navigate(['/books']);
      },
      error: (err: HttpErrorResponse) => {
        this.error = { ...err };
        console.log('Erreur login', err);
        this.cd.detectChanges();
      },
    });
  }
}