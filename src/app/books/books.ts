import { Component } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";

@Component({
  selector: 'app-books',
  imports: [SearchBar],
  templateUrl: './books.html',
  styleUrl: './books.scss',
})
export class Books {

  books = [
    { id:1,titre: "titre1", auteur: "auteur1", pays: "pays1", annee: new Date().getFullYear(), date: new Date(), related_books: { name: 'b1', auteur: 'a1' } },
    { id:2,titre: "titre1", auteur: "auteur1", pays: "pays1", annee: new Date().getFullYear(), date: new Date(), related_books: { name: 'b1', auteur: 'a1' } },
    { id:3,titre: "titre1", auteur: "auteur1", pays: "pays1", annee: new Date().getFullYear(), date: new Date(), related_books: { name: 'b1', auteur: 'a1' } },
    { id:4,titre: "titre1", auteur: "auteur1", pays: "pays1", annee: new Date().getFullYear(), date: new Date(), related_books: { name: 'b1', auteur: 'a1' } },
    { id:5,titre: "titre1", auteur: "auteur1", pays: "pays1", annee: new Date().getFullYear(), date: new Date(), related_books: { name: 'b1', auteur: 'a1' } },
    { id:6,titre: "titre1", auteur: "auteur1", pays: "pays1", annee: new Date().getFullYear(), date: new Date(), related_books: { name: 'b1', auteur: 'a1' } },
    { id:7,titre: "titre1", auteur: "auteur1", pays: "pays1", annee: new Date().getFullYear(), date: new Date(), related_books: { name: 'b1', auteur: 'a1' } },
    { id:8,titre: "titre1", auteur: "auteur1", pays: "pays1", annee: new Date().getFullYear(), date: new Date(), related_books: { name: 'b1', auteur: 'a1' } },
    { id:9,titre: "titre1", auteur: "auteur1", pays: "pays1", annee: new Date().getFullYear(), date: new Date(), related_books: { name: 'b1', auteur: 'a1' } },
  ]

  count: number=0;
  search: string='';



	increaseCount() {
		this.count++;
	}



}
