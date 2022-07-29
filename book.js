class book {
    constructor(bookGoogle) {
        this.title = bookGoogle.volumeInfo.title;
        this.id = bookGoogle.id;
        this.author = bookGoogle.volumeInfo.authors[0];
        this.description = bookGoogle.volumeInfo.description !=null ? bookGoogle.volumeInfo.description.substring(0,200):'Information manquante';
        this.image=bookGoogle.volumeInfo.imageLinks !=null ? bookGoogle.volumeInfo.imageLinks.thumbnail : "./unavailable.png";
    }
}








