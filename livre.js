class Livre {
    constructor(livreGoogle) {
        this.titre = livreGoogle.volumeInfo.title;
        this.id = livreGoogle.id;
        this.auteur = livreGoogle.volumeInfo.authors[0];

        try {
            this.description = livreGoogle.volumeInfo.description.substring(0,200);
        } catch (error) {
            this.description='Information manquante';
        }

         try {
             this.image = livreGoogle.volumeInfo.imageLinks.thumbnail;
         } catch (error) {
            this.image="./unavailable.png";
         }
    }
}

 function recupTousLesLivres(tousLesLivres) {
    let tabLivres = [];
    for (let i=0;i<tousLesLivres.length;i++) {
        tabLivres.push(new Livre(tousLesLivres[i]));
    }
    return tabLivres;
}


