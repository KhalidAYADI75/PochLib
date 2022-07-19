class Livre {
    constructor(livreGoogle) {
        this.titre = livreGoogle.volumeInfo.title;
   /*     this.id = livreGoogle.id;
        this.auteur = livreGoogle.volumeInfo.authors[0];
        this.description = livreGoogle.volumeInfo.description;
        this.image = livreGoogle.volumeInfo.imageLinks.thumbnail; */
    }

}

 function recupTousLesLivres(tousLesLivres) {
        console.log("WECH");
        console.log(tousLesLivres);
        var lesLivres = [];
   //      for (let i=0;i<tousLesLivres.length;i++) {
         //   lesLivres[i].titre=new Livre(tousLesLivres[i].volumeInfo.title);
         var toto=new Livre(tousLesLivres[i].volumeInfo.title);
    //          console.log(toto);
    //     }

        //    console.log(lesLivres.titre);

    }

