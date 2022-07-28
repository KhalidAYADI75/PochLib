class book {
    constructor(bookGoogle) {
        this.titre = bookGoogle.volumeInfo.title;
        this.id = bookGoogle.id;
        this.author = bookGoogle.volumeInfo.authors[0];
        this.description = bookGoogle.volumeInfo.description !=null ? bookGoogle.volumeInfo.description.substring(0,200):'Information manquante';


         try {
             this.image = bookGoogle.volumeInfo.imageLinks.thumbnail;
         } catch (error) {
            this.image="./unavailable.png";
         }
    }
}








