class Livre {
    constructor(livreGoogle) {
        this.titre = livreGoogle.volumeInfo.title;
        this.id = livreGoogle.id;
        this.auteur = livreGoogle.volumeInfo.authors[0];
        this.description = livreGoogle.volumeInfo.description !=null ? livreGoogle.volumeInfo.description.substring(0,200):'Information manquante';


         try {
             this.image = livreGoogle.volumeInfo.imageLinks.thumbnail;
         } catch (error) {
            this.image="./unavailable.png";
         }
    }
}








