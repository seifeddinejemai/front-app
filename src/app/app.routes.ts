import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Books } from './books/books';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'books',
        component: Books
    },
];
