import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [NgIf],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  showAbout = false ;

  constructor (private router:Router){}

  goToLogin(){
    this.router.navigate(['/login']) ;
  }

  

  openAbout(){
    this.showAbout=true;
  }

  closeAbout(){
    this.showAbout=false;
  }
}
