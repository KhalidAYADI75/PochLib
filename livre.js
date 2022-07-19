class Livre {
    constructor(livreGoogle) {
        this.titre = livreGoogle.volumeInfo.title;
        this.id = livreGoogle.id;
        this.auteur = livreGoogle.volumeInfo.authors[0];
        this.description = livreGoogle.volumeInfo.description;
        this.image = livreGoogle.volumeInfo.imageLinks.thumbnail;
    }

/**function recupèreTousLesLivres(tousLesLivres) {
    var lesLivres = [];
    for (leti=0;i<tousLesLivres.length;i++) {
        lesLivres.titre=
    }

    console.log(tousLesLivres.length);

} */

}

