import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { Home } from './home/home';
import { BookUpsertComponent } from './upsert/upsert.component';

export const routes: Routes = [
       {
        path: '',
        component: Home
    },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'upsert',
        component: BookUpsertComponent,
    },

];
