export class Book {
    id?: number;
    titre: string;
    auteur: string;
    pays: string;
    annee: number;
    date?: Date ;

    constructor(id: number, titre: string, auteur: string, pays: string, annee:number, date:Date) {
    this.id = id;
    this.titre = titre;
    this.auteur = auteur;
    this.pays= pays;
    this.annee = annee;
    this.date= date;
}
}
