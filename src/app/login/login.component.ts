import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Ijwt } from '../../models/jwt';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService,private cd: ChangeDetectorRef) { }
  username = new FormControl('', { nonNullable: true });
  pwd = new FormControl('', { nonNullable: true });
  error: HttpErrorResponse | null = null

  login() {
    const user = new User(this.username.value, this.pwd.value)
    this.error = null

    this.userService.login(user)
      .subscribe({
        next: (token: Ijwt) => {
          localStorage.setItem('jwt', token.access_token);
          this.router.navigate(['/books']); 
        },
     
        error: (err: HttpErrorResponse) => {
          this.error = {...err}
          console.log('Erreur login', err);
          this.cd.detectChanges(); 
        },
      })
  }


}


