import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BooksComponent } from './components/books/books.component';
import { Home } from './components/home/home';
import { BookUpsertComponent } from './components/upsert/upsert.component';


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
