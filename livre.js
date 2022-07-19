class Livre {
    constructor(livreGoogle) {
        this.titre = livreGoogle.volumeInfo.title;
        this.id = livreGoogle.id;
        this.auteur = livreGoogle.volumeInfo.authors[0];
        if ('volumeInfo.description' in livreGoogle) {
            this.description = livreGoogle.volumeInfo.description;
        } else {
            this.description='Information manquante';
        }
        if ('volumeInfo.imageLinks.thumbnail' in livreGoogle) {
            this.image = livreGoogle.volumeInfo.imageLinks.thumbnail;
        } else {
            this.image="unavailable.png";
        }
    }
}

 function recupTousLesLivres(tousLesLivres) {
    let lesLivres = [];
    for (let i=0;i<tousLesLivres.length;i++) {
        lesLivres.push(new Livre(tousLesLivres[i]));
    }
    return lesLivres;
}

