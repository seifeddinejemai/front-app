export class Book {
    id: number;
    titre: string;
    auteur: string;
    pays: string;
    annee: number;
    

    constructor(id: number, titre: string, auteur: string, pays: string, annee:number,) {
    this.id = id;
    this.titre = titre;
    this.auteur = auteur;
    this.pays= pays;
    this.annee = annee;
    
}
}
