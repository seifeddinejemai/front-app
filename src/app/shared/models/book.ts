export class Book {
  id?: number;
  titre: string;
  auteur: string;
  pays: string;
  annee: number | undefined;

  constructor(
    titre: string,
    auteur: string,
    pays: string,
    annee: number | undefined,
    id?: number // <-- ajout
  ) {
    this.id = id;
    this.titre = titre;
    this.auteur = auteur;
    this.pays = pays;
    this.annee = annee;
  }
}