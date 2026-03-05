import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private router:Router){

  }
  name = new FormControl('');
  pwd = new FormControl('');
  

  login() {
    console.log(this.name.value, this.pwd.value);
    this.router.navigate(['/books'])

  }
}
